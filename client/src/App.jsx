import Header from "./components/header"
import Footer from "./components/footer"
import { Route, Routes } from "react-router"

import MapPage from "./pages/MapPage"
import AboutPage from "./pages/AboutPage"

import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import GovFacPage from "./pages/GovFacPage"
import QuestDetailPage from "./pages/QuestDetailPage"
import UserProfilePage from "./pages/UserProfilePage"

import "./styles/App.css";
function App() {
  return (
    <>
      <Header/>


      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/govfac" element={<GovFacPage />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserProfilePage />} />

        <Route path="/quests/:id" element={<QuestDetailPage />} />

      </Routes>



      <Footer/>
    </>
  )
}

export default App