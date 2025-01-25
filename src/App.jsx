import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Posts from "./components/Posts"
import Users from "./components/Users"
import PostDetail from "./components/PostDetail"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/" element={<Navigate to="/posts" />} />
      </Routes>
    </>
  )
}

export default App
