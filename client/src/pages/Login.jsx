import { Link, Form, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, SubmitBtn, Logo } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("take a test drive!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>login</h4>
        <FormRow
          type='email'
          name='email'
          defaultValue='default-email@email.com'
        />
        <FormRow
          type='password'
          name='password'
          defaultValue='default-password'
        />
        <SubmitBtn />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not registered yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
