import { MenuItem, SignatureProduct, CraftStep, ReviewItem } from '../types';

export const CATEGORY_IMAGES: Record<string, string> = {
  "Hot Brews": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  "Cold Brews": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
  "Iced Lattes": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
  "Affogato": "https://images.unsplash.com/photo-1594910077875-9e6b454b5030?auto=format&fit=crop&w=800&q=80",
  "Mocktails": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
  "Milkshakes": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
  "Boba Soda": "https://images.unsplash.com/photo-1558857563-b37cf5c363bc?auto=format&fit=crop&w=800&q=80",
  "Iced Teas": "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80",
  "Big-Boy Burgers": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  "Pasta": "https://images.unsplash.com/photo-1621996346565-e3d5d6281220?auto=format&fit=crop&w=800&q=80",
  "Pizzas": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
  "Garlic Breads": "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=800&q=80",
  "Sandwiches": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
  "Nachos": "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80",
  "Momos (5 pcs)": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
  "Gourmet Subs": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
  "Yumilicious Fries": "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
  "Brownies": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
  "Cake Slice": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  "Cookies": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
  "Specials": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80"
};

export interface RawMenuItem {
  id: string;
  name: string;
  price: number;
  veg: boolean;
  desc?: string;
  bestseller?: boolean;
  tag?: string;
  image?: string;
  category?: string;
}

