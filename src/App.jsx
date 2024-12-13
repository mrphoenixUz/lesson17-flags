import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Navbar from "./components/navbar"
import Country from "./components/Country"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/country/:name" element={<Country />} />
      </Routes>
    </>
  )
}

export default App
