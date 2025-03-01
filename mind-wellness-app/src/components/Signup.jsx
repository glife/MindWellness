import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = isLogin
      ? "http://localhost:8081/user/login"
      : "http://localhost:8081/user/signup";

    const updatedFormData = { ...formData, contactNo: formData.phone };
    delete updatedFormData.phone;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedFormData),
      });

      // Read response as text first
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText };
      }

      console.log("Server Response:", data);

      if (response.ok) {
        alert(data.message || (isLogin ? "Login Successful! 🚀" : "Successfully Registered! 🎉"));
      } else {
        alert(data.message || "Something went wrong.");
        console.warn("Error:", data.message);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat px-6">
      <div className="w-full max-w-lg shadow-lg rounded-3xl p-8 space-y-6 transform hover:scale-105 transition-transform duration-300 bg-black backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          {isLogin ? "Welcome Back! 👋" : "Join Us Today ✨"}
        </h1>

        <form className="space-y-4">
          {!isLogin && (
            <>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="form-input" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="form-input" />
              <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="form-input" />
              <select name="gender" value={formData.gender} onChange={handleChange} className="form-input">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
                <option value="Other">Other</option>
              </select>
            </>
          )}

          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="form-input" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="form-input" />

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition duration-300 shadow-md"
          >
            {isLogin ? "Login 🚀" : "Sign Up 🎉"}
          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="text-sm text-white text-center cursor-pointer hover:underline mt-3">
          {isLogin ? "New here? Sign up!" : "Already a user? Log in!"}
        </p>
      </div>
    </div>
  );
};

export default Signup;
