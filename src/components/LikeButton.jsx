import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../context/SocketContext";

function LikeButton({ courseId, initialLikes, likedBy }) {
    const socket = useSocket();
    const currentStudent = useSelector((state) => state.student.currentStudent);
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(currentStudent && likedBy.includes(currentStudent.id));
    const [errorMessage, setErrorMessage] = useState("");

    const handleLike = () => {
        if (currentStudent) {
            socket.emit("likeCourse", { courseId, userId: currentStudent.id });
        } else {
            setErrorMessage("Please login first!");
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on("updateLikes", (updatedCourses) => {
                const updatedCourse = updatedCourses.find((course) => course.id === courseId);
                if (updatedCourse) {
                    setLikes(updatedCourse.likes);
                    setIsLiked(currentStudent && updatedCourse.likedBy.includes(currentStudent.id));
                }
            });
        }

        return () => {
            if (socket) socket.off("updateLikes");
        };
    }, [socket, courseId, currentStudent]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div>
            <div className="flex items-center">
                <p className="text-md text-gray-400">Likes: {likes}</p>
                <button onClick={handleLike} className="px-4 py-2 text-white rounded-md">
                    {isLiked ? (
                        <img
                            src="https://img.icons8.com/?size=100&id=JD2A4WXqotI8&format=png&color=7950F2"
                            className="w-8 h-8"
                        />
                    ) : (
                        <img
                            src="https://img.icons8.com/?size=100&id=L2sPz0nl-coE&format=png&color=7950F2"
                            className="w-8 h-8"
                        />
                    )}
                </button>
            </div>
            {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
        </div>
    );
}

export default LikeButton;
