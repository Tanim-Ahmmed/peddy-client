import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiEye } from 'react-icons/fi';
import { useWishlist } from '../../provider/WishlistContext';
import Button from '../Shared/Button';

function WishList() {
  const { wishlistedPets, toggleWishlist } = useWishlist();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/pets.json')
      .then(response => response.json())
      .then(data => {
        setPets(data.pets);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
        setLoading(false);
      });
  }, []);

  const wishlistedPetsList = pets.filter(pet => wishlistedPets.has(pet.id));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (wishlistedPetsList.length === 0) {
    return (
        <div className="min-h-screen bg-base-200 py-12 flex flex-col items-center justify-center text-center">
        <div className="container">
          <p className="text-gray-600 mb-8 text-xl">You haven't added any pets to your wishlist yet.</p>
          <Link to="/all-pets" className='w-full flex justify-center'>
            <Button name="Explore Pets" />
          </Link>
        </div>
      </div>      
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-base-200 mt-28">
      <div className="container">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-dark mb-6">My Wishlist</h1>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {wishlistedPetsList.map((pet) => (
                    <tr key={pet.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={pet.image}
                              alt={pet.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{pet.name}</div>
                            <div className="text-sm text-gray-500">{pet.breed}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{pet.type}</div>
                        <div className="text-sm text-gray-500">{pet.age}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{pet.location}</div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link
                            to={`/pets/${pet.id}`}
                            className="text-primary hover:text-primary/80"
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </Link>
                          <button
                            onClick={() => toggleWishlist(pet.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Remove from Wishlist"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;