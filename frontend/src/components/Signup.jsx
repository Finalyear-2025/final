import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ Import i18n

const Signup = () => {
  const { t } = useTranslation(); // ✅ Initialize translation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert(t("password_mismatch")); // ✅ Translated message
      return;
    }

    try {
      await axios.post("http://localhost:5000/auth/signup", { username, password });
      alert(t("signup_success")); // ✅
      navigate("/login");
    } catch (err) {
      alert(t("signup_failed")); // ✅
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-6 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">{t("signup")}</h2>
      <input
        className="border p-2 w-full mb-2"
        type="text"
        placeholder={t("username")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder={t("password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder={t("confirm_password")}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 w-full">
        {t("signup")}
      </button>
    </form>
  );
};

export default Signup;
