import { Attendance } from "../models/attendanceModel.js";
import { User } from "../models/userModel.js";
import tryCatch from "../utils/tryCatch.js";

// Mark Attendance
export const markAttendance = tryCatch(async (req, res) => {
    const { studentId, status } = req.body;
    const date = new Date().toISOString().split("T")[0]; 

    const student = await User.findById(studentId);
    if (!student) {
        return res.status(404).json({ message: "Student not found!" });
    }

    let attendance = await Attendance.findOne({ student: studentId, date });

    if (attendance) {
        attendance.status = status || "Present";
        await attendance.save();
        return res.status(200).json({ message: "Attendance updated successfully!", attendance });
    }

    attendance = await Attendance.create({ student: studentId, date, status: status || "Present" });
    res.status(201).json({ message: "Attendance marked successfully!", attendance });
});

// Get Attendance by Student ID
export const getStudentAttendance = tryCatch(async (req, res) => {
    const { studentId } = req.params;

    const attendance = await Attendance.find({ student: studentId }).sort({ date: -1 });

    if (!attendance.length) {
        return res.status(404).json({ message: "No attendance records found!" });
    }

    res.status(200).json(attendance);
});

// Get All Attendance Records
export const getAllAttendance = tryCatch(async (req, res) => {
    const attendance = await Attendance.find().populate("student", "name email dateOfBirth").sort({ date: -1 });

    if (!attendance.length) {
        return res.status(404).json({ message: "No attendance records found!" });
    }

    res.status(200).json(attendance);
});


// Get Attendance for a Specific Date
export const getAttendanceByDate = tryCatch(async (req, res) => {
    const { date } = req.params;
    const attendance = await Attendance.find({ date }).populate("student", "name email");

    if (!attendance.length) {
        return res.status(404).json({ message: "No attendance records found for this date!" });
    }

    res.status(200).json(attendance);
});

// Delete Attendance Record
export const deleteAttendance = tryCatch(async (req, res) => {
    const { id } = req.params;
    const attendance = await Attendance.findById(id);

    if (!attendance) {
        return res.status(404).json({ message: "Attendance record not found!" });
    }

    await attendance.deleteOne();
    res.status(200).json({ message: "Attendance record deleted successfully!" });
});
