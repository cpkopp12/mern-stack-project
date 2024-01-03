//IMPORTS ------------------------------------
import styled from 'styled-components';
//styled wrapper
import Wrapper from '../assets/wrappers/LandingPage';
//assets images
import main from '../assets/images/main.svg';
import logo from '../assets/images/logo.svg';
//link import
import { Link } from 'react-router-dom';
import { Logo } from '../components';

//COMPONENT ----------------------------------
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
            quasi a alias, temporibus tenetur quis inventore maxime, debitis
            iste fugiat, dolorem earum consequatur eaque modi officia quam
            dolores magni saepe.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
      </div>
    </Wrapper>
  );
};

//EXPORT ---------------------
export default Landing;
