import { useState, useEffect } from "react";
import { Calendar, Loader2, Mail, Pencil, Phone, User, Camera, LoaderCircle, X } from "lucide-react";
import { UserData } from "../context/UserContext";

const Profile = () => {
  const { user, btnLoading, editProfile, updateProfilePicture } = UserData();
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    dateOfBirth: user?.dateOfBirth?.split("T")[0] || "",
    state: user?.state || "", 
    district: user?.district || "", 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      mobileNumber: user?.mobileNumber || "",
      dateOfBirth: user?.dateOfBirth?.split("T")[0] || "",
      state: user?.state || "",
      district: user?.district || "",
    });
  }, [user]);

  const handleFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    await editProfile({
      userId: user?._id,
      name: formData.name,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      dateOfBirth: formData.dateOfBirth,
      state: formData.state,
      district: formData.district, 
    });
    setEditField(null);
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await updateProfilePicture(file);
    }
  };

  return (
    <div className="h-full pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          {/* Profile Picture */}
          <div className="text-center">
            <div className={`relative ${user.role == "user" ? "hidden" : ""} w-32 h-32 mx-auto`}>
              <img
                src={user?.profilePicture?.url || "/default-profile.png"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
              <label className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full cursor-pointer">
                {btnLoading ? <LoaderCircle className="w-5 h-5 text-white animate-spin" /> :
                  <Camera className="w-5 h-5 text-white" />}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={btnLoading}
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
            <h1 className={`text-2xl font-semibold mt-3 ${user.role == "user" ? "hidden" : ""}`}>{user?.name}</h1>
            <p className="mt-1">Your profile information</p>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="relative p-4 rounded-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <button
                  className="absolute top-2 right-2 bg-slate-700 w-8 h-8 rounded-full flex justify-center items-center"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <img
                  src={user?.profilePicture?.url || "/default-profile.png"}
                  alt="Profile"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Profile Fields */}
          <div className="space-y-6">
            <ProfileField
              label="Full Name"
              icon={<User className="w-4 h-4" />}
              value={formData.name}
              name="name"
              editField={editField}
              setEditField={setEditField}
              handleFieldChange={handleFieldChange}
              saveChanges={saveChanges}
              btnLoading={btnLoading}
            />

            <ProfileField
              label="Email Address"
              icon={<Mail className="w-4 h-4" />}
              value={formData.email}
              name="email"
              editField={editField}
              setEditField={setEditField}
              handleFieldChange={handleFieldChange}
              saveChanges={saveChanges}
              btnLoading={btnLoading}
              disableEdit={true} 
            />

            <ProfileField
              label="Mobile Number"
              icon={<Phone className="w-4 h-4" />}
              value={formData.mobileNumber}
              name="mobileNumber"
              editField={editField}
              setEditField={setEditField}
              handleFieldChange={handleFieldChange}
              saveChanges={saveChanges}
              btnLoading={btnLoading}
            />

            <ProfileField
              label="Date of Birth"
              icon={<Calendar className="w-4 h-4" />}
              value={formData.dateOfBirth}
              name="dateOfBirth"
              type="date"
              editField={editField}
              setEditField={setEditField}
              handleFieldChange={handleFieldChange}
              saveChanges={saveChanges}
              btnLoading={btnLoading}
            />

            <ProfileField
              label="State"
              icon={<User className="w-4 h-4" />}
              value={formData.state}
              name="state"
              editField={editField}
              setEditField={setEditField}
              handleFieldChange={handleFieldChange}
              saveChanges={saveChanges}
              btnLoading={btnLoading}
            />

            <ProfileField
              label="District"
              icon={<User className="w-4 h-4" />}
              value={formData.district}
              name="district"
              editField={editField}
              setEditField={setEditField}
              handleFieldChange={handleFieldChange}
              saveChanges={saveChanges}
              btnLoading={btnLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({
  label,
  icon,
  value,
  name,
  type = "text",
  editField,
  setEditField,
  handleFieldChange,
  saveChanges,
  btnLoading,
  disableEdit = false, 
}) => {
  return (
    <div className="space-y-1.5">
      <div className="text-sm flex items-center gap-2">
        {icon}
        {label}
      </div>
      {editField === name ? (
        <div className="flex flex-wrap items-center gap-2">
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleFieldChange}
            className="px-4 py-2 bg-base-200 rounded-lg border flex-grow"
          />
          <button
            disabled={btnLoading}
            onClick={saveChanges}
            className="btn btn-success flex-shrink-0"
          >
            {btnLoading ? <Loader2 className="animate-spin" /> : "Save"}
          </button>
          <button
            onClick={() => setEditField(null)}
            className="btn btn-warning flex-shrink-0"
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="flex items-center justify-between px-4 py-2.5 bg-base-200 rounded-lg border">
          {value || "N/A"}
          {!disableEdit && (
            <Pencil
              className="w-4 h-4 cursor-pointer"
              onClick={() => setEditField(name)}
            />
          )}
        </p>
      )}
    </div>
  );
};

export default Profile;
