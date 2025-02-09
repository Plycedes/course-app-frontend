import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import LikeButton from "../components/LikeButton";

function CourseDetails() {
    const { id } = useParams();
    const course = useSelector((state) => state.courses.list.find((c) => c.id === Number(id)));

    const [expanded, setExpanded] = useState(false);

    if (!course) return <div className="text-center text-red-500">Course not found.</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg mt-5">
            <img
                src={course.thumbnail}
                alt={course.name}
                className="w-full max-h-72 object-cover rounded-md"
            />
            <div className="flex justify-between items-center mt-2">
                <h1 className="text-3xl font-bold text-primary">{course.name}</h1>
                <LikeButton
                    courseId={course.id}
                    initialLikes={course.likes}
                    likedBy={course.likedBy}
                />
            </div>

            <p className="text-gray-400 mt-1">
                Instructor: <span className="text-white">{course.instructor}</span>
            </p>
            <p className="mt-4">{course.description}</p>

            <div className="mt-6">
                <p>
                    <strong>Enrollment Status:</strong> {course.enrollmentStatus}
                </p>
                <p>
                    <strong>Duration:</strong> {course.duration}
                </p>
                <p>
                    <strong>Schedule:</strong> {course.schedule}
                </p>
                <p>
                    <strong>Location:</strong> {course.location}
                </p>
                <p>
                    <strong>Pre-requisites:</strong> {course.prerequisites.join(", ")}
                </p>
            </div>

            {/* Syllabus Section */}
            <div className="mt-6">
                <button
                    className="w-full text-left font-semibold text-primary"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "▼ Collapse Syllabus" : "▶ Expand Syllabus"}
                </button>
                {expanded && (
                    <ul className="mt-2 bg-gray-700 p-4 rounded-md">
                        {course.syllabus.map((week) => (
                            <li key={week.week} className="mb-2">
                                <p className="text-lg font-semibold text-white">
                                    Week {week.week}: {week.topic}
                                </p>
                                <p className="text-sm text-gray-300">{week.content}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default CourseDetails;
