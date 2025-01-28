import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Posts from "./components/Posts"
import Users from "./components/Users"
import PostDetail from "./components/PostDetail"
import Signup from "./components/Signup"
import UserDetail from "./components/UserDetail"
import UserAccount from "./components/UserAccount"
import Login from "./components/Login"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/logout" element={<Navigate to="/posts" />} />
      </Routes>
    </>
  )
}

export default App
