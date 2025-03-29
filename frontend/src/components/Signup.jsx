import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", { username, password });
      alert("Signup successful! Please log in.");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      alert("Signup failed! User may already exist.");
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input 
        className="border p-2 w-full mb-2" 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />
      <input 
        className="border p-2 w-full mb-2" 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <input 
        className="border p-2 w-full mb-2" 
        type="password" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        required 
      />
      <button className="bg-blue-500 text-white px-4 py-2 w-full">Signup</button>
    </form>
  );
};

export default Signup;
