import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./Home"
import Navigation from "./Navigation"
import Profile from "./Profile"
import Search from "./Search"

function App() {

  return (
    <>
      <Navigation />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:pid/*" element={<h1>Profile 2</h1>} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:criteria" element={<h1>Post Search</h1>} />
          <Route path="/details" element={<h1>Post Search</h1>} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
