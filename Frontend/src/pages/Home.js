import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/jobSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { jobs, status } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div>
      <h2>Job Listings</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Failed to load jobs</p>}
      {status === "succeeded" &&
        jobs.map((job) => (
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
          </div>
        ))}
    </div>
  );
};

export default Home;
