import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Student from '../pages/Student';
import Admin from '../pages/Admin';

export default function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Signup />} />
          <Route path="Login" element={<Login />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="Student" element={<Student/>}/>
        </Routes>
      </Router>
    </>
  );
}
