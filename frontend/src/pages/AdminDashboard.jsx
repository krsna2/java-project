import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees from backend API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data.employees);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleLogout = () => {
    // Remove any auth tokens or session data if using
    alert("Logged out successfully!");
    window.location.href = "/";  // Redirect to login page
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-teal-700 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-sevillana p-4">Admin Panel</h2>
          <nav className="mt-6">
            <a href="#" className="block px-4 py-2 hover:bg-teal-600">Dashboard</a>
            <a href="#" className="block px-4 py-2 hover:bg-teal-600">Employees</a>
            <a href="#" className="block px-4 py-2 hover:bg-teal-600">Leave Requests</a>
          </nav>
        </div>
        <button onClick={handleLogout} className="m-4 py-2 bg-teal-500 rounded hover:bg-teal-600">
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, Admin!</h1>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Employee List</h2>
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
            + Add Employee
          </button>
        </div>

        {/* Employees Table */}
        {loading ? (
          <p>Loading employees...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Department</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No employees found.</td>
                  </tr>
                ) : (
                  employees.map((emp, index) => (
                    <tr key={emp._id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{emp.name}</td>
                      <td className="py-2 px-4 border">{emp.email}</td>
                      <td className="py-2 px-4 border">{emp.department}</td>
                      <td className="py-2 px-4 border">
                        <button className="text-teal-600 hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
