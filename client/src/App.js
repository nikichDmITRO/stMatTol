import { Layout } from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Posts } from "./pages/Posts";
import { Post } from "./pages/Post";
import { AddPost } from "./pages/AddPost";
import { EditPost } from "./pages/EditPost";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/slices/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="posts" element={<Posts />} />
        <Route path=":id" element={<Post />} />
        <Route path="new" element={<AddPost />} />
        <Route path=":id/edit" element={<EditPost />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
