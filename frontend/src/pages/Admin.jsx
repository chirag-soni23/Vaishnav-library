import React, { useState } from 'react';
import { UserData } from '../context/UserContext';
import { AttendanceData } from '../context/AttendanceContext';

const Admin = () => {
  const { allUsers } = UserData();
  const { attendanceRecords, deleteAttendance } = AttendanceData();
  const [activeTab, setActiveTab] = useState('users'); 

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this attendance record?");
    if (confirmDelete) {
      deleteAttendance(id);
    }
  };

  return (
    <div className="container mx-auto mt-16">
      {/* Tabs */}
      <div className="flex space-x-4 border-b-2">
        <button
          className={`py-2 px-4 ${activeTab === 'users' ? 'border-b-4 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'attendance' ? 'border-b-4 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          Attendance
        </button>
      </div>

      {/* Users Table */}
      {activeTab === 'users' && (
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Date of Birth</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                  <td className="capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Attendance Table */}
      {activeTab === 'attendance' && (
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th> {/* New Column for Delete Button */}
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length > 0 ? (
                attendanceRecords.map((record, index) => (
                  <tr key={record._id}>
                    <th>{index + 1}</th>
                    <td>{record.student.name}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.status}</td>
                    <td>
                      <button 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDelete(record._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Attendance Records
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
