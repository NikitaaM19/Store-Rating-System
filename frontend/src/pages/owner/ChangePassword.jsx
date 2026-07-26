import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function ChangePassword() {

  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      await API.put("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      alert("Password Changed Successfully ✅");

      // logout after change
      localStorage.clear();
      navigate("/login");

    } catch (err) {
      alert("Failed to change password ❌");
    }
  };

  return (
    <div className="container mt-5">

      <h2>Change Password</h2>

      <form onSubmit={handleChangePassword}>

        <div className="mb-3">
          <label>Old Password</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary">
          Update Password
        </button>

      </form>

    </div>
  );
}

export default ChangePassword;