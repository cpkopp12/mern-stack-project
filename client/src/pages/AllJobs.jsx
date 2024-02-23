// IMPORTS -------------------
import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

// LOADER - all jobs by user -----------------------------
export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/jobs");
    return {
      data,
    };
  } catch (err) {
    toast.error(err?.response?.data?.msg);
    return err;
  }
};

// SETUP ALL JOBS CONTEXT - need for component functionality ------------
const AllJobsContext = createContext();

// PAGE COMPONENT -----------------
const AllJobs = () => {
  const { data } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

// export context hook -------------
export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
