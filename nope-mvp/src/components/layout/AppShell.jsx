import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopBar from "./TopBar.jsx";
import BottomTabBar from "./BottomTabBar.jsx";

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("news"); // Default active tab

  useEffect(() => {
    // Update activeTab based on current location
    const path = location.pathname;
    if (path === "/") {
      setActiveTab("news");
    } else if (path.startsWith("/news")) {
      setActiveTab("news");
    } else if (path.startsWith("/chat")) {
      setActiveTab("chat");
    } else if (path.startsWith("/community")) {
      setActiveTab("community");
    } else if (path.startsWith("/scrap")) {
      setActiveTab("scrap");
    } else if (path.startsWith("/mypage")) {
      setActiveTab("my");
    }
  }, [location.pathname]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    navigate(`/${tabKey === "news" ? "" : tabKey === "my" ? "mypage" : tabKey}`); // Navigate to the corresponding route
  };

  const showFab = location.pathname === "/community";

  return (
    <div className="app-frame">
      <TopBar />
      <div className="safe">
        <Outlet />
      </div>
      <BottomTabBar activeTab={activeTab} onChange={handleTabChange} />

    </div>
  );
}