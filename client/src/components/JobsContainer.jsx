import React from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";

import { useAllJobsContext } from "../pages/AllJobs.jsx";

const JobsContainer = () => {
  // data from all-jobs context, destructure
  const { data } = useAllJobsContext();
  const { jobs } = data;

  // check if empty
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display ... </h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
