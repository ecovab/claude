export type MenuCategoryId =
  | "starters"
  | "seafood"
  | "grill"
  | "burgers"
  | "pizza"
  | "sushi"
  | "drinks"
  | "cocktails"
  | "desserts";

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
}

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  ingredients: string[];
  price: string;
  popular?: boolean;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "starters", label: "Starters" },
  { id: "seafood", label: "Seafood" },
  { id: "grill", label: "Grill" },
  { id: "burgers", label: "Burgers" },
  { id: "pizza", label: "Pizza" },
  { id: "sushi", label: "Sushi" },
  { id: "drinks", label: "Drinks" },
  { id: "cocktails", label: "Cocktails" },
  { id: "desserts", label: "Desserts" },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "blue-cheese-snails",
    category: "starters",
    name: "Blue Cheese Snails",
    description: "A Gecko classic — snails baked in a rich blue cheese cream sauce, served bubbling hot.",
    ingredients: ["snails", "blue cheese", "cream", "garlic", "toasted bread"],
    price: "R 89",
    popular: true,
  },
  {
    id: "crispy-calamari",
    category: "starters",
    name: "Crispy Calamari Strips",
    description: "Lightly floured and fried to order, served with tangy tartare and a wedge of lemon.",
    ingredients: ["calamari", "lemon", "tartare sauce", "side salad"],
    price: "R 79",
  },
  {
    id: "loaded-onion-rings",
    category: "starters",
    name: "Loaded Onion Rings",
    description: "Beer-battered onion rings stacked high with melted cheddar and smoky bacon bits.",
    ingredients: ["onion", "beer batter", "cheddar", "bacon"],
    price: "R 69",
  },
  {
    id: "buffalo-wings",
    category: "starters",
    name: "Buffalo Wings",
    description: "Free-range chicken wings tossed in house buffalo sauce, served with ranch dip.",
    ingredients: ["chicken wings", "buffalo sauce", "ranch dip", "celery"],
    price: "R 95",
  },
  {
    id: "grilled-kingklip",
    category: "seafood",
    name: "Grilled Kingklip",
    description: "Fresh-off-the-boat kingklip, char-grilled and finished with lemon-butter sauce.",
    ingredients: ["kingklip", "lemon butter", "seasonal veg", "rice"],
    price: "R 175",
    popular: true,
  },
  {
    id: "seafood-platter",
    category: "seafood",
    name: "Gecko Seafood Platter",
    description: "Prawns, calamari, mussels and grilled fish for two — the table-stealer.",
    ingredients: ["prawns", "calamari", "mussels", "line fish", "garlic butter"],
    price: "R 395",
    popular: true,
  },
  {
    id: "garlic-prawns",
    category: "seafood",
    name: "Garlic & Chilli Prawns",
    description: "Pan-seared prawns in a sizzling garlic, chilli and white wine butter.",
    ingredients: ["prawns", "garlic", "chilli", "white wine", "butter"],
    price: "R 165",
  },
  {
    id: "fillet-steak",
    category: "grill",
    name: "Peppered Fillet Steak",
    description: "300g grass-fed fillet crusted in cracked pepper, char-grilled to your liking.",
    ingredients: ["beef fillet", "cracked pepper", "pepper sauce", "chips"],
    price: "R 215",
    popular: true,
  },
  {
    id: "pork-ribs",
    category: "grill",
    name: "Full Rack Pork Ribs",
    description: "Slow-cooked, fall-off-the-bone ribs basted in Gecko's smoky-sweet glaze.",
    ingredients: ["pork ribs", "house glaze", "coleslaw", "fries"],
    price: "R 195",
    popular: true,
  },
  {
    id: "rump-steak",
    category: "grill",
    name: "Flame-Grilled Rump",
    description: "300g rump, char-marked over open flame, served with a choice of sauce.",
    ingredients: ["beef rump", "garlic butter", "mushroom sauce", "side"],
    price: "R 165",
  },
  {
    id: "mixed-grill",
    category: "grill",
    name: "The Gecko Mixed Grill",
    description: "Rump, pork rib, chicken sosatie and boerewors — for the genuinely hungry.",
    ingredients: ["rump", "pork ribs", "chicken sosatie", "boerewors"],
    price: "R 245",
  },
  {
    id: "classic-cheeseburger",
    category: "burgers",
    name: "Gecko Classic Cheeseburger",
    description: "Flame-grilled beef patty, melted cheddar, house relish, toasted bun.",
    ingredients: ["beef patty", "cheddar", "lettuce", "house relish"],
    price: "R 115",
    popular: true,
  },
  {
    id: "rib-burger",
    category: "burgers",
    name: "Smoked Rib Burger",
    description: "Beef patty topped with pulled rib meat and a smoky BBQ glaze.",
    ingredients: ["beef patty", "pulled rib meat", "BBQ glaze", "onion crisps"],
    price: "R 139",
  },
  {
    id: "halloumi-burger",
    category: "burgers",
    name: "Grilled Halloumi Burger",
    description: "Char-grilled halloumi, rocket, roasted peppers and basil pesto mayo.",
    ingredients: ["halloumi", "rocket", "roasted peppers", "pesto mayo"],
    price: "R 119",
  },
  {
    id: "margherita-pizza",
    category: "pizza",
    name: "Margherita",
    description: "San Marzano tomato, fresh mozzarella and basil on a hand-stretched base.",
    ingredients: ["tomato", "mozzarella", "basil", "olive oil"],
    price: "R 99",
  },
  {
    id: "gecko-special-pizza",
    category: "pizza",
    name: "The Gecko Special",
    description: "Bacon, salami, mushroom, peppers and double cheese — a house favourite.",
    ingredients: ["bacon", "salami", "mushroom", "peppers", "cheese"],
    price: "R 139",
    popular: true,
  },
  {
    id: "seafood-pizza",
    category: "pizza",
    name: "Seafood Pizza",
    description: "Prawns and calamari over a creamy garlic base, finished with parsley.",
    ingredients: ["prawns", "calamari", "garlic cream base", "parsley"],
    price: "R 155",
  },
  {
    id: "california-roll",
    category: "sushi",
    name: "California Roll",
    description: "Crab stick, avocado and cucumber, rolled in toasted sesame.",
    ingredients: ["crab stick", "avocado", "cucumber", "sesame"],
    price: "R 85",
  },
  {
    id: "salmon-rose",
    category: "sushi",
    name: "Salmon Rose Platter",
    description: "Fresh salmon nigiri and rolls, plated for sharing.",
    ingredients: ["salmon", "sushi rice", "nori", "wasabi"],
    price: "R 175",
    popular: true,
  },
  {
    id: "dragon-roll",
    category: "sushi",
    name: "Dragon Roll",
    description: "Tempura prawn, cucumber and avocado, topped with eel sauce.",
    ingredients: ["tempura prawn", "avocado", "cucumber", "eel sauce"],
    price: "R 119",
  },
  {
    id: "draught-beer",
    category: "drinks",
    name: "Draught Beer",
    description: "Ice-cold local draught on tap, by the pint.",
    ingredients: ["pilsner draught"],
    price: "R 45",
  },
  {
    id: "house-wine",
    category: "drinks",
    name: "Western Cape Wine",
    description: "A glass from our rotating list of Boland reds and whites.",
    ingredients: ["red wine", "white wine"],
    price: "R 55",
  },
  {
    id: "fresh-juice",
    category: "drinks",
    name: "Fresh Fruit Juice",
    description: "Cold-pressed, made to order — orange, apple or mixed berry.",
    ingredients: ["fresh fruit"],
    price: "R 38",
  },
  {
    id: "gecko-mule",
    category: "cocktails",
    name: "Gecko Mule",
    description: "Vodka, ginger beer, lime and fresh mint over crushed ice.",
    ingredients: ["vodka", "ginger beer", "lime", "mint"],
    price: "R 89",
    popular: true,
  },
  {
    id: "sundowner-spritz",
    category: "cocktails",
    name: "Sundowner Spritz",
    description: "Aperol, prosecco and soda — built for the terrace at golden hour.",
    ingredients: ["aperol", "prosecco", "soda", "orange"],
    price: "R 95",
  },
  {
    id: "whiskey-sour",
    category: "cocktails",
    name: "Smoked Whiskey Sour",
    description: "Bourbon, lemon, sugar and bitters, finished with a touch of smoke.",
    ingredients: ["bourbon", "lemon", "sugar", "bitters"],
    price: "R 99",
  },
  {
    id: "belgian-waffle",
    category: "desserts",
    name: "Belgian Waffle",
    description: "Warm waffle, vanilla ice cream, chocolate sauce and toasted nuts.",
    ingredients: ["waffle", "vanilla ice cream", "chocolate sauce", "nuts"],
    price: "R 75",
    popular: true,
  },
  {
    id: "chocolate-brownie",
    category: "desserts",
    name: "Molten Chocolate Brownie",
    description: "Warm brownie with a melting centre, served with vanilla ice cream.",
    ingredients: ["chocolate", "brownie", "vanilla ice cream"],
    price: "R 69",
  },
  {
    id: "malva-pudding",
    category: "desserts",
    name: "Malva Pudding",
    description: "A South African classic — warm, spongy and soaked in sweet sauce.",
    ingredients: ["malva sponge", "caramel sauce", "cream"],
    price: "R 65",
  },
];
