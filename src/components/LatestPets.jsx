import React, { useEffect, useState } from "react";
import PetCard from "./PetCard";
import { FiHeart } from 'react-icons/fi';

const LatestPets = () => {
  const [latestPets, setLatestPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistedPets, setWishlistedPets] = useState(new Set());

  useEffect(() => {
    fetch("/pets.json")
      .then((response) => response.json())
      .then((data) => {
        setLatestPets(data.pets?.slice(-8)); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
        setLoading(false);
      });
  }, []);

  const toggleWishlist = (petId) => {
    const newWishlistedPets = new Set(wishlistedPets);
    if (newWishlistedPets.has(petId)) {
      newWishlistedPets.delete(petId);
    } else {
      newWishlistedPets.add(petId);
    }
    setWishlistedPets(newWishlistedPets);
  };

  return (
    <div className="bg-base-200 py-12">
      <section className="container max-w-[1400px] mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Latest Added Pets</h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {latestPets.map((pet) => (
                <PetCard 
                  key={pet.id} 
                  pet={pet} 
                  toggleWishlist={toggleWishlist} 
                  wishlistedPets={wishlistedPets}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LatestPets;

