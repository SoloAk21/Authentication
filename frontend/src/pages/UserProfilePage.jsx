import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";

function UserProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        setProfileData(response.data.data);
        setLoading(false);
      } catch (error) {
        setAlertMessage("Failed to load profile");
        setSuccess(false);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout"); // Call the logout API
      logout();
      navigate("/login"); // Redirect to login page after successful logout
    } catch (error) {
      setAlertMessage("Logout failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-blue-50 to-purple-50 ">
      {/* Alert Message */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          success={success}
          onDismiss={() => setAlertMessage("")}
          autoDismiss={true}
          dismissTime={3000}
        />
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              User Profile
            </h2>
            <p className="text-gray-600">Manage your profile details</p>
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700">
                <strong className="text-blue-600">Username:</strong>{" "}
                <span className="text-gray-800">{profileData.username}</span>
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700">
                <strong className="text-blue-600">Email:</strong>{" "}
                <span className="text-gray-800">{profileData.email}</span>
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700">
                <strong className="text-blue-600">Verified:</strong>{" "}
                <span
                  className={`font-semibold ${
                    profileData.isVerified ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {profileData.isVerified ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-10 text-center">
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </button>
          </div>

          {/* Logout Button */}
          <div className="mt-6 text-center">
            <button
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;
