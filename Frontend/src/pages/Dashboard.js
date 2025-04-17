import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [editJob, setEditJob] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: "",
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/jobs");
                setJobs(res.data);
            } catch (err) {
                console.error("Error fetching jobs:", err);
            }
        };
        fetchJobs();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // ✅ Add Job Functionality
    const handleAddJob = async () => {
        try {
            if (!token) {
                console.error("No token found, please log in.");
                return;
            }
            const res = await axios.post(
                "http://localhost:4000/api/jobs/add",
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setJobs([...jobs, res.data]);
            setFormData({ title: "", company: "", description: "", location: "", salary: "" });
        } catch (err) {
            console.error("Error adding job:", err.response?.data || err.message);
        }
    };

    // ✅ Delete Job Functionality
    const handleDelete = async (id) => {
        try {
            if (!token) {
                console.error("No token found, please log in.");
                return;
            }
            await axios.delete(`http://localhost:4000/api/jobs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setJobs(jobs.filter((job) => job._id !== id));
        } catch (err) {
            console.error("Error deleting job:", err.response?.data || err.message);
        }
    };

    // ✅ Edit Job Functionality
    const handleEdit = (job) => {
        setEditJob(job);
        setFormData({
            title: job.title,
            company: job.company,
            description: job.description,
            location: job.location,
            salary: job.salary,
        });
    };

    // ✅ Update Job Functionality
    const handleUpdate = async () => {
        try {
            if (!token) {
                console.error("No token found, please log in.");
                return;
            }
            const res = await axios.put(`http://localhost:4000/api/jobs/${editJob._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setJobs(jobs.map((job) => (job._id === editJob._id ? res.data : job)));
            setEditJob(null);
            setFormData({ title: "", company: "", description: "", location: "", salary: "" });
        } catch (err) {
            console.error("Error updating job:", err.response?.data || err.message);
        }
    };

    return (
        <div>
            <header>
                <h2>Dashboard</h2>
                <button onClick={handleLogout}>Logout</button>
            </header>

            {/* Add Job Form */}
            <div className="add-job-form">
                <h3>Add Job</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
                <button onClick={handleAddJob}>Add Job</button>
            </div>

            {/* Job List */}
            <div className="job-list">
                {jobs.map((job) => (
                    <div key={job._id} className="job-card">
                        <h3>{job.title}</h3>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Description:</strong> {job.description}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Salary:</strong> ${job.salary}</p>
                        <div className="job-actions">
                            <button onClick={() => handleEdit(job)}>Edit</button>
                            <button onClick={() => handleDelete(job._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Job Form */}
            {editJob && (
                <div className="edit-job-form">
                    <h3>Edit Job</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Update Job</button>
                    <button onClick={() => setEditJob(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
