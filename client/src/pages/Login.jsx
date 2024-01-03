import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      {/* if you wanted to link externally, you would need the href element */}
      <Link to="/register">Register Page</Link>
    </div>
  );
};
export default Login;
