import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

function FoodDetails() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('/food.json')
      .then(response => response.json())
      .then(data => {
        const foundFood = data.foods.find(f => f.id === parseInt(id));
        setFood(foundFood);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching food details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-base-200 py-24 justify-center ">
      <div className="container">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8">
              <img 
                src={food.image} 
                alt={food.name}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
            
            <div className="p-8">
              <h1 className="text-3xl font-bold text-dark mb-4">{food.name}</h1>
              <p className="text-gray-600 mb-4">{food.brand}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-primary">${food.price}</span>
                <span className="text-gray-600">{food.weight}</span>
              </div>
              
              <p className="text-gray-600 mb-6">{food.description}</p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {food.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <label className="text-gray-600">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <Link
              to={`/payment`}
                
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 flex items-center justify-center gap-2"
              >
                <FiShoppingCart />
                <span >Order Now</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;