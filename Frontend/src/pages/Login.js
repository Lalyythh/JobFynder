import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:4000/api/auth/login", {
                email,
                password,
            });

            // ✅ Store token & user details in localStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard"); // ✅ Redirect to dashboard on success
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);

            // ✅ Redirect to signup if login fails
            if (err.response?.status === 400) {
                alert("Invalid credentials! Redirecting to signup...");
                navigate("/signup");
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
