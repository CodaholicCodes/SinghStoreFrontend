import React, { useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "./common/ErrorMessages";
import { login } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const dispatch=useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json().then(data=>{
        dispatch(login(data));
          navigate('/');
        });

            }
      if (res.status === 422) {
        return res.json().then((data) => {
          setErrors(data.errorMessages || ["Validation failed"]);
          return null;
        });
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      setErrors(["Network error. Please try again later."]);
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-6">
          Welcome to Singh Store
        </h2>

        <ErrorMessages errors={errors} />

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
