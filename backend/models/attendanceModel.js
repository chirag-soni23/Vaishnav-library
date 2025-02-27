import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        date: { type: Date, required: true },
        status: { type: String, enum: ["Present", "Absent"], default: "Present" },
    },
    { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
