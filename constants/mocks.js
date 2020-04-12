const categories = [
  {
    id: "plants",
    name: "Plants",
    tags: ["products", "inspirations"],
    count: 147,
    image: require("../assets/icons/plants.png")
  },
  {
    id: "seeds",
    name: "Seeds",
    tags: ["products", "shop"],
    count: 16,
    image: require("../assets/icons/seeds.png")
  },
  {
    id: "flowers",
    name: "Flowers",
    tags: ["products", "inspirations"],
    count: 68,
    image: require("../assets/icons/flowers.png")
  },
  {
    id: "sprayers",
    name: "Sprayers",
    tags: ["products", "shop"],
    count: 17,
    image: require("../assets/icons/sprayers.png")
  },
  {
    id: "pots",
    name: "Pots",
    tags: ["products", "shop"],
    count: 47,
    image: require("../assets/icons/pots.png")
  },
  {
    id: "fertilizers",
    name: "fertilizers",
    tags: ["products", "shop"],
    count: 47,
    image: require("../assets/icons/fertilizers.png")
  }
];

const products = [
  {
    id: 1,
    name: "16 Best Plants That Thrive In Your Bedroom",
    description:
      "Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.",
    tags: ["Interior", "27 m²", "Ideas"],
    images: [
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
      // showing only 3 images, show +6 for the rest
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png"),
      require("../assets/images/plants_1.png"),
      require("../assets/images/plants_2.png"),
      require("../assets/images/plants_3.png")
    ]
  }
];

const explore = [
  // images
  require("../assets/images/explore_1.png"),
  require("../assets/images/explore_2.png"),
  require("../assets/images/explore_3.png"),
  require("../assets/images/explore_4.png"),
  require("../assets/images/explore_5.png"),
  require("../assets/images/explore_6.png")
];

const profile = {
  username: "react-ui-kit",
  location: "Europe",
  email: "contact@react-ui-kit.com",
  avatar: require("../assets/images/avatar.png"),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false
};

const challenges = [
  {
    "id": 1,
    "type": 1,
    "question": "4, 8, 16, ?",
    "style": {
      "shape": "rectangle",
      "color": "blue"
    },
    "options": "4, 8, 16, 32",
    "answer": "32"
  },
  {
    "id": 2,
    "type": 1,
    "question": "2 + 2 x 2 = ?",
    "style": {
      "shape": "rectangle",
      "color": "blue"
    },
    "options": "6, 8, 10, 12",
    "answer": "6"
  },
  {
    "id": 3,
    "type": 1,
    "question": "▢ + ▢ = 8\n❍ + ▢ = 14\n△ + ◯ = 11\n△ = ?",
    "style": {
      "shape": "rectangle",
      "color": "blue"
    },
    "options": "2, 6, 12, 18",
    "answer": "6"
  },
  {
    "id": 4,
    "type": 1,
    "question": "6 = 30\n3 = 15\n7 = 35\n2 = ?",
    "style": {
      "shape": "rectangle",
      "color": "blue"
    },
    "options": "6, 10, 16, 32",
    "answer": "10"
  },
  {
    "id": 5,
    "type": 1,
    "question": "4, 11, 18, ?",
    "style": {
      "shape": "rectangle",
      "color": "blue"
    },
    "options": "6, 10, 16, 25",
    "answer": "25"
  },
  {
    "id": 6,
    "type": 1,
    "question": "5 + 5 x 5 - 5 = ?",
    "style": {
      "shape": "rectangle",
      "color": "blue"
    },
    "options": "5, 15, 20, 25",
    "answer": "25"
  },
  {
    "id": 7,
    "type": 1,
    "question": "A + B = 60\nA - B = 40\nA / B = ?",
    "style": {
      "shape": "rectangle",
      "color": "blue"
    },
    "options": "5, 10, 15, 20",
    "answer": "5"
  },
  {
    "id": 8,
    "type": 1,
    "question": "13, 18 = 31\n7, 25 = 32\n12, 30 = 42\n26, 13 = ?",
    "style": {
      "shape": "rectangle",
      "color": "blue"
    },
    "options": "13, 22, 30, 39",
    "answer": "39"
  },
  {
    "id": 9,
    "type": 1,
    "question": "8 - 8 / 4 x 3 = ?",
    "style": {
      "shape": "rectangle",
      "color": "blue"
    },
    "options": "1, 2, 3, 4",
    "answer": "2"
  }
];

export { categories, explore, products, profile, challenges };
