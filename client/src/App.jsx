import Header from "./components/header.jsx"
import Footer from "./components/footer.jsx"
import Navbar from "./components/navbar.jsx"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage.jsx"
import MapPage from "./pages/MapPage"
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UserProfilePage from "./pages/userProfilePage.jsx";
import "./styles/App.css";
import "./styles/home.css";

function App() {
  return (
    <>
    <Header>
    </Header>


    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserProfilePage />} />
    </Routes>
        <Navbar>
        </Navbar>


    <Footer></Footer>
    </>
  )
}

export default App
