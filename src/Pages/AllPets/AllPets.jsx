import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import PetCard from '../../components/PetCard';

function AllPets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pets, setPets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishlistedPets, setWishlistedPets] = useState(new Set());

  const categories = [
    { id: 'all', name: 'All Pets' },
    { id: 'dog', name: 'Dogs' },
    { id: 'cat', name: 'Cats' },
    { id: 'bird', name: 'Birds' },
    { id: 'rabbit', name: 'Rabbits' },
    { id: 'fish', name: 'Fish' }
  ];

  useEffect(() => {
    fetch("/pets.json")
      .then(res => res.json())
      .then(data => setPets(data.pets || []));
  }, []);

  const toggleWishlist = (petId) => {
    const newWishlistedPets = new Set(wishlistedPets);
    newWishlistedPets.has(petId) ? newWishlistedPets.delete(petId) : newWishlistedPets.add(petId);
    setWishlistedPets(newWishlistedPets);
  };

  const filteredPets = pets.filter(pet => {
    const matchesSearchTerm = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              pet.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pet.type.toLowerCase() === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <motion.div 
      className="min-h-screen bg-base-200 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold text-dark mb-6">Find Your Perfect Pet</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pets by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} toggleWishlist={toggleWishlist} wishlistedPets={wishlistedPets} />
          ))}
        </motion.div>
        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No pets found matching your search criteria.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default AllPets;