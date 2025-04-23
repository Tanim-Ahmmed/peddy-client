import { motion } from "framer-motion";

function PetCategories() {
  const categories = [
    { id: 1, name: "Dogs", icon: "🐕", count: 28 },
    { id: 2, name: "Cats", icon: "🐱", count: 23 },
    { id: 3, name: "Birds", icon: "🦜", count: 15 },
    { id: 4, name: "Fish", icon: "🐠", count: 12 },
    { id: 5, name: "Small Pets", icon: "🐹", count: 18 },
    { id: 6, name: "Reptiles", icon: "🦎", count: 9 },
  ];

  return (
    <section className="section bg-base-200 py-12">
      <div className="container max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Find Your Perfect Pet
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mx-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-lg p-6 text-center cursor-pointer shadow-md"
            >
              <span className="text-4xl mb-4 block">{category.icon}</span>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.count} Pets</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PetCategories;
