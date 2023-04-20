import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlog from "./pages/UserBlog";
import CreateBlog from "./pages/CreateBlog";
import BlogDatails from "./pages/BlogDatails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Header/>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Blogs/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/my-blogs" element={<UserBlog/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Create-Blog" element={<CreateBlog/>}/>
        <Route path="/Blog-Datails/:id" element={<BlogDatails/>}/>
      </Routes>
    </>
  );
}

export default App;
