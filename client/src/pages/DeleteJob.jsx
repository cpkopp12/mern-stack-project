import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("job deleted!");
  } catch (error) {
    toast.error(error.response.data.message);
  }
  return redirect("/dashboard/all-jobs");
};

const DeleteJob = () => {
  return <h1>DeleteJob Page</h1>;
};
export default DeleteJob;
