// IMPORTS --------------------------------------------------------------
import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, NavBar, SmallSidebar } from '../components';
import { createContext, useContext, useState } from 'react';
import { checkDefaultTheme } from '../App';

//context for sidebars + navbar -------------------------------------------
const DashboardContext = createContext();

// Dashboard Component ----------------------------------------------------
const DashboardLayout = () => {
  //temp globals
  const user = { name: 'tempUser' };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  //place holder funcs
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // vanilla js to toggle class on body element
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log('logout user');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// EXPORT custom context hook and component -----------------------------------------------
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
