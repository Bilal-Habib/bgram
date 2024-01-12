import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";
import { UploadPost } from "./pages/UploadPost";

function App() {
  const authUser = useAuthStore(state => state.user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to='/'/>} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to='/'/>} />
        <Route path="/" element={authUser ? <Home /> : <Navigate to='/login'/>} />
        <Route path="/upload-post" element={authUser ? <UploadPost /> : <Navigate to='/login'/>} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to='/login'/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
