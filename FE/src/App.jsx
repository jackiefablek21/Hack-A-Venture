import Header from "./components/header"
import Footer from "./components/footer"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import MapPage from "./pages/MapPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import GovFacPage from "./pages/GovFacPage"

import "./styles/App.css";
import UserProfilePage from "./pages/userProfilePage"
function App() {
  return (
    <>
      <Header/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/govfac" element={<GovFacPage />}></Route>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserProfilePage />} />
        <Route path="/quest:id" element={<UserProfilePage />} />

      </Routes>

      <Footer/>
    </>
  )
}

export default App
