import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStudent } from "../store/studentSlice";

function StudentLoginDialog({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.student.error);
    const currentStudent = useSelector((state) => state.student.currentStudent);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        dispatch(loginStudent({ username, password }));
    };

    useEffect(() => {
        if (currentStudent) {
            setUsername("");
            setPassword("");
            onClose();
        }
    }, [currentStudent, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-primary">Student Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 bg-gray-700 text-white mt-4 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 bg-gray-700 text-white mt-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500">{error}</p>}

                <div className="mt-4 flex justify-between">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleLogin}
                        className="px-4 py-2 bg-purple-600 text-white rounded"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudentLoginDialog;
