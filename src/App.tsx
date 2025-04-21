import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./Home"
import Navigation from "./Navigation"
import Profile from "./Account/Profile"
import Search from "./Search"
import SignIn from "./Account/SignIn"
import SignUp from "./Account/Signup"

function App() {

  return (
    <div id="happy-hour">
      <Navigation />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:pid/*" element={<h1>Profile 2</h1>} />
          <Route path="/signin" element={<SignIn />} /> 
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/search" element={<Search />} />
          <Route path="/search/:criteria" element={<h1>Post Search</h1>} />
          <Route path="/details" element={<h1>Post Search</h1>} />
          <Route path="/details/:drinkid" element={<h1>Individual Drink Details</h1>} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
