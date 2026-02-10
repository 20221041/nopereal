// src/state/ScrapContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ScrapContext = createContext(null);

const LS_KEY = "nope_scrap_v1";

const defaultState = {
  folders: [
    { id: "all", name: "전체", createdAt: Date.now() }, // 가상 폴더(전체보기)
  ],
  scraps: {
    posts: [
      // 예시(초기)
      { id: "sp1", tag: "피해 예방", title: "요즘 대출 사기 전화 공통점 정리해봅니다", folderId: "all", createdAt: Date.now() },
      { id: "sp2", tag: "로맨스 스캠", title: "아직도 생각하면 화남", folderId: "all", createdAt: Date.now() },
      { id: "sp3", tag: "소액 피해", title: "소액도 그냥 넘기지 마세요.", folderId: "all", createdAt: Date.now() },
    ],
    news: [
      { id: "sn1", title: "서민을 노리는 그 목소리 ‘보이스피싱’", imageUrl: "", folderId: "all", createdAt: Date.now() },
    ],
  },
};

function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    // 최소 방어: 폴더/스크랩 키 없으면 기본값
    if (!parsed?.folders || !parsed?.scraps) return defaultState;
    // "전체(all)" 폴더는 항상 존재하도록 보정
    const hasAll = parsed.folders.some((f) => f.id === "all");
    if (!hasAll) parsed.folders.unshift({ id: "all", name: "전체", createdAt: Date.now() });
    return parsed;
  } catch {
    return defaultState;
  }
}

function save(state) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

export function ScrapProvider({ children }) {
  const [state, setState] = useState(() => load());

  useEffect(() => {
    save(state);
  }, [state]);

  // 폴더 CRUD
  const createFolder = (name) => {
    const trimmed = String(name || "").trim();
    if (!trimmed) return null;

    const newFolder = { id: uid("folder"), name: trimmed, createdAt: Date.now() };
    setState((prev) => ({
      ...prev,
      folders: [prev.folders[0], newFolder, ...prev.folders.slice(1)], // all 다음에 추가
    }));
    return newFolder;
  };

  const renameFolder = (folderId, nextName) => {
    if (folderId === "all") return; // 전체는 변경 불가
    const trimmed = String(nextName || "").trim();
    if (!trimmed) return;

    setState((prev) => ({
      ...prev,
      folders: prev.folders.map((f) => (f.id === folderId ? { ...f, name: trimmed } : f)),
    }));
  };

  const deleteFolder = (folderId) => {
    if (folderId === "all") return;

    setState((prev) => {
      const nextFolders = prev.folders.filter((f) => f.id !== folderId);

      // 삭제된 폴더에 있던 스크랩은 "전체(all)"로 이동
      const fixItem = (it) => (it.folderId === folderId ? { ...it, folderId: "all" } : it);

      return {
        ...prev,
        folders: nextFolders,
        scraps: {
          posts: prev.scraps.posts.map(fixItem),
          news: prev.scraps.news.map(fixItem),
        },
      };
    });
  };

  // 스크랩 아이템 조작 (저장/이동/해제)
  const moveScrap = (type, itemId, toFolderId) => {
    setState((prev) => {
      const key = type === "news" ? "news" : "posts";
      const list = prev.scraps[key] || [];
      const nextList = list.map((it) => (it.id === itemId ? { ...it, folderId: toFolderId } : it));
      return { ...prev, scraps: { ...prev.scraps, [key]: nextList } };
    });
  };

  const removeScrap = (type, itemId) => {
    setState((prev) => {
      const key = type === "news" ? "news" : "posts";
      const list = prev.scraps[key] || [];
      const nextList = list.filter((it) => it.id !== itemId);
      return { ...prev, scraps: { ...prev.scraps, [key]: nextList } };
    });
  };

  const addScrap = (type, payload, folderId = "all") => {
    setState((prev) => {
      const key = type === "news" ? "news" : "posts";
      const list = prev.scraps[key] || [];
      const newItem = {
        ...payload,
        id: payload?.id || uid(type),
        folderId,
        createdAt: Date.now(),
      };
      return { ...prev, scraps: { ...prev.scraps, [key]: [newItem, ...list] } };
    });
  };

  const folderCounts = useMemo(() => {
    const counts = {};
    for (const f of state.folders) counts[f.id] = 0;

    for (const p of state.scraps.posts) counts[p.folderId] = (counts[p.folderId] || 0) + 1;
    for (const n of state.scraps.news) counts[n.folderId] = (counts[n.folderId] || 0) + 1;

    // 전체(all)는 전체 합으로 표시하고 싶으면:
    const total = (state.scraps.posts?.length || 0) + (state.scraps.news?.length || 0);
    counts["all"] = total;

    return counts;
  }, [state]);

  const hasNews = (newsId) => {
    return state.scraps.news.some((newsItem) => newsItem.id === newsId);
  };

  const toggleNews = (newsItemPayload) => {
    if (hasNews(newsItemPayload.id)) {
      removeScrap("news", newsItemPayload.id);
    } else {
      addScrap("news", newsItemPayload);
    }
  };

  const hasPost = (postId) => {
    return state.scraps.posts.some((postItem) => postItem.id === postId);
  };

  const togglePost = (postItemPayload) => {
    if (hasPost(postItemPayload.id)) {
      removeScrap("posts", postItemPayload.id);
    } else {
      addScrap("posts", postItemPayload);
    }
  };

  const value = {
    state,
    folders: state.folders,
    scraps: state.scraps,
    folderCounts,

    createFolder,
    renameFolder,
    deleteFolder,

    addScrap,
    moveScrap,
    removeScrap,

    // New functions for news
    hasNews,
    toggleNews,
    // New functions for posts
    hasPost,
    togglePost,
  };

  return <ScrapContext.Provider value={value}>{children}</ScrapContext.Provider>;
}

export function useScrap() {
  const ctx = useContext(ScrapContext);
  if (!ctx) throw new Error("useScrap must be used within ScrapProvider");
  return ctx;
}