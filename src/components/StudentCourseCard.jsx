import { useDispatch } from "react-redux";
import { completeCourse } from "../store/coursesSlice";
import LikeButton from "./LikeButton";

function StudentCourseCard({ course, isCompleted }) {
    const dispatch = useDispatch();

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img
                src={course.thumbnail}
                alt={course.name}
                className="w-full max-h-72 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-white mt-2">{course.name}</h3>
            <p className="text-sm text-gray-400">Instructor: {course.instructor}</p>
            <p className="text-sm text-gray-400">Duration: {course.duration}</p>
            <p className={`flex gap-2 text-sm`}>
                Status:{" "}
                {isCompleted ? (
                    <p className="text-green-500">Completed</p>
                ) : (
                    <p className="text-yellow-400">Incomplete</p>
                )}
            </p>

            <div className="mt-2 flex items-center gap-2">
                <p className="text-sm text-gray-400">Progress:</p>
                <div className="w-full bg-gray-700 h-2 rounded-md mt-1">
                    <div
                        className={`h-2 rounded-md ${
                            isCompleted ? "bg-green-500 w-full" : "bg-yellow-500 w-1/2"
                        }`}
                    ></div>
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => dispatch(completeCourse(course.id))}
                    className={`px-4 h-10 text-white rounded-md ${
                        isCompleted ? "bg-gray-600" : "bg-purple-600"
                    }`}
                >
                    {isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                </button>
                <LikeButton
                    courseId={course.id}
                    initialLikes={course.likes}
                    likedBy={course.likedBy}
                />
            </div>
        </div>
    );
}

export default StudentCourseCard;
