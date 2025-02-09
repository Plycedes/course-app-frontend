import { Routes, Route, Navigate } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import Navbar from "./components/Navbar";
import CourseList from "./pages/CourseList";
import CourseDetails from "./pages/CourseDetails";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
    return (
        <SocketProvider>
            <div className="min-h-screen bg-gray-900 text-gray-200">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/courses" />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/courses/:id" element={<CourseDetails />} />
                    <Route path="/dashboard" element={<StudentDashboard />} />
                </Routes>
            </div>
        </SocketProvider>
    );
}

export default App;

