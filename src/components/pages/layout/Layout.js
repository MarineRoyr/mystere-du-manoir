import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';




const Layout = () => {
  return (
    <div>
      <main className='mainContent'>
        <div> 
 
       
          <Outlet />  </div>
        <div>
          <Footer />
        </div>

      </main>
    </div>
  );
}



export default Layout;