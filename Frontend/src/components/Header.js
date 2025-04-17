import { Link, useNavigate } from "react-router-dom";

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header>
      <div className="logo">Job Finder</div>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
