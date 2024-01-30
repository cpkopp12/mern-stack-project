// IMPORTS --------------------------------
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

// form submit action
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration succeeded');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// REGISTER PAGE ---------------------------
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="default-name" />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue="default-lastName"
        />
        <FormRow type="text" name="location" defaultValue="default-location" />
        <FormRow
          type="email"
          name="email"
          defaultValue="default-email@email.com"
        />
        <FormRow
          type="password"
          name="password"
          defaultValue="default-password"
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting' : 'submit'}
        </button>
        <p>
          Already registered?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

// EXPORT -----------------------------------
export default Register;
