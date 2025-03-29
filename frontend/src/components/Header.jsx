import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Patient Entry System</h1>
      <div>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </header>
  );
};

export default Header;
