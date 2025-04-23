import { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistedPets, setWishlistedPets] = useState(new Set());

  const toggleWishlist = (petId) => {
    setWishlistedPets(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(petId)) {
        newWishlist.delete(petId);
      } else {
        newWishlist.add(petId);
      }
      return newWishlist;
    });
  };

  const isWishlisted = (petId) => wishlistedPets.has(petId);

  return (
    <WishlistContext.Provider value={{ wishlistedPets, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}