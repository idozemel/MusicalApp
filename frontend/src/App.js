import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import MyProfilePage from "./screens/MyProfilePage/MyProfilePage";
import Header from "./components/Header/Header";
import SongsPage from "./screens/SongsPage/SongsPage";
import SongCreateEdit from "./screens/SongCreateEdit/SongCreateEdit";
import ChatPage from "./screens/ChatPage/ChatPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/myProfile" element={<MyProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/song/edit" element={<SongCreateEdit />} />
        <Route path="/song/edit/:id" element={<SongCreateEdit />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
