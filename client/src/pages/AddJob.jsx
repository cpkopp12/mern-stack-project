// IMPORTS ---------------------------------
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../uitls/constants.js";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";
import FormRowSeclect from "../components/FormRowSeclect.jsx";

// PAGE ACTION -----------------------
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/jobs/", data);
    toast.success("Job added sucessfully");
    return redirect("all-jobs");
  } catch (err) {
    toast.error(err?.response?.data?.msg);
    return err;
  }
};

// PAGE COMPONENT -----------------------------------
const AddJob = () => {
  const { user } = useOutletContext();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add your job</h4>
        <div className='form-center'>
          {/* text rows */}
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={user.location}
          />
          {/* select rows */}
          <FormRowSeclect
            labelText='job status'
            name='jobStatus'
            defaultValue={JOB_STATUS.PENDING}
            valueList={Object.values(JOB_STATUS)}
          />
          <FormRowSeclect
            labelText='job type'
            name='jobType'
            defaultValue={JOB_TYPE.FULL_TIME}
            valueList={Object.values(JOB_TYPE)}
          />
          <button
            type='submit'
            className='btn btn-block form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? "adding job ..." : "add job"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
