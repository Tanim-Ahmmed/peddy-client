import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { useWishlist } from '../../provider/WishlistContext';

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    setLoading(true);
    fetch('/pets.json')
      .then(response => response.json())
      .then(data => {
        const foundPet = data.pets?.find(p => p.id === Number(id));
        if (!foundPet) {
          setError('Pet not found');
        }
        setPet(foundPet || null);
      })
      .catch(error => {
        console.error('Error fetching pet details:', error);
        setError('Failed to load pet details. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-xl text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 mt-24 text-center flex justify-center">
      <div className="container">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pet Image */}
            <div className="relative h-[400px]">
              <img 
                src={pet?.image} 
                alt={pet?.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => toggleWishlist(pet.id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
              >
                <FiHeart 
                  className={`w-6 h-6 ${isWishlisted(pet.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                />
              </button>
            </div>

            {/* Pet Details */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-dark">{pet?.name}</h1>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <FiShare2 className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">{pet?.type}</span>
                <span className="px-3 py-1 bg-base-200 text-gray-600 rounded-full">{pet?.breed}</span>
                <span className="px-3 py-1 bg-base-200 text-gray-600 rounded-full">{pet?.age}</span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{pet?.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <InfoBox label="Gender" value={pet?.gender} />
                  <InfoBox label="Weight" value={pet?.weight} />
                  <InfoBox label="Color" value={pet?.color} />
                  <InfoBox label="Location" value={pet?.location} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/payment')}
                  className="flex-1 bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 font-semibold"
                >
                  Adopt Now
                </button>
                <button 
                  onClick={() => toggleWishlist(pet.id)}
                  className={`flex-1 py-3 px-6 rounded-md font-semibold border ${
                    isWishlisted(pet.id)
                      ? 'bg-red-50 text-red-500 border-red-500' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {isWishlisted(pet.id) ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Component for Info Boxes
const InfoBox = ({ label, value }) => (
  <div className="p-4 bg-base-200 rounded-lg">
    <span className="block text-sm text-gray-600">{label}</span>
    <span className="font-semibold">{value || 'N/A'}</span>
  </div>
);

export default PetDetails;