export const RAW_MENU: Record<string, RawMenuItem[]> = {
  "Hot Brews": [
    {
      "id": "hb1",
      "name": "Espresso 30ml",
      "price": 89,
      "veg": true
    },
    {
      "id": "hb2",
      "name": "Espresso 60ml",
      "price": 99,
      "veg": true
    },
    {
      "id": "hb3",
      "name": "Regular Hot Coffee",
      "price": 99,
      "veg": true
    },
    {
      "id": "hb4",
      "name": "Americano",
      "price": 109,
      "veg": true
    },
    {
      "id": "hb5",
      "name": "Cappuccino (S/L)",
      "price": 129,
      "veg": true,
      "bestseller": true
    },
    {
      "id": "hb6",
      "name": "Caf\u00e9 Latte",
      "price": 129,
      "veg": true
    },
    {
      "id": "hb7",
      "name": "Caf\u00e9 Mocha",
      "price": 149,
      "veg": true
    },
    {
      "id": "hb8",
      "name": "Irish Coffee",
      "price": 149,
      "veg": true
    },
    {
      "id": "hb9",
      "name": "Caramel/Vanilla Coffee",
      "price": 149,
      "veg": true
    },
    {
      "id": "hb10",
      "name": "Hazelnut Coffee",
      "price": 149,
      "veg": true
    },
    {
      "id": "hb11",
      "name": "Hot Chocolate",
      "price": 149,
      "veg": true,
      "bestseller": true,
      "desc": "Best hot chocolate in town \u2014 rich, velvety, and soul-warming."
    },
    {
      "id": "hb12",
      "name": "Butter Chocolate",
      "price": 149,
      "veg": true
    },
    {
      "id": "hb13",
      "name": "Caramel Latte",
      "price": 149,
      "veg": true
    },
    {
      "id": "hb14",
      "name": "Biscoff Latte",
      "price": 179,
      "veg": true
    }
  ],
  "Cold Brews": [
    {
      "id": "cb1",
      "name": "Iced Americano",
      "price": 119,
      "veg": true
    },
    {
      "id": "cb2",
      "name": "Iced Cappuccino",
      "price": 129,
      "veg": true
    },
    {
      "id": "cb3",
      "name": "Classic Cold Coffee",
      "price": 139,
      "veg": true,
      "bestseller": true
    },
    {
      "id": "cb4",
      "name": "Caramel/Vanilla",
      "price": 159,
      "veg": true
    },
    {
      "id": "cb5",
      "name": "Hazelnut/Irish",
      "price": 159,
      "veg": true
    },
    {
      "id": "cb6",
      "name": "Chocolate Cold Coffee",
      "price": 169,
      "veg": true
    },
    {
      "id": "cb7",
      "name": "Caffeine Overload",
      "price": 169,
      "veg": true
    },
    {
      "id": "cb8",
      "name": "Shahi Thandai",
      "price": 179,
      "veg": true
    },
    {
      "id": "cb9",
      "name": "Vietnamese Style Cold Coffee",
      "price": 199,
      "veg": true,
      "bestseller": true,
      "desc": "Our signature \u2014 silky, strong, impossibly smooth."
    }
  ],
  "Iced Lattes": [
    {
      "id": "il1",
      "name": "Iced Latte",
      "price": 129,
      "veg": true
    },
    {
      "id": "il2",
      "name": "Biscoff Iced Latte",
      "price": 189,
      "veg": true
    },
    {
      "id": "il3",
      "name": "Nutella Iced Latte",
      "price": 189,
      "veg": true
    },
    {
      "id": "il4",
      "name": "Blueberry Iced Latte",
      "price": 189,
      "veg": true
    },
    {
      "id": "il5",
      "name": "Strawberry Iced Latte",
      "price": 189,
      "veg": true
    }
  ],
  "Affogato": [
    {
      "id": "af1",
      "name": "Classic Affogato",
      "price": 129,
      "veg": true
    },
    {
      "id": "af2",
      "name": "Chocolate Affogato",
      "price": 149,
      "veg": true
    },
    {
      "id": "af3",
      "name": "Strawberry Affogato",
      "price": 149,
      "veg": true
    },
    {
      "id": "af4",
      "name": "Biscoff Affogato",
      "price": 169,
      "veg": true
    },
    {
      "id": "af5",
      "name": "Nutella Affogato",
      "price": 169,
      "veg": true
    }
  ],
  "Mocktails": [
    {
      "id": "mc1",
      "name": "Classic Virgin Mojito",
      "price": 129,
      "veg": true
    },
    {
      "id": "mc2",
      "name": "Strawberry Mojito",
      "price": 129,
      "veg": true
    },
    {
      "id": "mc3",
      "name": "Cucumber Mint",
      "price": 129,
      "veg": true
    },
    {
      "id": "mc4",
      "name": "Kala Khatta",
      "price": 129,
      "veg": true
    },
    {
      "id": "mc5",
      "name": "Electric Blue",
      "price": 129,
      "veg": true
    },
    {
      "id": "mc6",
      "name": "Lychee Fizz",
      "price": 129,
      "veg": true
    },
    {
      "id": "mc7",
      "name": "Mix Berry",
      "price": 129,
      "veg": true
    },
    {
      "id": "mc8",
      "name": "Kaccha Aam",
      "price": 129,
      "veg": true
    }
  ],
  "Milkshakes": [
    {
      "id": "ms1",
      "name": "Classic Vanilla",
      "price": 149,
      "veg": true
    },
    {
      "id": "ms2",
      "name": "Rich Chocolate",
      "price": 149,
      "veg": true
    },
    {
      "id": "ms3",
      "name": "Strawberry Delight",
      "price": 149,
      "veg": true
    },
    {
      "id": "ms4",
      "name": "Creamy Oreo",
      "price": 169,
      "veg": true,
      "bestseller": true
    },
    {
      "id": "ms5",
      "name": "KitKat Heaven",
      "price": 169,
      "veg": true
    },
    {
      "id": "ms6",
      "name": "Biscoff Shake",
      "price": 199,
      "veg": true
    },
    {
      "id": "ms7",
      "name": "Nutty Nutella",
      "price": 199,
      "veg": true
    },
    {
      "id": "ms8",
      "name": "Brownie Shake",
      "price": 199,
      "veg": true
    }
  ],
  "Boba Soda": [
    {
      "id": "bs1",
      "name": "Very Berry",
      "price": 169,
      "veg": true
    },
    {
      "id": "bs2",
      "name": "Peachy-Lychee",
      "price": 169,
      "veg": true
    },
    {
      "id": "bs3",
      "name": "Sparkling Grape",
      "price": 169,
      "veg": true
    },
    {
      "id": "bs4",
      "name": "Passion Fruit Magic",
      "price": 169,
      "veg": true
    }
  ],
  "Iced Teas": [
    {
      "id": "it1",
      "name": "Lemon",
      "price": 129,
      "veg": true
    },
    {
      "id": "it2",
      "name": "Peach",
      "price": 129,
      "veg": true
    },
    {
      "id": "it3",
      "name": "Hibiscus Raspberry",
      "price": 149,
      "veg": true
    },
    {
      "id": "it4",
      "name": "Cranberry",
      "price": 149,
      "veg": true
    }
  ],
  "Big-Boy Burgers": [
    {
      "id": "bg1",
      "name": "Crispy Veg Burger",
      "price": 99,
      "veg": true,
      "desc": "Juicy veg in-house patty with secret dressing in soft buns."
    },
    {
      "id": "bg2",
      "name": "Mexican Burger",
      "price": 119,
      "veg": true,
      "desc": "Spicy vegetarian patty with nachos and salsa."
    },
    {
      "id": "bg3",
      "name": "Grilled Paneer Burger",
      "price": 129,
      "veg": true,
      "bestseller": true,
      "desc": "Smoky grilled cottage cheese with barbeque sauce."
    },
    {
      "id": "bg4",
      "name": "Cheese Lava Burger",
      "price": 149,
      "veg": true,
      "desc": "Juicy veg patty with melted cheese and in-house sauce."
    }
  ],
  "Pasta": [
    {
      "id": "pa1",
      "name": "Red Sauce Pasta",
      "price": 189,
      "veg": true,
      "desc": "Velvety in-house tomato sauce over perfectly cooked penne."
    },
    {
      "id": "pa2",
      "name": "Cheesy White Sauce Pasta",
      "price": 199,
      "veg": true,
      "bestseller": true,
      "desc": "Italian herbs, creamy white sauce, gourmet veggies."
    },
    {
      "id": "pa3",
      "name": "Pink Sauce Pasta",
      "price": 199,
      "veg": true
    },
    {
      "id": "pa4",
      "name": "Creamy Mushroom Pasta",
      "price": 199,
      "veg": true
    },
    {
      "id": "pa5",
      "name": "Baked Pasta (Red/White/Pink)",
      "price": 249,
      "veg": true,
      "desc": "Extra creamy penne baked with mozzarella and Italian herbs."
    }
  ],
  "Pizzas": [
    {
      "id": "pz1",
      "name": "Classic Margherita",
      "price": 199,
      "veg": true
    },
    {
      "id": "pz2",
      "name": "Farmhouse",
      "price": 229,
      "veg": true
    },
    {
      "id": "pz3",
      "name": "Exotica",
      "price": 229,
      "veg": true
    },
    {
      "id": "pz4",
      "name": "Paneer Tikka Pizza",
      "price": 249,
      "veg": true,
      "bestseller": true
    },
    {
      "id": "pz5",
      "name": "Caffeine Special Cheese Loaded",
      "price": 279,
      "veg": true
    }
  ],
  "Garlic Breads": [
    {
      "id": "gb1",
      "name": "Classic Garlic Bread",
      "price": 79,
      "veg": true,
      "bestseller": true,
      "desc": "Butter toast topped with melted cheese."
    },
    {
      "id": "gb2",
      "name": "Chilli Cheese Toast",
      "price": 89,
      "veg": true
    },
    {
      "id": "gb3",
      "name": "Corn & Mushroom Toast",
      "price": 99,
      "veg": true
    },
    {
      "id": "gb4",
      "name": "Paneer Tikka Toast",
      "price": 99,
      "veg": true
    }
  ],
  "Sandwiches": [
    {
      "id": "sw1",
      "name": "Classic Vegetable",
      "price": 99,
      "veg": true
    },
    {
      "id": "sw2",
      "name": "Peri-Peri Double Cheese",
      "price": 129,
      "veg": true
    },
    {
      "id": "sw3",
      "name": "Paneer Tikka & Corn",
      "price": 149,
      "veg": true,
      "bestseller": true
    },
    {
      "id": "sw4",
      "name": "Grilled Paneer",
      "price": 149,
      "veg": true
    },
    {
      "id": "sw5",
      "name": "Cheesy Pizza Sandwich",
      "price": 149,
      "veg": true
    }
  ],
  "Nachos": [
    {
      "id": "na1",
      "name": "Veg Loaded Nachos",
      "price": 129,
      "veg": true
    },
    {
      "id": "na2",
      "name": "Corn & Peanut Nachos",
      "price": 149,
      "veg": true
    },
    {
      "id": "na3",
      "name": "Chatpati Nachos Bhel",
      "price": 159,
      "veg": true
    },
    {
      "id": "na4",
      "name": "Loaded Paneer Nachos",
      "price": 169,
      "veg": true
    },
    {
      "id": "na5",
      "name": "Cheese Loaded Baked Nachos",
      "price": 199,
      "veg": true
    }
  ],
  "Momos (5 pcs)": [
    {
      "id": "mo1",
      "name": "Steam Veg",
      "price": 99,
      "veg": true
    },
    {
      "id": "mo2",
      "name": "Steam Paneer",
      "price": 109,
      "veg": true
    },
    {
      "id": "mo3",
      "name": "Crispy Fried Veg",
      "price": 129,
      "veg": true
    },
    {
      "id": "mo4",
      "name": "Crispy Fried Paneer",
      "price": 139,
      "veg": true
    },
    {
      "id": "mo5",
      "name": "Chilli Garlic Pan Fried Veg",
      "price": 139,
      "veg": true
    },
    {
      "id": "mo6",
      "name": "Cheese Loaded Creamy Paneer",
      "price": 159,
      "veg": true,
      "bestseller": true
    }
  ],
  "Gourmet Subs": [
    {
      "id": "su1",
      "name": "Mix-Veg Crispy Sub",
      "price": 179,
      "veg": true
    },
    {
      "id": "su2",
      "name": "Corn & Mushroom Sub",
      "price": 179,
      "veg": true
    },
    {
      "id": "su3",
      "name": "Paneer Tikka Sub",
      "price": 189,
      "veg": true,
      "bestseller": true,
      "desc": "Tandoori paneer with sauces in freshly baked bread."
    },
    {
      "id": "su4",
      "name": "Crunchy Mexican Sub",
      "price": 189,
      "veg": true
    },
    {
      "id": "su5",
      "name": "Smoked BBQ Paneer Sub",
      "price": 189,
      "veg": true
    },
    {
      "id": "su6",
      "name": "Falafel Sub",
      "price": 189,
      "veg": true
    }
  ],
  "Yumilicious Fries": [
    {
      "id": "fr1",
      "name": "Classic French Fries",
      "price": 119,
      "veg": true
    },
    {
      "id": "fr2",
      "name": "Peri-Peri Fries",
      "price": 129,
      "veg": true
    },
    {
      "id": "fr3",
      "name": "Tandoori French Fries",
      "price": 149,
      "veg": true
    },
    {
      "id": "fr4",
      "name": "Cheese Overloaded Fries",
      "price": 149,
      "veg": true,
      "bestseller": true
    },
    {
      "id": "fr5",
      "name": "Crispy Honey Chilli Potato",
      "price": 169,
      "veg": true
    },
    {
      "id": "fr6",
      "name": "Chunky Chilli Paneer",
      "price": 199,
      "veg": true
    }
  ],
  "Brownies": [
    {
      "id": "br1",
      "name": "Walnut Brownie",
      "price": 119,
      "veg": true
    },
    {
      "id": "br2",
      "name": "Biscoff Brownie",
      "price": 139,
      "veg": true
    },
    {
      "id": "br3",
      "name": "Brownie with Ice-Cream",
      "price": 159,
      "veg": true,
      "bestseller": true,
      "desc": "Warm fudgy brownie, cold vanilla ice cream. Pure magic."
    }
  ],
  "Cake Slice": [
    {
      "id": "cs1",
      "name": "Pineapple Slice",
      "price": 55,
      "veg": true
    },
    {
      "id": "cs2",
      "name": "Blackforest Slice",
      "price": 65,
      "veg": true
    },
    {
      "id": "cs3",
      "name": "Butterscotch Slice",
      "price": 65,
      "veg": true
    },
    {
      "id": "cs4",
      "name": "Chocolate Truffle Slice",
      "price": 89,
      "veg": true,
      "bestseller": true
    },
    {
      "id": "cs5",
      "name": "Triple Chocolate Slice",
      "price": 99,
      "veg": true
    }
  ],
  "Cookies": [
    {
      "id": "ck1",
      "name": "Chocochip Nutella Cookie",
      "price": 49,
      "veg": true
    },
    {
      "id": "ck2",
      "name": "Choco Walnut Cookie",
      "price": 49,
      "veg": true
    },
    {
      "id": "ck3",
      "name": "Oatmeal Cookie",
      "price": 49,
      "veg": true
    },
    {
      "id": "ck4",
      "name": "Red Velvet Cookie",
      "price": 49,
      "veg": true
    }
  ],
  "Specials": [
    {
      "id": "sp1",
      "name": "Cappuccino with Flowers",
      "price": 299,
      "veg": true,
      "bestseller": true
    },
    {
      "id": "sp2",
      "name": "Cold Coffee with Flowers",
      "price": 349,
      "veg": true
    },
    {
      "id": "sp3",
      "name": "Bento Cake with Rose",
      "price": 449,
      "veg": true
    },
    {
      "id": "sp4",
      "name": "Bento with Flowers Hamper",
      "price": 699,
      "veg": true
    }
  ]
};

