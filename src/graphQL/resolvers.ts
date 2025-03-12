export const resolvers = {
  // Resolve the interface Animal
  Animal: {
    __resolveType(obj: any) {
      if (obj.breed) {
        return "Dog"; // if breed is present, return Dog
      }
      if (obj.color) {
        return "Cat"; // if color is present, return Cat
      }
      return null;
    },
  },

  Query: {
    getAnimals: () => {
      // Sample data
      return [
        {
          name: "Buddy",
          age: 4,
          breed: "Golden Retriever",
        },
        {
          name: "Whiskers",
          age: 3,
          color: "Black",
        },
      ];
    },
  },
};
