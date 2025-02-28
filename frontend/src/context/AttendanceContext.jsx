import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    // Mark Attendance
    async function markAttendance(studentId, status = "Present") {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/attendance/mark", { studentId, status });
            toast.success(data.message);
            setAttendanceRecords((prev) => [...prev, data.attendance]);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to mark attendance.");
        } finally {
            setLoading(false);
        }
    }

    // Fetch Attendance for a Student
    async function fetchStudentAttendance(studentId) {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/attendance/student/${studentId}`);
            setAttendanceRecords(data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch attendance records.");
        } finally {
            setLoading(false);
        }
    }

    // Fetch All Attendance Records
    async function fetchAllAttendance() {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/attendance/getall");
            setAttendanceRecords(data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch all attendance records.");
        } finally {
            setLoading(false);
        }
    }

    // Fetch Attendance by Date
    async function fetchAttendanceByDate(date) {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/attendance/date/${date}`);
            setAttendanceRecords(data);
        } catch (error) {
            console.log(error.response?.data?.message || "Failed to fetch attendance for this date.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchAllAttendance()
    },[]);

    // Delete Attendance Record
    async function deleteAttendance(id) {
        setLoading(true);
        try {
            const { data } = await axios.delete(`/api/attendance/${id}`);
            toast.success(data.message);
            setAttendanceRecords((prev) => prev.filter((record) => record._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete attendance record.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AttendanceContext.Provider
            value={{
                markAttendance,
                fetchStudentAttendance,
                fetchAllAttendance,
                fetchAttendanceByDate,
                deleteAttendance,
                attendanceRecords,
                loading,
            }}
        >
            {children}
            <Toaster />
        </AttendanceContext.Provider>
    );
};

export const AttendanceData = () => useContext(AttendanceContext);
