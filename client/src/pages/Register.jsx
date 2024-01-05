// IMPORTS --------------------------------
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import Logo from '../components/Logo';
import { FormRow } from '../components';

// REGISTER PAGE ---------------------------
const Register = () => {
  return (
    <Wrapper>
      <form className="form">
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
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          Already registered?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

// EXPORT -----------------------------------
export default Register;
