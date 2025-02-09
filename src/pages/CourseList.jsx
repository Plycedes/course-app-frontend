import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses, updateLikes } from "../store/coursesSlice";
import CourseCard from "../components/CourseCard";
import { useSocket } from "../context/SocketContext";

function CourseList() {
    const dispatch = useDispatch();
    const socket = useSocket();
    const courses = useSelector((state) => state.courses.list);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchCourses());

        if (socket) {
            socket.on("updateLikes", (updatedCourses) => {
                dispatch(updateLikes(updatedCourses));
            });

            socket.on("errorMessage", (message) => {
                setErrorMessage(message);
                setTimeout(() => setErrorMessage(""), 3000);
            });
        }

        return () => {
            if (socket) {
                socket.off("updateLikes");
                socket.off("errorMessage");
            }
        };
    }, [dispatch, socket]);

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-primary">Courses</h1>

            <input
                type="text"
                placeholder="Search courses..."
                className="w-full p-2 mt-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)
                ) : (
                    <p className="text-gray-400 mt-4">No courses found.</p>
                )}
            </div>
        </div>
    );
}

export default CourseList;
