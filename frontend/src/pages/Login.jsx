import axios from 'axios'
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      console.log("Response:", response.data);

      if (response.data.success) {
        alert("Successfully logged in!");
      } else {
        setError(response.data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error caught:", error);
      if (error.response) {
        setError(error.response.data.error || "Invalid credentials.");
      } else if (error.request) {
        setError("No response from server. Is it running?");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
      <h2 className="font-sevillana text-3xl text-white">
        Employee Management System
      </h2>

      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border"
              placeholder="*****"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">Forgot password?</a>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-teal-400' : 'bg-teal-600'} text-white py-2`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
