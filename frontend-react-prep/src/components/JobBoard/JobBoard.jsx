import React, { useEffect, useState } from 'react';

const Job_Id_Api = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const Job_Details_Api = "https://hacker-news.firebaseio.com/v0/item/";
const Jobs_Per_Page = 6;

const JobBoard = () => {
    const [jobIds, setJobIds] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [start, setStart] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchJobIds();
    }, []);

    async function fetchJobIds() {
        const res = await fetch(Job_Id_Api);
        const result = await res.json();
        setJobIds(result);
    }

    useEffect(() => {
        if (jobIds.length > 0) {
            fetchJobDetails(start, start + Jobs_Per_Page);
        }
    }, [jobIds, start]);

    async function fetchJobDetails(start, end) {
        setIsLoading(true);
        const jobIdsSlice = jobIds.slice(start, end);

        const jobPromises = jobIdsSlice.map((id) =>
            fetch(`${Job_Details_Api}${id}.json`).then((res) => res.json())
        );

        const jobResults = await Promise.all(jobPromises);

        setJobs((prevJobs) => [...prevJobs, ...jobResults]);
        setIsLoading(false);
    }

    return (
        <div>
            <h1>Job Board</h1>
            {jobs.map((job) => (
                <div key={job.id}>
                    <a href={job.url} target="_blank" rel="noreferrer">{job.title}</a>
                    <p>By {job.by}</p>
                </div>
            ))}
            {isLoading && <p>Loading...</p>}
            <button onClick={() => setStart((prev) => prev + Jobs_Per_Page)}>
                Load More
            </button>
        </div>
    );
};

export default JobBoard