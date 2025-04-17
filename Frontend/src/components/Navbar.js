import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Job Board</h1>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
};

export default Navbar;
