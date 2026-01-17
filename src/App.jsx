import Header from "./components/header"
import Footer from "./components/footer"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import MapPage from "./pages/MapPage"
import "./App.css";
import "./styles/homepage.css";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="map" element={<MapPage />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
