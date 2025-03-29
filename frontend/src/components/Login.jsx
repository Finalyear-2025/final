import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { username, password });
    //   console.log(res.data)
      if(res.data=="User does not exist"){
        alert(res.data)
        navigate("/Signup")
      }
      else{
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/");
        }
    } catch (err) {
        console.log(err)
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 max-w-sm mx-auto">
      <input className="border p-2 w-full mb-2" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="border p-2 w-full mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 w-full">Login</button>
    </form>
  );
};

export default Login;
