"use client";

import Link from "next/link";
import { Home, PlusCircle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      {/* Logo */}
      <div className="text-xl font-bold">MyApp</div>

      {/* Navigation Menu */}
      <div className="flex gap-6">
        <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-black">
          <Home size={20} /> Home
        </Link>
        <Link href="/post/create" className="flex items-center gap-2 text-gray-700 hover:text-black">
          <PlusCircle size={20} /> Add Post
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
