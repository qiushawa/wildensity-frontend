import React from "react";
import { NavLink } from "react-router-dom";
interface NavLinkProps {
  href: string;
  label: string;
}

interface NavProps {
  navLinks: NavLinkProps[];
}

const Nav: React.FC<NavProps> = ({ navLinks }) => {
  return (
    <>
      <nav className="text-black p-4 shadow-md  py-5 ">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">動物密度觀測</h1>
          <div className="space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-600 underline"
                    : "text-black hover:text-blue-600"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
