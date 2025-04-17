import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddJob() {
    const [formData, setFormData] = useState({ title: "", company: "", location: "", salary: "", description: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/jobs/add", formData);
            navigate("/dashboard");
        } catch (err) {
            console.error("Error adding job:", err);
        }
    };

    return (
        <div className="add-job">
            <h2>Add New Job</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Job Title" onChange={handleChange} required />
                <input type="text" name="company" placeholder="Company Name" onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
                <input type="number" name="salary" placeholder="Salary" onChange={handleChange} required />
                <textarea name="description" placeholder="Job Description" onChange={handleChange} required></textarea>
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
}

export default AddJob;
