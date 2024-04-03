import React from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from './PageBtnContainer';
import { useAllJobsContext } from '../pages/AllJobs.jsx';

const JobsContainer = () => {
  // data from all-jobs context, destructure
  const { data } = useAllJobsContext();
  console.log(data);
  const { jobs, totalJobs, numberOfPages } = data;

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
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numberOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
