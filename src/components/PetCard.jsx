import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function PetCard({ pet, toggleWishlist, wishlistedPets }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
        <button
          onClick={() => toggleWishlist(pet.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white"
        >
          <FiHeart 
            className={`w-5 h-5 ${wishlistedPets.has(pet.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{pet.name}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span>{pet.breed}</span>
          <span>•</span>
          <span>{pet.age}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pet.description}</p>
        <Link to={`/pets/${pet.id}`} className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary/90">
          View More
        </Link>
      </div>
    </motion.div>
  );
}

export default PetCard;
