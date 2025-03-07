import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { Cross } from "lucide-react";
import toast from "react-hot-toast";

const Member = () => {
  const { allUsers, deleteProfilePicture, user } = UserData();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter members based on search query
  const members = allUsers?.filter(
    (user) =>
      user.role === "member" &&
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMembers = members?.sort((a, b) => {
    if (a._id === user._id) return -1;
    if (b._id === user._id) return 1;
    return 0;
  });

  const handleAvatarClick = (member) => {
    if (!member.profilePicture?.url) {
      toast.error("No profile photo available");
      return;
    }
    setSelectedUser(member);
  };

  const handleDeleteClick = async (userId) => {
    if (window.confirm("Are you sure you want to delete this profile picture?")) {
      setIsDeleting(true);
      try {
        await deleteProfilePicture(userId);
      } catch (error) {
        toast.error("Failed to delete profile picture.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="overflow-x-auto mt-16 px-4 sm:px-8">
      {/* Search Input */}
      <div className="mb-4 mt-10 flex justify-start">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-xs sm:max-w-md md:max-w-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {sortedMembers?.length > 0 ? (
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Role</th>
              <th className={`${user.role === "admin" ? "" : "hidden"}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedMembers?.map((member, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div
                        className="mask mask-squircle h-12 w-12 cursor-pointer"
                        onClick={() => handleAvatarClick(member)}
                      >
                        <img
                          src={member?.profilePicture?.url || "./avatar.png"}
                          alt={member.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{member.name}</div>
                    </div>
                  </div>
                </td>
                <td>{member.email}</td>
                <td>{new Date(member.dateOfBirth).toLocaleDateString()}</td>
                <td>
                  <span className="badge badge-ghost badge-sm">{member.role}</span>
                </td>
                <td className={`${user.role === "admin" ? "" : "hidden"}`}>
                  {member.profilePicture?.url && (
                    <button
                      className={`btn btn-xs sm:btn-sm lg:btn-md mt-2 whitespace-nowrap ${isDeleting ? "btn-disabled" : "btn-danger"
                        }`}
                      onClick={() => handleDeleteClick(member._id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete Profile Picture"}
                    </button>
                  )}
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedUser(null)}
        >
          <div className="p-4 rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg relative">
            <button
              className="absolute top-2 right-2 rounded-full w-8 h-8 p-1 bg-slate-700 flex justify-center items-center"
              onClick={() => setSelectedUser(null)}
            >
              <Cross className="w-5 h-5 text-white rotate-45" />
            </button>
            <img
              src={selectedUser?.profilePicture?.url || "./avatar.png"}
              alt={selectedUser?.name}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white text-center mt-2 font-bold">{selectedUser?.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;