export const ALL_MENU_ITEMS: MenuItem[] = Object.entries(RAW_MENU).flatMap(([cat, items]) =>
  items.map(it => ({
    ...it,
    category: cat,
    image: it.image || CATEGORY_IMAGES[cat] || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
  }))
);

export const MENU_CATEGORIES = Object.keys(RAW_MENU);
export const ALL_MENU_CATEGORIES = MENU_CATEGORIES;

export const POPULAR_ITEMS = [
  {
    "id": "hb11",
    "name": "Hot Chocolate",
    "price": 149,
    "emoji": "\u2615",
    "tag": "Best Seller"
  },
  {
    "id": "hb5",
    "name": "Cappuccino",
    "price": 129,
    "emoji": "\u2615",
    "tag": "Fan Favourite"
  },
  {
    "id": "cb9",
    "name": "Vietnamese Cold Coffee",
    "price": 199,
    "emoji": "\ud83e\uddcb",
    "tag": "Must Try"
  },
  {
    "id": "pa2",
    "name": "White Sauce Pasta",
    "price": 199,
    "emoji": "\ud83c\udf5d",
    "tag": "Top Pick"
  },
  {
    "id": "gb1",
    "name": "Classic Garlic Bread",
    "price": 79,
    "emoji": "\ud83e\udd56",
    "tag": "Crowd Favourite"
  },
  {
    "id": "su3",
    "name": "Paneer Tikka Sub",
    "price": 189,
    "emoji": "\ud83e\udd59",
    "tag": "Bestseller"
  },
  {
    "id": "bg3",
    "name": "Grilled Paneer Burger",
    "price": 129,
    "emoji": "\ud83c\udf54",
    "tag": "Popular"
  },
  {
    "id": "br3",
    "name": "Brownie with Ice-Cream",
    "price": 159,
    "emoji": "\ud83c\udf6b",
    "tag": "Dessert Star"
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    "name": "Areena Fatima",
    "rating": 5,
    "text": "Best hot chocolate in town with a cosy, warm ambience. Absolutely loved every sip!",
    "avatar": "AF"
  },
  {
    "name": "Sahil Ahuja",
    "rating": 5,
    "text": "One of the best Instagrammable caf\u00e9s in Aligarh. Cozy space to hang out with friends and great food!",
    "avatar": "SA"
  },
  {
    "name": "Ekansh Gupta",
    "rating": 5,
    "text": "Perfect for coffee dates! White sauce pasta was yummy and the cappuccinos were warm and justified the caf\u00e9 name.",
    "avatar": "EG"
  },
  {
    "name": "Kuldeep Sharma",
    "rating": 5,
    "text": "One of the best places in Aligarh. Really high quality food \u2014 the staff behaviour and service is commendable!",
    "avatar": "KS"
  },
  {
    "name": "Vineet Sharma",
    "rating": 5,
    "text": "Best caf\u00e9 in Aligarh \u2014 hot chocolate is a must try. Highly recommend!",
    "avatar": "VS"
  },
  {
    "name": "Ananya Rastogi",
    "rating": 5,
    "text": "Such a cozy and welcoming vibe. The food was fresh, flavorful, and beautifully presented.",
    "avatar": "AR"
  },
  {
    "name": "Abuzar Khan",
    "rating": 5,
    "text": "Perfectly made cappuccino and an amazing playlist that suits every mood. Great atmosphere!",
    "avatar": "AK"
  },
  {
    "name": "Naima Nazir",
    "rating": 5,
    "text": "I love the Vietnamese styled cold coffee. Just in love with the cozy vibes every single time.",
    "avatar": "NN"
  }
];

