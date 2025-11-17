import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const ItemList = () => {
  const { user, token } = useAuthStore();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all"); // all, lost, found
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    const title = prompt("Enter new title:");
    const description = prompt("Enter new description:");
    const type = prompt("Enter type: lost or found");

    if (!title || !description || !type) return;

    try {
      await axios.put(
        `http://localhost:5000/api/items/${id}`,
        { title, description, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.type === filter);

  if (loading) return <p className="text-center mt-10">Loading items...</p>;
  if (filteredItems.length === 0) return <p className="text-center mt-10">No items found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Lost & Found Items</h2>

      {/* Filter Buttons */}
      <div className="flex justify-center mb-6 space-x-4">
        {["all", "lost", "found"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded ${
              filter === type
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded p-4 relative">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <span
              className={`inline-block px-3 py-1 rounded ${
                item.type === "lost" ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
              }`}
            >
              {item.type.toUpperCase()}
            </span>

            {user && user._id === item.user && (
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
