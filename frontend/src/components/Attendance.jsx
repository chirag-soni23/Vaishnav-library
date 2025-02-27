import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import toast, { Toaster } from "react-hot-toast";
import { AttendanceData } from "../context/AttendanceContext";
import { UserData } from "../context/UserContext";

const localizer = momentLocalizer(moment);

export default function Attendance() {
  const { markAttendance, attendanceRecords, fetchAttendanceByDate } = AttendanceData();
  const { user } = UserData();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  useEffect(() => {
    const formattedEvents = attendanceRecords.map((record) => ({
      title: record.student.name,  // 👈 Student name as title
      start: new Date(record.date),
      end: new Date(record.date),
      allDay: true,
      student: record.student,  // 👈 Storing student data
      status: record.status,  // 👈 Storing attendance status
    }));
    setEvents(formattedEvents);
  }, [attendanceRecords]);

  const fetchTodayAttendance = async () => {
    const today = moment().format("YYYY-MM-DD");
    await fetchAttendanceByDate(today);
  };

  const handleSelectSlot = async ({ start }) => {
    const today = moment().format("YYYY-MM-DD");
    const selected = moment(start).format("YYYY-MM-DD");

    if (!user || !user._id) {
      toast.error("User not found! Please log in.");
      return;
    }

    const alreadyMarked = attendanceRecords.some(
      (record) => record.student._id === user._id && moment(record.date).format("YYYY-MM-DD") === today
    );

    if (selected === today) {
      if (alreadyMarked) {
        toast.error("Attendance already marked!");
      } else {
        await markAttendance(user._id);
        toast.success("Attendance marked successfully!");
        fetchTodayAttendance();
      }
    } else {
      toast.error("You can only mark attendance for today!");
    }
  };

  const handleSelectEvent = (event) => {
    toast.success(`${event.student.name} is marked as ${event.status}`, {
      duration: 4000,
    });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Welcome to the Library</h1>
      <p className="text-center text-lg mb-5">Please mark your attendance</p>

      <div className="bg-white text-black p-5 rounded-lg shadow-lg">
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}  // 👈 Click event added
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>

      <Toaster />
    </div>
  );
}
