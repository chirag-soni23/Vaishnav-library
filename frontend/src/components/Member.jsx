import React, { useState } from 'react';
import { UserData } from '../context/UserContext';

const Member = () => {
  const { allUsers } = UserData();
  const [selectedUser, setSelectedUser] = useState(null);

  const members = allUsers?.filter(user => user.role === "member");

  return (
    <div className="overflow-x-auto mt-16">
      {members?.length > 0 ? (
        <table className="table">
          {/* Table Head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Date of Birth</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 cursor-pointer" onClick={() => setSelectedUser(member)}>
                        <img src={member.profilePicture.url} alt={member.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{member.name}</div>
                    </div>
                  </div>
                </td>
                <td>{member.email}</td>
                <td>{member.mobileNumber}</td>
                <td>{new Date(member.dateOfBirth).toLocaleDateString()}</td>
                <td>
                  <span className="badge badge-ghost badge-sm">{member.role}</span>
                </td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-4">No members found</p>
      )}

      {/* Profile Picture Popup */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setSelectedUser(null)}>
          <div className=" p-4 rounded-lg shadow-lg max-w-sm">
            <img src={selectedUser.profilePicture.url} alt={selectedUser.name} className="w-full h-auto rounded-lg" />
            <p className="text-white text-center mt-2 font-bold">{selectedUser.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;