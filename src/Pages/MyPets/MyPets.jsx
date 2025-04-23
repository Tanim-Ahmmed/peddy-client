import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

function MyPets() {
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

  const handleDelete = (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      // Here you would typically make an API call to delete the pet
      console.log('Deleting pet:', petId);
      setPets(pets.filter(pet => pet.id !== petId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center  bg-base-200 my-20">
      <div className="container">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-dark">My Posted Pets</h1>
              <Link
                to="/add-pets"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Add New Pet
              </Link>
            </div>

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
                  {pets.map((pet) => (
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
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/pets/${pet.id}`}
                            className="text-primary hover:text-primary/80"
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </Link>
                          <Link
                            to={`/edit-pet/${pet.id}`}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit Pet"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(pet.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete Pet"
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

            {pets.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't posted any pets yet.</p>
                <Link
                  to="/add-pet"
                  className="text-primary hover:text-primary/80 font-medium mt-2 inline-block"
                >
                  Add your first pet
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPets;