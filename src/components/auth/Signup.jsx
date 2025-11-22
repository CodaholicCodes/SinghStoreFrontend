import React, { useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "./common/ErrorMessages";
const Signup = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const userTypeRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FirstName: firstNameRef.current.value,
          LastName: lastNameRef.current.value,
          password: passwordRef.current.value,
          email: emailRef.current.value,
          userType: userTypeRef.current.value,
        }),
      });

      if (res.status === 201) {
        navigate("/login");
        return;
      }
      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errorMessages || ["Validation failed"]);
        return;
      }
      const data = await res.json().catch(() => ({}));
      setErrors([data.message || "Unexpected server error"]);
    } catch (err) {
      console.error("Signup error:", err);
      setErrors(["Network error. Please try again later."]);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-6">
          Create Your Account
        </h2>

     <ErrorMessages errors={errors}/>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="firstName" className="block text-blue-800 font-semibold mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              ref={firstNameRef}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-blue-800 font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              ref={lastNameRef}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-blue-800 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              ref={emailRef}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-blue-800 font-semibold mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              ref={passwordRef}
              className="w-full p-3 pr-12 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div>
            <label htmlFor="userType" className="block text-blue-800 font-semibold mb-1">
              User Type
            </label>
            <select
              id="userType"
              ref={userTypeRef}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Sign Up
          </button>

          <p className="text-center text-blue-600 text-sm mt-3">
            Already have an account?{" "}
            <a href="/login" className="font-semibold hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
