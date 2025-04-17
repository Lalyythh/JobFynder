import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css"; // Import Global Styles

function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/auth/register", formData);
            alert("User Registered Successfully");
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
}

export default Signup;
