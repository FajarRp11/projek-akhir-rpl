import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link as LinkRoute } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk status login

  // Periksa local storage untuk status login
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Set true jika ada data user di local storage
  }, []);

  // Array tautan navigasi, filter berdasarkan status login
  const navLink = [
    {
      id: 1,
      title: "Home",
      path: "/",
    },
    {
      id: 2,
      title: "Who We Are",
      path: "/team",
    },
    {
      id: 3,
      title: "Budaya",
      path: "/budayas",
    },
    {
      id: 4,
      title: "Nilai Luhur",
      path: "/nilai-luhur",
    },
    {
      id: 5,
      title: "Contact Us",
      path: "/contact-us",
    },
    // Hanya tampilkan "Admin Login" jika belum login
    !isLoggedIn && {
      id: 6,
      title: "Admin Login",
      path: "/login",
    },
    // Tampilkan "Dashboard" jika sudah login
    isLoggedIn && {
      id: 7,
      title: "Dashboard",
      path: "/dashboard",
    },
  ].filter(Boolean); // Filter elemen undefined dari array

  return (
    <div className="bg-black/70 backdrop-blur fixed top-0 left-0 h-14 w-full text-slate-200 flex items-center justify-between px-8 md:px-16 z-30">
      <LinkRoute
        to="/"
        className="font-raleway text-xl transition-all duration-200 cursor-pointer hover:tracking-wider hover:font-semibold"
      >
        Lentera Minang
      </LinkRoute>
      <div className="items-center hidden gap-4 md:flex">
        {navLink.map(({ id, title, path }) => (
          <p
            className="transition-all duration-200 cursor-pointer hover:tracking-wide hover:font-semibold"
            key={id}
          >
            <LinkRoute to={path}>{title}</LinkRoute>
          </p>
        ))}
      </div>

      <div
        className="z-10 flex items-center justify-center w-12 text-slate-200 rounded cursor-pointer aspect-square md:hidden"
        onClick={() => setNav(!nav)}
      >
        {nav ? (
          <FaTimes size={25} className="text-gray-900 mt-6" />
        ) : (
          <FaBars size={25} />
        )}
      </div>

      <AnimatePresence>
        {nav && (
          <motion.ul
            key={nav}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-screen gap-2 py-5 text-xl text-center rounded bg-slate-200/95 backdrop-blur text-gray-900"
          >
            {navLink.map(({ id, title, path }) => (
              <li
                className="transition-all duration-200 hover:tracking-wide hover:font-semibold cursor-pointer"
                key={id}
              >
                <p>
                  <LinkRoute to={path}>{title}</LinkRoute>
                </p>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
