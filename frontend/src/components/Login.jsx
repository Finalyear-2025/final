import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅

const Login = () => {
  const { t } = useTranslation(); // ✅
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      if (res.data === "User does not exist") {
        alert(t("user_not_exist")); // ✅
        navigate("/Signup");
      } else {
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          console.log("Token removed after 1 hour");
        }, 3600000);

        alert(t("login_success")); // ✅
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert(t("login_failed")); // ✅
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-6 max-w-sm mx-auto">
      <input
        className="border p-2 w-full mb-2"
        type="text"
        placeholder={t("username")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder={t("password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 w-full">
        {t("login")}
      </button>
    </form>
  );
};

export default Login;
