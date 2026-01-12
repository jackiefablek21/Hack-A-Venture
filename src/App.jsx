import Header from "./components/header"
import Footer from "./components/footer"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import "./App.css";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
