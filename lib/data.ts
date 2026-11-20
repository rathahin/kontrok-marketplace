export type CategoryId = "electronics" | "beauty" | "home" | "men" | "women" | "sports" | "auto" | "groceries";
export type Location = "pp" | "sr" | "btb" | "overseas";
export type Badge = "mall" | "freeship";
export type Channel = "freeship" | "mall" | "under5" | "global";

export interface Swatch {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  category: CategoryId;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  sold: number;
  stock: number;
  location: Location;
  badge?: Badge;
  colors?: Swatch[];
  sizes?: string[];
  /** extra search terms (lowercase) */
  keywords: string;
}

/** Unsplash photo by id, square-cropped. All ids below were checked to load. */
export const unsplash = (id: string, w = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&fit=crop&auto=format&q=70`;

const IMG = {
  earbuds: "1590658268037-6bf12165a8df",
  camera: "1526170375885-4d8ecf77b99f",
  smartwatch: "1579586337278-3befd40fd17a",
  charger: "1583863788434-e58a36330cf0",
  phone: "1601784551446-20c9e07cdbdb",
  speaker: "1608043152269-423dbba4e7e1",
  lotion: "1620916566398-39f1143ab7be",
  sunscreen: "1556228720-195a672e8a03",
  lipstick: "1586495777744-4413f21062fa",
  perfume: "1541643600914-78b084683601",
  mug: "1514228742587-6b1558fcca3d",
  armchair: "1586023492125-27b2c045efd7",
  bedding: "1505693416388-ac5ce068fe85",
  tshirt: "1521572163474-6864f9cf17ab",
  runningRed: "1542291026-7eec264c27ff",
  watch: "1523275335684-37898b6baf30",
  dress: "1595777457583-95e059d581b8",
  bag: "1584917865442-de89df76afd3",
  whiteSneakers: "1626379616459-b2ce1d9decbc",
  sunglasses: "1572635196237-14b3f281503f",
  yogaMat: "1601925260368-ae2f83cf8b7f",
  dumbbell: "1583454110551-21f2fa2afe61",
  car: "1492144534655-ae79c964c9d7",
  chocolate: "1621939514649-280e2ee25f60",
  headphones: "1505740420928-5e560c06d30e",
  laptop: "1496181133206-80ce9b88a853",
  smartphone: "1511707171634-5f897ff02aa9",
  skincare: "1556228578-8c89e6adf883",
} as const;

const BLACK: Swatch = { name: "Black", hex: "#1F2937" };
const WHITE: Swatch = { name: "White", hex: "#F9FAFB" };

export const products: Product[] = [
  { id: "p1", title: "Kontrok Buds Pro ANC Wireless Earbuds, 40H Battery, Bluetooth 5.3", image: unsplash(IMG.earbuds), category: "electronics", price: 18.9, originalPrice: 39, rating: 4.8, reviews: 2314, sold: 5120, stock: 380, location: "pp", badge: "mall", colors: [BLACK, WHITE], keywords: "wireless earbuds headphones bluetooth audio" },
  { id: "p2", title: "Instant Film Camera with Built-in Flash & Selfie Mirror", image: unsplash(IMG.camera), category: "electronics", price: 54, originalPrice: 89, rating: 4.7, reviews: 612, sold: 980, stock: 45, location: "overseas", badge: "freeship", colors: [WHITE, { name: "Mint", hex: "#A7F3D0" }, { name: "Pink", hex: "#FBCFE8" }], keywords: "instant camera polaroid photo" },
  { id: "p3", title: 'Smart Watch 1.96" AMOLED, Heart Rate & SpO2, IP68 Waterproof', image: unsplash(IMG.smartwatch), category: "electronics", price: 24.5, originalPrice: 59, rating: 4.6, reviews: 1530, sold: 3890, stock: 210, location: "pp", badge: "freeship", colors: [{ name: "Midnight", hex: "#111827" }, { name: "Silver", hex: "#D1D5DB" }, { name: "Pink", hex: "#F9A8D4" }], keywords: "smart watch smartwatch fitness tracker wearable" },
  { id: "p4", title: "65W GaN Fast Charger, USB-C PD for Laptop, iPhone & Samsung", image: unsplash(IMG.charger), category: "electronics", price: 9.9, originalPrice: 19.9, rating: 4.9, reviews: 3012, sold: 8800, stock: 640, location: "pp", badge: "mall", keywords: "charger usb-c adapter laptop accessories" },
  { id: "p5", title: "Slim Shockproof Phone Case + Tempered Glass Screen Protector Set", image: unsplash(IMG.phone), category: "electronics", price: 2.9, originalPrice: 7.5, rating: 4.8, reviews: 5402, sold: 12040, stock: 1500, location: "pp", badge: "freeship", colors: [{ name: "Clear", hex: "#E5E7EB" }, BLACK, { name: "Navy", hex: "#1E3A8A" }], keywords: "phone case iphone samsung screen protector smartphone" },
  { id: "p6", title: "Portable Bluetooth Speaker 20W, Deep Bass, IPX7 Waterproof", image: unsplash(IMG.speaker), category: "electronics", price: 15.9, originalPrice: 29, rating: 4.7, reviews: 941, sold: 2130, stock: 120, location: "sr", colors: [BLACK, { name: "Blue", hex: "#2563EB" }], keywords: "speaker bluetooth audio music" },
  { id: "p7", title: "Brightening Body Emulsion 200ml with Niacinamide & Ceramide", image: unsplash(IMG.lotion), category: "beauty", price: 6.5, originalPrice: 14, rating: 4.9, reviews: 4120, sold: 9800, stock: 900, location: "pp", badge: "mall", keywords: "skincare lotion moisturizer body" },
  { id: "p8", title: "Hydrating Sunscreen Gel SPF50+ PA++++, Lightweight 50ml", image: unsplash(IMG.sunscreen), category: "beauty", price: 5.9, originalPrice: 11, rating: 4.8, reviews: 2876, sold: 7400, stock: 520, location: "pp", badge: "mall", keywords: "skincare sunscreen spf sunblock" },
  { id: "p9", title: "Matte Velvet Lipstick, Long-Lasting & Transfer-Proof", image: unsplash(IMG.lipstick), category: "beauty", price: 3.5, originalPrice: 8, rating: 4.6, reviews: 1203, sold: 4300, stock: 300, location: "btb", badge: "freeship", colors: [{ name: "Ruby", hex: "#9F1239" }, { name: "Nude", hex: "#D6A38F" }, { name: "Coral", hex: "#F87171" }], keywords: "makeup lipstick lip cosmetics" },
  { id: "p10", title: "Eau de Parfum Floral Musk 50ml, Long-Lasting Scent", image: unsplash(IMG.perfume), category: "beauty", price: 12.9, originalPrice: 32, rating: 4.7, reviews: 655, sold: 1100, stock: 75, location: "overseas", badge: "mall", keywords: "perfume fragrance scent" },
  { id: "p11", title: "Minimalist Ceramic Coffee Mug 350ml, Matte Glaze", image: unsplash(IMG.mug), category: "home", price: 3.2, originalPrice: 6.5, rating: 4.8, reviews: 2210, sold: 6100, stock: 800, location: "pp", badge: "freeship", colors: [WHITE, { name: "Sand", hex: "#E7D9C4" }, { name: "Sage", hex: "#A3B18A" }], keywords: "mug cup kitchen coffee dining" },
  { id: "p12", title: "Velvet Accent Armchair, Mid-Century Wooden Legs", image: unsplash(IMG.armchair), category: "home", price: 89, originalPrice: 159, rating: 4.7, reviews: 318, sold: 420, stock: 18, location: "pp", badge: "mall", colors: [{ name: "Mustard", hex: "#D4A017" }, { name: "Emerald", hex: "#047857" }, { name: "Grey", hex: "#6B7280" }], keywords: "furniture chair sofa armchair living room" },
  { id: "p13", title: "100% Cotton Bedsheet Set, Queen Size, 4-Piece", image: unsplash(IMG.bedding), category: "home", price: 16.9, originalPrice: 35, rating: 4.6, reviews: 512, sold: 980, stock: 140, location: "pp", colors: [WHITE, { name: "Grey", hex: "#9CA3AF" }, { name: "Blush", hex: "#FBCFE8" }], keywords: "bedding bedsheet bed sheets" },
  { id: "p14", title: "Men's Oversized Cotton T-Shirt, Basic Crew Neck", image: unsplash(IMG.tshirt), category: "men", price: 4.9, originalPrice: 9.9, rating: 4.7, reviews: 3340, sold: 10200, stock: 2000, location: "pp", badge: "freeship", colors: [WHITE, BLACK, { name: "Olive", hex: "#556B2F" }], sizes: ["S", "M", "L", "XL", "XXL"], keywords: "t-shirt tshirt shirt tee clothing" },
  { id: "p15", title: "Men's Running Shoes, Lightweight Breathable Mesh", image: unsplash(IMG.runningRed), category: "men", price: 19.9, originalPrice: 45, rating: 4.6, reviews: 1408, sold: 3600, stock: 260, location: "overseas", colors: [{ name: "Red", hex: "#DC2626" }, BLACK], sizes: ["39", "40", "41", "42", "43", "44"], keywords: "sneakers shoes running" },
  { id: "p16", title: "Men's Minimalist Leather Watch, Quartz, 3ATM Waterproof", image: unsplash(IMG.watch), category: "men", price: 21, originalPrice: 48, rating: 4.8, reviews: 622, sold: 1300, stock: 90, location: "pp", badge: "mall", colors: [{ name: "Brown", hex: "#92400E" }, BLACK], keywords: "watch leather" },
  { id: "p17", title: "Polarized Sunglasses UV400, Unisex Retro Frame", image: unsplash(IMG.sunglasses), category: "men", price: 5.5, originalPrice: 15, rating: 4.5, reviews: 980, sold: 3100, stock: 500, location: "overseas", badge: "freeship", colors: [BLACK, { name: "Tortoise", hex: "#8B5A2B" }], keywords: "sunglasses glasses eyewear" },
  { id: "p18", title: "Women's Satin Maxi Evening Dress, Flowy A-Line", image: unsplash(IMG.dress), category: "women", price: 18.9, originalPrice: 42, rating: 4.7, reviews: 1980, sold: 4700, stock: 310, location: "pp", badge: "freeship", colors: [{ name: "Red", hex: "#DC2626" }, { name: "Champagne", hex: "#F3E5AB" }, BLACK], sizes: ["S", "M", "L", "XL"], keywords: "dress gown evening" },
  { id: "p19", title: "Women's Crossbody Shoulder Bag, Vegan Leather", image: unsplash(IMG.bag), category: "women", price: 9.5, originalPrice: 22, rating: 4.8, reviews: 2654, sold: 6900, stock: 410, location: "sr", colors: [{ name: "Tan", hex: "#D2B48C" }, BLACK, { name: "Cream", hex: "#FFFDD0" }], keywords: "bag handbag purse crossbody" },
  { id: "p20", title: "Women's Classic White Platform Sneakers", image: unsplash(IMG.whiteSneakers), category: "women", price: 14.9, originalPrice: 32, rating: 4.7, reviews: 2210, sold: 5300, stock: 380, location: "pp", badge: "freeship", sizes: ["36", "37", "38", "39", "40"], keywords: "sneakers shoes white" },
  { id: "p21", title: "Yoga Mat 6mm Non-Slip TPE with Carry Strap", image: unsplash(IMG.yogaMat), category: "sports", price: 8.9, originalPrice: 18, rating: 4.8, reviews: 1310, sold: 2800, stock: 220, location: "pp", colors: [{ name: "Teal", hex: "#0D9488" }, { name: "Purple", hex: "#7C3AED" }, BLACK], keywords: "yoga mat fitness exercise" },
  { id: "p22", title: "Adjustable Dumbbell Set 20kg with Storage Case", image: unsplash(IMG.dumbbell), category: "sports", price: 34, originalPrice: 65, rating: 4.7, reviews: 402, sold: 760, stock: 40, location: "pp", badge: "mall", keywords: "dumbbell weights gym fitness" },
  { id: "p23", title: "Car Dash Cam 1080P with Night Vision & G-Sensor", image: unsplash(IMG.car), category: "auto", price: 22.9, originalPrice: 49, rating: 4.6, reviews: 733, sold: 1560, stock: 85, location: "overseas", badge: "freeship", keywords: "dash cam car camera automotive" },
  { id: "p24", title: "Imported Chocolate Bar Variety Box (24 pcs)", image: unsplash(IMG.chocolate), category: "groceries", price: 11.9, originalPrice: 18, rating: 4.9, reviews: 1867, sold: 4500, stock: 260, location: "pp", badge: "mall", keywords: "chocolate snacks sweets candy" },
];

export const productById = (id: string) => products.find((p) => p.id === id);

export interface CategoryDef {
  id: CategoryId;
  sub: { title: string; items: string[] }[];
}

export const categories: CategoryDef[] = [
  { id: "electronics", sub: [
    { title: "Mobiles & Tablets", items: ["Smartphones", "Phone Cases", "Power Banks", "Chargers & Cables"] },
    { title: "Audio", items: ["Wireless Earbuds", "Headphones", "Bluetooth Speakers", "Soundbars"] },
    { title: "Cameras & Wearables", items: ["Instant Cameras", "Action Cams", "Smart Watches", "Fitness Trackers"] },
  ] },
  { id: "beauty", sub: [
    { title: "Skincare", items: ["Serums", "Sunscreen", "Moisturizers", "Cleansers"] },
    { title: "Makeup", items: ["Lipstick", "Foundation", "Eyeshadow", "Brushes"] },
    { title: "Fragrance & Bath", items: ["Perfume", "Body Wash", "Body Lotion"] },
  ] },
  { id: "home", sub: [
    { title: "Furniture", items: ["Armchairs", "Sofas", "Desks", "Storage"] },
    { title: "Kitchen & Dining", items: ["Mugs & Cups", "Cookware", "Air Fryers", "Tumblers"] },
    { title: "Bedding", items: ["Bedsheets", "Pillows", "Blankets"] },
  ] },
  { id: "men", sub: [
    { title: "Clothing", items: ["T-Shirts", "Shirts", "Jeans", "Shorts"] },
    { title: "Shoes", items: ["Sneakers", "Running Shoes", "Sandals"] },
    { title: "Accessories", items: ["Watches", "Sunglasses", "Wallets", "Belts"] },
  ] },
  { id: "women", sub: [
    { title: "Clothing", items: ["Dresses", "Tops", "Skirts", "Jeans"] },
    { title: "Bags", items: ["Crossbody Bags", "Totes", "Backpacks", "Wallets"] },
    { title: "Shoes", items: ["Sneakers", "Heels", "Flats"] },
  ] },
  { id: "sports", sub: [
    { title: "Fitness", items: ["Yoga Mats", "Dumbbells", "Resistance Bands"] },
    { title: "Outdoor", items: ["Camping", "Cycling", "Hiking Bags"] },
    { title: "Sportswear", items: ["Running Shoes", "Jerseys", "Shorts"] },
  ] },
  { id: "auto", sub: [
    { title: "Car Electronics", items: ["Dash Cams", "Phone Holders", "Car Chargers"] },
    { title: "Care & Cleaning", items: ["Car Wash", "Wax & Polish", "Air Fresheners"] },
    { title: "Motorbike", items: ["Helmets", "Rain Covers", "Locks"] },
  ] },
  { id: "groceries", sub: [
    { title: "Snacks", items: ["Chocolate", "Chips", "Biscuits"] },
    { title: "Beverages", items: ["Coffee", "Tea", "Juices"] },
    { title: "Local Specialties", items: ["Kampot Pepper", "Palm Sugar", "Dried Fish"] },
  ] },
];

/** 2 x 8 category tiles. Each sets a search query (or a category) on the feed. */
export const categoryTiles: { key: TileKey; image: string; query?: string; category?: CategoryId }[] = [
  { key: "tile.phones", image: unsplash(IMG.smartphone, 160), query: "phone" },
  { key: "tile.laptop", image: unsplash(IMG.laptop, 160), query: "laptop" },
  { key: "tile.audio", image: unsplash(IMG.headphones, 160), query: "audio" },
  { key: "tile.watches", image: unsplash(IMG.watch, 160), query: "watch" },
  { key: "tile.cameras", image: unsplash(IMG.camera, 160), query: "camera" },
  { key: "tile.skincare", image: unsplash(IMG.skincare, 160), query: "skincare" },
  { key: "tile.makeup", image: unsplash(IMG.lipstick, 160), query: "makeup" },
  { key: "tile.fragrance", image: unsplash(IMG.perfume, 160), query: "perfume" },
  { key: "tile.furniture", image: unsplash(IMG.armchair, 160), query: "furniture" },
  { key: "tile.kitchen", image: unsplash(IMG.mug, 160), query: "kitchen" },
  { key: "tile.menShoes", image: unsplash(IMG.runningRed, 160), query: "running" },
  { key: "tile.bags", image: unsplash(IMG.bag, 160), query: "bag" },
  { key: "tile.dresses", image: unsplash(IMG.dress, 160), query: "dress" },
  { key: "tile.fitness", image: unsplash(IMG.dumbbell, 160), query: "fitness" },
  { key: "tile.car", image: unsplash(IMG.car, 160), category: "auto" },
  { key: "tile.snacks", image: unsplash(IMG.chocolate, 160), query: "chocolate" },
];

export type TileKey =
  | "tile.phones" | "tile.laptop" | "tile.audio" | "tile.watches" | "tile.cameras" | "tile.skincare"
  | "tile.makeup" | "tile.fragrance" | "tile.furniture" | "tile.kitchen" | "tile.menShoes" | "tile.bags"
  | "tile.dresses" | "tile.fitness" | "tile.car" | "tile.snacks";

export const trendingSearches = ["Wireless Earbuds", "Skincare", "Smart Watch", "Phone Case", "Sneakers", "Instant Camera"];

export const heroImages = {
  sale: [unsplash(IMG.earbuds, 240), unsplash(IMG.smartwatch, 240), unsplash(IMG.speaker, 240)],
  mall: [unsplash(IMG.perfume, 240), unsplash(IMG.watch, 240), unsplash(IMG.bag, 240)],
};

/** Matches when every query word appears in title, keywords or category id. */
export function matchesQuery(p: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = `${p.title} ${p.keywords} ${p.category}`.toLowerCase();
  return q.split(/\s+/).every((w) => hay.includes(w.replace(/s$/, "")));
}
