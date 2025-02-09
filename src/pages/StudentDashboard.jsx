import { useSelector } from "react-redux";
import StudentCourseCard from "../components/StudentCourseCard";

function StudentDashboard() {
    const currentStudent = useSelector((state) => state.student.currentStudent);
    const courses = useSelector((state) => state.courses.list);

    if (!currentStudent) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-primary">Student Dashboard</h1>
                <p className="mt-4 text-gray-400">Please log in to view courses.</p>
            </div>
        );
    }

    const enrolledCourses = courses.filter((course) =>
        course.students.some((student) => student.id === currentStudent.id)
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-primary">Welcome {currentStudent.name}</h1>
            {enrolledCourses.length === 0 ? (
                <p className="mt-4 text-gray-400">No enrolled courses.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {enrolledCourses.map((course) => (
                        <StudentCourseCard
                            key={course.id}
                            course={course}
                            isCompleted={course.completed}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;
