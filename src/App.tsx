import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./Home"
import Navigation from "./Navigation"
import Profile from "./Account/Profile"
import Search from "./Search"
import SignIn from "./Account/SignIn"
import SignUp from "./Account/Signup"
import { Provider } from "react-redux"
import store from "./store"
import ProtectedRoute from "./Account/ProtectedRoute"
import Session from "./Account/Session"

function App() {

  return (
    <Session>
      <div id="happy-hour">
        <Navigation />
        <HashRouter>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home/*" element={<Home />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile/:pid/*" element={<h1>Profile 2</h1>} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:criteria" element={<h1>Post Search</h1>} />
              <Route path="/details" element={<h1>Post Search</h1>} />
              <Route path="/details/:drinkid" element={<h1>Individual Drink Details</h1>} />
            </Routes>
          </Provider>
        </HashRouter>
      </div>
    </Session>
  )
}

export default App
