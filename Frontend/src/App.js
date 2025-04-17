import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.css"; // Import Global Styles

function App() {
  const token = localStorage.getItem("token"); // Check if user is logged in

  return (
    <Router>
      <header>
        <div className="logo">Job Finder</div>
        <nav>
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Dashboard Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
