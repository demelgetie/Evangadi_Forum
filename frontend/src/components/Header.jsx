import { Link } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header>
      <h2>Evangadi Forum</h2>
      <nav>
        <Link to="/">Home</Link>
        {token && <Link to="/ask">Ask Question</Link>}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Sign Up</Link>}
        {token && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
}

export default Header;
