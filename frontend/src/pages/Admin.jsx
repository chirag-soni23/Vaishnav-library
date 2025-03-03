import React, { useState, useEffect } from 'react';
import { AttendanceData } from '../context/AttendanceContext';
import { UserData } from '../context/UserContext';

const Admin = () => {
  const { allUsers, deleteUser, editProfile } = UserData();
  const { attendanceRecords, deleteAttendance } = AttendanceData();

  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteAttendance = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this attendance record?");
    if (confirmDelete) {
      deleteAttendance(id);
    }
  };

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      deleteUser(userId);
    }
  };

  const handleRoleChange = (userId, newRole) => {
    // Only proceed if the role is different from the current role
    const userToUpdate = allUsers.find((user) => user._id === userId);
    if (userToUpdate && userToUpdate.role !== newRole) {
      // Update the user role using editProfile
      editProfile({ userId, role: newRole })
        .then(() => {
          // After updating, reflect the change in the local state
          const updatedUsers = allUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          );
          setAllUsers(updatedUsers);
        })
        .catch((error) => {
          console.error("Failed to update role:", error);
        });
    }
  };

  // Filtered users based on search query
  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered attendance records based on search query
  const filteredAttendance = attendanceRecords.filter(record =>
    record.student?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs mt-10"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap sm:space-x-4 border-b-2 mb-4">
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobileNumber}</td>
                    <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                    <td className="capitalize">{user.role}</td>
                    <td>
                      {/* Dropdown for role selection */}
                      <select
                        className="bg-gray-200 text-black px-3 py-1 rounded w-full sm:w-auto"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      >
                        <option value="user">{user.role}</option>
                        <option value="user">user</option>
                        <option value="member">member</option>
                      </select>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
                        onClick={() => handleDeleteUser(user._id)} // Call handleDeleteUser
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Users Found
                  </td>
                </tr>
              )}
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record, index) => (
                  <tr key={record._id}>
                    <th>{index + 1}</th>
                    <td>{record.student.name}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.status}</td>
                    <td>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDeleteAttendance(record._id)} // Call handleDeleteAttendance
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Attendance Records Found
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
