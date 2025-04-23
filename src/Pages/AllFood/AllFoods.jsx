import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function AllFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const itemsPerPage = 8;

  // Fetching data only once
  useEffect(() => {
    setLoading(true);
    fetch("/food.json")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data.foods); // REPLACE data instead of appending
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
        setLoading(false);
      });
  }, []); // Runs only once on mount

  // Filter foods based on search and category
  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType === "all" || food.type === selectedType)
  );

  // Reset pagination on search/category change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  // Pagination logic (ENSURE EXACT 8 ITEMS PER PAGE)
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFoods = filteredFoods.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold text-dark mb-8">Pet Food & Supplies</h1>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search food products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-2">
            {["all", "dog", "cat"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-md ${
                  selectedType === type ? "bg-primary text-white" : "bg-white text-gray-600"
                }`}
              >
                {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1) + " Food"}
              </button>
            ))}
          </div>
        </div>

        {/* Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedFoods.map((food) => (
            <div key={food.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{food.name}</h3>
                <p className="text-gray-600 mb-2">{food.brand}</p>
                <p className="text-primary font-semibold mb-4">${food.price}</p>
                <Link
                  to={`/foods/${food.id}`}
                  className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary/90"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-white text-gray-600 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === i + 1 ? "bg-primary text-white" : "bg-white text-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-white text-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllFoods;
