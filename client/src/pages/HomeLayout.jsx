import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      <nav>navbar</nav>
      {/* Outlet contains child component of current url - for home url will show child labled index, 
      rest displayed on all pages */}
      <Outlet />
    </div>
  );
};
export default HomeLayout;