export const SIGNATURE_PRODUCTS: SignatureProduct[] = [
  {
    id: "cb9",
    name: "Vietnamese Style Cold Coffee",
    category: "Cold Brews",
    price: 199,
    tag: "Café Flagship",
    subtitle: "Dark Roasted Arabica & Sweetened Condensed Cream",
    desc: "Our undisputed icon. A slow-dripped, intensely rich dark roast whipped over ice and condensed milk. Silky, full-bodied, and lingering.",
    notes: ["Dark Cocoa", "Caramelized Sugar", "Velvety Mouthfeel"],
    temperature: "Chilled on hand-cracked ice",
    serving: "350ml Tall Crystal",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "hb11",
    name: "Caffeine Velvet Hot Chocolate",
    category: "Hot Brews",
    price: 149,
    tag: "Soul Warmer",
    subtitle: "70% Belgian Dark Cacao, Whole Milk, Cinnamon Bark",
    desc: "Voted Aligarh\'s most cherished winter drink. Melted couverture chocolate folded gently into steamed farm milk with subtle warmth.",
    notes: ["70% Single Origin Cacao", "Vanilla Bean", "Silk Cream"],
    temperature: "Steamed to 65°C",
    serving: "280ml Ceramic Mug",
    image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "il2",
    name: "Biscoff Speculoos Iced Latte",
    category: "Iced Lattes",
    price: 189,
    tag: "Sweet Sensation",
    subtitle: "Double Ristretto, Spiced Cookie Butter, Chilled Foam",
    desc: "A golden swirl of melted Lotus Biscoff cookie spread layered beneath a double shot of bold espresso and velvety cold milk cloud.",
    notes: ["Spiced Cinnamon", "Brown Butter", "Caramel Crunch"],
    temperature: "Ice Cold",
    serving: "380ml Tumbler",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "hb5",
    name: "Artisan Cappuccino",
    category: "Hot Brews",
    price: 129,
    tag: "Barista Pure",
    subtitle: "Equal Thirds Espresso, Steamed Milk & Silky Micro-foam",
    desc: "The timeless benchmark of barista craftsmanship. Bold, sweet crema crowned with free-poured rosetta or tulip latte art.",
    notes: ["Roasted Hazelnut", "Toffee Crisp", "Parchment Crema"],
    temperature: "62°C Optimum Drinking Temp",
    serving: "220ml Hand-thrown Cup",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "af4",
    name: "Biscoff Affogato",
    category: "Affogato",
    price: 169,
    tag: "Dessert Espresso",
    subtitle: "Madagascan Vanilla Bean Gelato Drenched in Hot Espresso",
    desc: "A hot-meets-cold sensory collision. Dense artisanal gelato crowned with Lotus crumble, submerged in a searing double shot.",
    notes: ["Thermal Contrast", "Sweet Cream", "Bitter Roast"],
    temperature: "Frozen Gelato + Boiling Crema",
    serving: "Stemmed Coupe Glass",
    image: "https://images.unsplash.com/photo-1594910077875-9e6b454b5030?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "cb8",
    name: "Signature Shahi Thandai",
    category: "Cold Brews",
    price: 179,
    tag: "Royal Fusion",
    subtitle: "Saffron, Crushed Pistachio, Cardamom & Cold Infusion",
    desc: "A tribute to royal Awadhi hospitality. Infused with freshly grounded spices, whole nuts, rose petals, and creamy dairy.",
    notes: ["Kashmir Saffron", "Green Cardamom", "California Almond"],
    temperature: "Deep Chilled",
    serving: "Traditional Clay or Cut Glass",
    image: "https://images.unsplash.com/photo-1558857563-b37cf5c363bc?auto=format&fit=crop&w=1200&q=85"
  }
];

