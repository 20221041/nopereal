import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppShell from "./components/layout/AppShell.jsx";
import AlertPage from "./pages/AlertPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import NewsDetailPage from "./pages/NewsDetailPage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import ScrapPage from "./pages/ScrapPage.jsx";
import WritePostPage from "./pages/WritePostPage.jsx";
import { ScrapProvider } from "./state/ScrapContext";
import { CommunityProvider } from "./state/CommunityContext"; // Add this import

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { path: "/", element: <NewsPage /> },
      { path: "/news/:id", element: <NewsDetailPage /> },
      { path: "/alert", element: <AlertPage /> },
      { path: "/community", element: <CommunityPage /> },
      { path: "/community/write", element: <WritePostPage /> },
      { path: "/chat", element: <ChatPage /> },
      { path: "/scrap", element: <ScrapPage /> },
      { path: "/mypage", element: <MyPage /> },
    ],
  },
]);

export default function App() {
  return (
    <ScrapProvider>
      <CommunityProvider> {/* Wrap RouterProvider with CommunityProvider */}
        <RouterProvider router={router} />
      </CommunityProvider>
    </ScrapProvider>
  );
}