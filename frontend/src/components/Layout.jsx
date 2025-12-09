// import React, { useState } from 'react'
// import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import MobileNavbar from './MobileNavbar';
// import SearchBar from './SearchBar'; // 👈 import it

// const Layout = () => {
//   const [search, setSearch] = useState("");
// const [mobileToggle, setMobileToggle] = useState(false);
//   return (
//     <div className="relative">
//       <Navbar search={search} setSearch={setSearch} />
//       {/* Show SearchBar on top of everything */}
//       {mobileToggle && (
//         <div className="fixed  bg-white z-[100]">
//           <SearchBar closeSearch={() => setMobileToggle(false)} />
//         </div>
//       )}

      
//       <Outlet context={{ search, setSearch, mobileToggle, setMobileToggle }} />

//       <Footer />

//       <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md md:hidden">
//         <MobileNavbar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} />
//       </div>
//     </div>
//   )
// }

// export default Layout


import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileNavbar from './MobileNavbar';
import SearchBar from './SearchBar'; // 👈 import it

const Layout = () => {
  const [search, setSearch] = useState("");
  const [mobileToggle, setMobileToggle] = useState(false);

  // Disable scroll when search bar is open
  useEffect(() => {
    if (mobileToggle) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileToggle]);

  return (
    <div className="relative">
      <Navbar search={search} setSearch={setSearch} />

      {/* Show SearchBar on top of everything */}
      {mobileToggle && (
  <div className="fixed inset-0 w-full h-full bg-white z-[100] overflow-auto">
    <Navbar/>
    <SearchBar closeSearch={() => setMobileToggle(false)} />
  </div>
)}


      <Outlet context={{ search, setSearch, mobileToggle, setMobileToggle }} />

      <Footer />

      <div className="fixed bottom-0 left-0 w-full z-150 bg-white shadow-md md:hidden">
        <MobileNavbar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} />
      </div>
    </div>
  );
};

export default Layout;