export const CRAFT_STEPS: CraftStep[] = [
  {
    number: "01",
    title: "Estate Origin Selection",
    subtitle: "Sourced from shade-grown estates",
    description: "Every bean arriving in Begpur is hand-selected 100% Arabica, harvested at peak altitude in Karnataka\'s Western Ghats.",
    detail: "Slow-ripened under native tree canopies to lock in natural sugars and bright citrus sweetness.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85"
  },
  {
    number: "02",
    title: "Micrometric Grind Calibration",
    subtitle: "Dialed in every single sunrise",
    description: "Our baristas recalibrate the flat steel burrs with each ambient humidity shift in Aligarh for ideal particle distribution.",
    detail: "Preserving volatile coffee oils and aromas that disappear within minutes of grinding.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85"
  },
  {
    number: "03",
    title: "9-Bar Hydraulic Extraction",
    subtitle: "Golden crema pulled to perfection",
    description: "Pre-infusion blooms the coffee bed before pressure climbs to an unyielding 9 bars, yielding a thick, hazelnut-hued crema.",
    detail: "Extracted strictly between 26 and 30 seconds for zero astringency and deep lingering sweetness.",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85"
  },
  {
    number: "04",
    title: "Velvet Micro-Foam Texture",
    subtitle: "Steamed to glossy perfection",
    description: "Dry steam vaporizes whole milk proteins into microscopic bubbles, creating a dense, reflective liquid silk.",
    detail: "Never scorched past 65°C, ensuring the natural sweetness of dairy shines without artificial syrups.",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1200&q=85"
  },
  {
    number: "05",
    title: "Choreographed Latte Art",
    subtitle: "The tactile hand-pour",
    description: "With wrist agility honed through thousands of pours, the barista cuts contrast patterns across the dark crema canvas.",
    detail: "From freehand rosettas to layered swans, every cup presented at your table is visually unique.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=85"
  }
];

