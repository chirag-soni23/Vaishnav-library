import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import toast, { Toaster } from "react-hot-toast";
import { AttendanceData } from "../context/AttendanceContext";
import { UserData } from "../context/UserContext"; // Import user context

const localizer = momentLocalizer(moment);

export default function Attendance() {
  const { markAttendance, attendanceRecords, fetchAttendanceByDate } = AttendanceData();
  const { user } = UserData(); // Get logged-in user
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setSelectedDate(new Date());
    fetchTodayAttendance();
  }, []);

  const fetchTodayAttendance = async () => {
    const today = moment().format("YYYY-MM-DD");
    await fetchAttendanceByDate(today);
  };

  useEffect(() => {
    const formattedEvents = attendanceRecords.map((record) => ({
      title: `${record.student.name} - ${record.status}`,
      start: new Date(record.date),
      end: new Date(record.date),
      allDay: true,
    }));
    setEvents(formattedEvents);
  }, [attendanceRecords]);

  const handleSelectSlot = async ({ start }) => {
    const today = moment().format("YYYY-MM-DD");
    const selected = moment(start).format("YYYY-MM-DD");

    if (!user || !user._id) {
      toast.error("User not found! Please log in.");
      return;
    }

    if (selected === today) {
      await markAttendance(user._id); 
      toast.success("Attendance marked successfully!");
      fetchTodayAttendance();
    } else {
      toast.error("You can only mark attendance for today!");
    }
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
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
      <Toaster />
    </div>
  );
}
