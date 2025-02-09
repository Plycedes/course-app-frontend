import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

function CourseCard({ course }) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img
                src={course.thumbnail}
                alt={course.name}
                className="w-full max-h-72 object-cover rounded-md"
            />
            <h3 className="text-2xl font-semibold mt-2">{course.name}</h3>
            <p className="text-md text-gray-400">Instructor: {course.instructor}</p>

            <div className="flex justify-between">
                <Link to={`/courses/${course.id}`} className="text-primary mt-2 block">
                    <p className="p-2 bg-purple-600 max-w-30 rounded-lg flex justify-center items-center">
                        View Details
                    </p>
                </Link>
                <LikeButton
                    courseId={course.id}
                    initialLikes={course.likes}
                    likedBy={course.likedBy}
                />
            </div>
        </div>
    );
}

export default CourseCard;
