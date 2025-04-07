import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authslice";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux se userID aur blogs fetch karna
    const userId = useSelector(state => state.auth.person?.id) || ""; 
    const blogs = useSelector(state => state.blogs.blogs) || [];

    useEffect(() => {
        console.log("Blogs:", blogs);  // Debug: Blogs data
        console.log("User ID:", userId); // Debug: User ID
        console.log("Search Query:", searchQuery); // Debug: search query

        if (!searchQuery.trim()) {
            setFilteredBlogs([]);
            return;
        }

        // ✅ Filter logic
        const filtered = blogs.filter(blog => 
            (blog?.user?._id?.toString() === userId?.toString() || blog?.user?.toString() === userId?.toString()) &&
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        console.log("Filtered Blogs:", filtered); // Debug: Check filtered data
        setFilteredBlogs(filtered);
    }, [searchQuery, blogs, userId]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
            <h1 className="text-xl font-bold text-gray-800 flex gap-1">
                <Leaf className="w-8 h-8 text-teal-600" /> TechPause
            </h1>

            {/* 🔹 Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    className="w-auto border-b-2 border-gray-300 focus:border-gray-600 p-1 placeholder-gray-500 outline-none"
                    placeholder="Search Your Blogs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* 🔹 Search Results (Filtered Blogs) */}
                {filteredBlogs.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 mt-2 z-50 max-h-60 overflow-y-auto">
                        <ul>
                            {filteredBlogs.map((blog) => (
                                <li key={blog._id} className="p-2 border-b">
                                    <Link to={`/blogs/${blog._id}`} className="text-gray-600 hover:text-red-500">
                                        {blog.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="hidden md:flex space-x-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-red-500">Dashboard</Link>
                <Link to="/post" className="text-gray-600 hover:text-red-500">Posts</Link>
                <Link to="/aboutUs" className="text-gray-600 hover:text-red-500">About</Link>
                <Link to="/contactUs" className="text-gray-600 hover:text-red-500">Contact</Link>
                <Link to="/help" className="text-gray-600 hover:text-red-500">Help</Link>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 hover:text-red-400 font-bold"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
