import { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import toast, { Toaster } from "react-hot-toast";
import { AttendanceData } from "../context/AttendanceContext";
import { UserData } from "../context/UserContext";
import { Info, Loader2 } from "lucide-react";

const localizer = momentLocalizer(moment);

export default function Attendance() {
  const { markAttendance, attendanceRecords, fetchAttendanceByDate } = AttendanceData();
  const { user } = UserData();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllAttendance();
  }, []);

  useEffect(() => {
    if (attendanceRecords.length > 0) {
      const filteredEvents = attendanceRecords
        .filter((record) => record.student._id === user?._id) 
        .map((record) => ({
          title: record?.student?.name,
          start: new Date(record.date),
          end: new Date(record.date),
          allDay: true,
          student: record.student,
          status: record.status,
        }));
      
      setEvents(filteredEvents);
    }
  }, [attendanceRecords, user]);

  const fetchAllAttendance = useCallback(async () => {
    setLoading(true);
    await fetchAttendanceByDate();
    setLoading(false);
  }, [fetchAttendanceByDate]);

  const handleSelectSlot = async ({ start }) => {
    const today = moment().format("YYYY-MM-DD");
    const selectedDate = moment(start).format("YYYY-MM-DD");
  
    if (selectedDate !== today) {
      toast.error("You can only mark attendance for today!");
      return;
    }
  
    if (!user || !user._id) {
      toast.error("User not found! Please log in.");
      return;
    }
  
    const alreadyMarked = attendanceRecords.some(
      (record) =>
        record.student?._id === user?._id && moment(record.date).format("YYYY-MM-DD") === today
    );
  
    if (alreadyMarked) {
      toast.error("Attendance already marked for today!");
    } else {
      setLoading(true);
      await markAttendance(user._id, "Present");
      fetchAllAttendance(); 
    }
  };
  
  const handleSelectEvent = (event) => {
    toast.success(`${event.student.name} is marked as ${event.status}`, {
      duration: 4000,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-2 relative">
      <h1 className="text-3xl font-bold text-center mb-5">Welcome to the Library</h1>
      <div className="text-center text-lg mb-5 flex justify-center items-center">
        <p>Please mark your attendance</p>
        <button onClick={openModal} className="ml-2 text-blue-500">
          <Info size={20} />
        </button>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">How to Mark Attendance</h2>
            <p className="hidden md:block">
              On desktop, click on any date to mark your attendance.
              If you're unable to mark attendance or have any issues, please contact the admin.
            </p>
            <p className="block md:hidden">
              On mobile, tap on any date to mark your attendance.
              If you're unable to mark attendance or have any issues, please contact the admin.
            </p>
            <div className="modal-action">
              <button onClick={closeModal} className="btn btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white text-black p-4 rounded-lg shadow-lg">
        <div style={{ width: "100%", height: "500px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <Loader2 className="w-10 h-10 animate-spin"/>
        </div>
      )}

      <Toaster />
    </div>
  );
}
