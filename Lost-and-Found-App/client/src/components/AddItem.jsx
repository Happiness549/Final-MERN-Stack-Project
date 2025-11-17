import { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const AddItem = () => {
  const { token } = useAuthStore(); // get JWT
  const [formData, setFormData] = useState({ title: "", description: "", type: "lost" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/items",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` } // send JWT
        }
      );
      setMessage(res.data.message);
      setFormData({ title: "", description: "", type: "lost" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Lost/Found Item</h2>
        {message && <p className="mb-4 text-center text-green-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
