import React, { createContext, useContext, useMemo, useState } from "react";
import { communityPosts as initialPosts } from "../data/mock.js";

const CommunityContext = createContext(null);

export function CommunityProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  const api = useMemo(() => {
    return {
      posts,
      addPost: ({ categoryId, title, body }) => {
        const newPost = {
          id: `p${Date.now()}`, // MVP: 유니크용
          categoryId,
          title,
          body,
          views: 0,
          comments: 0,
        };
        setPosts((prev) => [newPost, ...prev]);
        return newPost.id;
      },
    };
  }, [posts]);

  return <CommunityContext.Provider value={api}>{children}</CommunityContext.Provider>;
}

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error("useCommunity must be used within CommunityProvider");
  return ctx;
}