export const CAFE_INFO = {
  name: "Caffeine Aligarh",
  tagline: "Where Coffee, Food, Conversations & Atmosphere Meet",
  location: "Shop No. 1, Square Tower, Marris Road, Begpur, Aligarh, UP 202001",
  address: "Shop No. 1, Square Tower, Marris Road, Begpur, Aligarh, UP 202001",
  landmark: "Square Tower, Marris Road",
  phone: "098976 18833",
  phoneFormatted: "+91 98976 18833",
  hours: "Open Daily · 10:00 AM – 12:00 AM (Midnight)",
  timings: {
    opens: "10:00 AM",
    closes: "12:00 AM",
    days: "Monday through Sunday"
  },
  rating: "4.8",
  reviewCount: "520+",
  googleMapsUrl: "https://maps.google.com?q=Caffeine+Aligarh+Square+Tower+Marris+Road",
  mapLink: "https://maps.google.com?q=Caffeine+Aligarh+Square+Tower+Marris+Road",
  instagramUrl: "https://instagram.com",
  story: "Caffeine Aligarh was born from a simple belief — that great coffee and genuine warmth can make any day better. Nestled in Square Tower on Marris Road, we have become Aligarh's sanctuary for slow sips, intimate conversations, study sessions, and late-night hot chocolate cravings."
};
