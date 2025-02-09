import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import StudentLoginDialog from "./StudentLoginDialog";
import { logoutStudent } from "../store/studentSlice";

function Navbar() {
    const location = useLocation();
    const currentStudent = useSelector((state) => state.student.currentStudent);
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className="p-4 bg-gray-800 shadow-md w-full">
                <div className="flex justify-between items-center w-full px-6">
                    <h1 className="text-purple-500 text-2xl font-bold">CourseApp</h1>

                    <div className="hidden md:flex gap-2">
                        <Link
                            to="/courses"
                            className={`px-4 rounded-md ${
                                location.pathname === "/courses"
                                    ? "text-purple-500 font-bold"
                                    : "text-gray-300 hover:text-white"
                            }`}
                        >
                            Courses
                        </Link>
                        <Link
                            to="/dashboard"
                            className={`px-4 rounded-md ${
                                location.pathname === "/dashboard"
                                    ? "text-purple-500 font-bold"
                                    : "text-gray-300 hover:text-white"
                            }`}
                        >
                            Dashboard
                        </Link>
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-white focus:outline-none"
                    >
                        {menuOpen ? (
                            <span className="text-2xl">✖</span>
                        ) : (
                            <span className="text-2xl">☰</span>
                        )}
                    </button>

                    <div className="hidden md:flex gap-4">
                        {currentStudent ? (
                            <button
                                onClick={() => dispatch(logoutStudent())}
                                className="px-4 py-2 bg-red-700 text-white rounded-md"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden flex flex-col bg-gray-900 mt-2 py-2">
                        <Link
                            to="/courses"
                            onClick={() => setMenuOpen(false)}
                            className={`px-6 py-2 text-lg ${
                                location.pathname === "/courses"
                                    ? "text-purple-500 font-bold"
                                    : "text-gray-300 hover:text-white"
                            }`}
                        >
                            Courses
                        </Link>
                        <Link
                            to="/dashboard"
                            onClick={() => setMenuOpen(false)}
                            className={`px-6 py-2 text-lg ${
                                location.pathname === "/dashboard"
                                    ? "text-purple-500 font-bold"
                                    : "text-gray-300 hover:text-white"
                            }`}
                        >
                            Dashboard
                        </Link>

                        <div className="px-6 py-2">
                            {currentStudent ? (
                                <button
                                    onClick={() => {
                                        dispatch(logoutStudent());
                                        setMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-2 bg-red-700 text-white rounded-md"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsDialogOpen(true);
                                        setMenuOpen(false);
                                    }}
                                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-md"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <StudentLoginDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
        </>
    );
}

export default Navbar;
