import { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        setItems(res.data);
      } catch (error) {
        console.log("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading items...</p>;

  if (items.length === 0) return <p className="text-center mt-10">No items found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Lost & Found Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <span
              className={`inline-block px-3 py-1 rounded ${
                item.type === "lost" ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
              }`}
            >
              {item.type.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
