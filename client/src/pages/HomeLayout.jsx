import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      {/* Outlet contains child component of current url - for home url will show child labled index, 
      rest displayed on all pages */}
      <Outlet />
    </>
  );
};
export default HomeLayout;
