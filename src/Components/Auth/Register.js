import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  // const [image, setImage] = useState("");
  // const [file, setFile] = useState("");

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  console.log(password, email);
  // function handleImageChange(e) {
  //   setFile(URL.createObjectURL(e.target.files[0]));
  //   if (e.target.files && e.target.files.length > 0) {
  //     setImage(e.target.files[0]);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Email: email,
      Password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/signup",
        data
      );

      if (response.data.status === "Success") {
        navigate("/login");
        toast.success("Successfully Sign Up");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      <h3>Register</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-input border"
            type="email"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-input border"
            type="password"
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="password">Image</label>
          <input
            className="form-input border"
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div> */}
        <button
          type="submit"
          className="border-0 p-2 text-white"
          style={{
            width: "100px",
            fontSize: "20px",
            fontWeight: "600",
            backgroundColor: "#FFA114",
            color: "white",
          }}
        >
          Sign Up
        </button>
        <p className="mt-2">
          <span>Alreay have an account?</span>
          <span>
            <Link to="/login" className="text-primary" target="_blank">
              Sign In
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
