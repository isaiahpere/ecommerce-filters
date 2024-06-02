import React from "react";

const Navbar = () => {
  return (
    <nav className="h-5 flex items-center justify-between p-6">
      <h2 className="text-2xl font-mono">Ecommerce Store</h2>
      <input type="text" placeholder="Search for product..." className="p-2" />
    </nav>
  );
};

export default Navbar;
