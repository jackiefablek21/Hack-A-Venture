import Header from "./components/header.jsx"
import Footer from "./components/footer.jsx"
import Navbar from "./components/navbar.jsx"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage.jsx"
import "./App.css";
import "./styles/homepage.css";

function App() {
  return (
    <>
    <Header>
    </Header>

    <Routes>
        <Route path="/" element={<HomePage />}></Route>
    </Routes>
        <Navbar>
        </Navbar>

    <Footer></Footer>
    </>
  )
}

export default App
