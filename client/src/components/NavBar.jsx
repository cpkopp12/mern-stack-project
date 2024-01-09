import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';

const NavBar = () => {
  // dashboard context
  const { toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <div type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </div>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">toggle/logout</div>
      </div>
    </Wrapper>
  );
};
export default NavBar;
