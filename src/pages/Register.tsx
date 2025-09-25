import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";
import { set } from "date-fns";





// Icons (retained from original code)
const UserPlusIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M10.5 6a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM20.25 14.25a.75.75 0 00-1.5 0v2.25h-2.25a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5h-2.25V14.25z" />
    <path
      fillRule="evenodd"
      d="M1.5 18.375a7.5 7.5 0 0115 0c.34.463.69.906 1.056 1.328a.75.75 0 001.088-.994A11.22 11.22 0 0018.75 12a11.247 11.247 0 00-3.14-7.797.75.75 0 00-1.12.994c.304.425.59.868.841 1.339A8.962 8.962 0 006 18.375zM12 15a6 6 0 100-12 6 6 0 000 12z"
      clipRule="evenodd"
    />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const EyeSlashIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228"
    />
  </svg>
);

// The main App component
const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // State to hold the list of hostels
  const [hostel, setHostel] = useState([]);
  // State for the password mismatch error message
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const mensHostels = ["MH1", "MH2", "MH3", "MH4"];
  const ladisHostels = ["LH1", "LH2", "LH3", "LH4"];

  // Function to update the hostel list based on the form's state
  const updateHostelList = (form) => {
    const stayValue = form.elements["stay"].value;
    const genderValue = form.elements["gender"].value;

    if (stayValue === "hostel") {
      if (genderValue === "male") {
        setHostel(mensHostels);
      } else {
        setHostel(ladisHostels);
      }
    } else {
      setHostel([]);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = event.currentTarget;
    const data = Object.fromEntries(new FormData(formData));
    console.log(data);
    if (data["password"] !== data["confirmPassword"]) {
      setErrorMessage("Passwords don't match! Please try again.");
      return;
    }
    setErrorMessage(""); // Clear error if passwords match
    // Proceed with form submission logic (e.g., API call)
    // For now, let's just log success.
    console.log("Form submitted successfully!", data);
    navigate("/");
  }

  return (
    // Main container with the background color scheme
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-50 via-green-50 to-teal-100 p-4 font-sans">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-green-500 p-3 rounded-full">
              <UserPlusIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Create an Account
          </h1>
          <p className="text-gray-500 mt-2">Join us! It's quick and easy.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display error message if it exists */}
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
              role="alert"
            >
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              name="name"
              required
              type="text"
              id="fullname"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              name="email"
              required
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Year of study
            </label>
            <select
              name="year"
              required
              id="year"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300"
              defaultValue="none"
            >
              <option disabled value="none" className="opacity-50">
                --Select year--
              </option>
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="male"
                defaultChecked // default to male
                onChange={(e) => updateHostelList(e.target.form)}
                className="accent-green-500"
              />
              <label htmlFor="gender-male">Male</label>

              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="female"
                onChange={(e) => updateHostelList(e.target.form)}
                className="accent-green-500"
              />
              <label htmlFor="gender-female">Female</label>
            </div>
          </div>

          <div>
            <label
              htmlFor="stay"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Staying in
            </label>
            <select
              onChange={(e) => updateHostelList(e.target.form)}
              name="stay"
              required
              id="stay"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300 mb-2"
              defaultValue="none"
            >
              <option disabled value="none" className="opacity-50">
                --Select--
              </option>
              <option value="hostel">Hostel</option>
              <option value="dayscholar">Dayscholar</option>
              <option value="pg-hostel">PG Hostel</option>
            </select>

            {hostel.length !== 0 && (
              <select
                name="hostelName"
                required
                id="hostel-name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300"
                defaultValue="none"
              >
                <option disabled value="none" className="opacity-50">
                  --Select--
                </option>
                {hostel.map((hostelName) => (
                  <option key={hostelName} value={hostelName}>
                    {hostelName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              name="password"
              required
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300"
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-6 flex items-center px-4 text-gray-500 hover:text-cyan-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="relative">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              required
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300"
              placeholder="Repeat your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 top-6 flex items-center px-4 text-gray-500 hover:text-cyan-600"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login">
            <span className="font-medium text-cyan-600 hover:text-cyan-500 hover:underline">
              Log In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

// Add this to your tailwind.config.js for the animation
/*
module.exports = {
  // ...
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': {
              opacity: '0',
              transform: 'translateY(20px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0)'
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
    },
  },
  // ...
}
*/

// The main App component to wrap the registration form with BrowserRouter


export default RegistrationForm;
