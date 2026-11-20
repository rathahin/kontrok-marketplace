// Catalog modeled on Lazada's information architecture (12 top-level
// categories, "Brand + product + spec (variants)" listing titles, official
// Mall stores vs. marketplace sellers). All brands/stores are fictional
// Kontrok examples; photos are Unsplash (each id verified to show the item).

export type CategoryId =
  | "devices" | "accessories" | "appliances" | "beauty" | "babies" | "groceries"
  | "home" | "women" | "men" | "watches" | "sports" | "auto";
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
  brand: string;
  store: string;
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
  /** label for the `sizes` selector (default "size") */
  sizeLabel?: "size" | "model";
  warranty?: "local";
  highlights: string[];
  /** extra search terms (lowercase) */
  keywords: string;
}

/** Unsplash photo, square crop. `zoom` > 1 makes a detail crop around (fx, fy). */
export const unsplash = (id: string, w = 400, zoom?: { z: number; x: number; y: number }) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&fit=crop&auto=format&q=70` +
  (zoom ? `&crop=focalpoint&fp-z=${zoom.z}&fp-x=${zoom.x}&fp-y=${zoom.y}` : "");

export const IMG = {
  smartphone: "1511707171634-5f897ff02aa9",
  laptop: "1496181133206-80ce9b88a853",
  camera: "1452780212940-6f5c0d14d848",
  smartwatch: "1579586337278-3befd40fd17a",
  earbuds: "1590658268037-6bf12165a8df",
  charger: "1583863788434-e58a36330cf0",
  phone: "1601784551446-20c9e07cdbdb",
  keyboard: "1587829741301-dc798b83add3",
  headphones: "1505740420928-5e560c06d30e",
  speaker: "1545454675-3531b543be5d",
  lotion: "1631729371254-42c2892f0e6e",
  serum: "1617897903246-719242758050",
  cleanser: "1611930022073-b7a4ba5fcccd",
  lipstick: "1625093742435-6fa192b6fb10",
  perfume: "1615634260167-c8cdede054de",
  toys: "1558060370-d644479cb6f7",
  chocolate: "1606312619070-d48b4c652a52",
  pet: "1583337130417-3346a1be7dee",
  mug: "1514228742587-6b1558fcca3d",
  armchair: "1586023492125-27b2c045efd7",
  bedding: "1505693416388-ac5ce068fe85",
  lamp: "1507473885765-e6ed057f782c",
  dress: "1595777457583-95e059d581b8",
  whiteSneakers: "1626379616459-b2ce1d9decbc",
  tshirt: "1521572163474-6864f9cf17ab",
  runningShoe: "1491553895911-0055eca6402d",
  watch: "1523275335684-37898b6baf30",
  bag: "1584917865442-de89df76afd3",
  backpack: "1553062407-98eeb64c6a62",
  sunglasses: "1572635196237-14b3f281503f",
  yogaMat: "1601925260368-ae2f83cf8b7f",
  dumbbell: "1638536532686-d610adfc8e5c",
  trainingShoes: "1608667508764-33cf0726b13a",
  car: "1492144534655-ae79c964c9d7",
} as const;
type ImgKey = keyof typeof IMG;

const BLACK: Swatch = { name: "Black", hex: "#1F2937" };
const WHITE: Swatch = { name: "White", hex: "#F9FAFB" };
const sw = (name: string, hex: string): Swatch => ({ name, hex });

type Seed = Omit<Product, "image"> & { img: ImgKey };
const seed: Seed[] = [
  // ── Electronic Devices
  { id: "p1", img: "smartphone", category: "devices", brand: "Kontrok", store: "Kontrok Official Store", title: 'Kontrok K12 Pro Smartphone 6.7" AMOLED 8GB+256GB 5000mAh 50MP Camera Dual SIM', price: 189, originalPrice: 259, rating: 4.8, reviews: 1840, sold: 3200, stock: 120, location: "pp", badge: "mall", warranty: "local", colors: [sw("Graphite", "#374151"), sw("Silver", "#D1D5DB"), sw("Ocean Blue", "#1D4ED8")], highlights: ['6.7" 120Hz AMOLED display', "8GB RAM + 256GB storage", "50MP main camera with night mode", "5000mAh battery, 33W fast charging"], keywords: "smartphone phone mobile android" },
  { id: "p2", img: "laptop", category: "devices", brand: "AeroBook", store: "AeroBook Official Store", title: 'AeroBook Slim 14" Laptop Intel Core i5 16GB RAM 512GB SSD Full HD IPS Windows 11 (Silver)', price: 449, originalPrice: 599, rating: 4.7, reviews: 412, sold: 680, stock: 30, location: "pp", badge: "mall", warranty: "local", highlights: ["Intel Core i5, 16GB RAM", "512GB NVMe SSD", '14" Full HD IPS, 1.3kg aluminium body', "Windows 11 Home pre-installed"], keywords: "laptop notebook computer" },
  { id: "p3", img: "camera", category: "devices", brand: "SnapLab", store: "Gadget Corner PP", title: "SnapLab M10 Mirrorless Camera 24MP 4K Video with 15-45mm Kit Lens Wi-Fi Vlogging Camera", price: 389, originalPrice: 549, rating: 4.7, reviews: 612, sold: 980, stock: 45, location: "overseas", badge: "freeship", colors: [BLACK, sw("Silver", "#D1D5DB")], highlights: ["24MP APS-C sensor", "4K 30fps video, flip-up screen", "15-45mm stabilised kit lens", "Wi-Fi + Bluetooth photo transfer"], keywords: "camera mirrorless digital photo vlog" },
  { id: "p4", img: "smartwatch", category: "devices", brand: "Kontrok", store: "Kontrok Official Store", title: 'Smart Watch 1.96" AMOLED Bluetooth Call Heart Rate SpO2 Sleep Monitor IP68 Waterproof', price: 24.5, originalPrice: 59, rating: 4.6, reviews: 1530, sold: 3890, stock: 210, location: "pp", badge: "freeship", colors: [sw("Midnight", "#111827"), sw("Silver", "#D1D5DB"), sw("Pink", "#F9A8D4")], highlights: ['1.96" AMOLED always-on display', "Bluetooth calling from your wrist", "Heart rate, SpO2 and sleep tracking", "IP68 water resistant, 7-day battery"], keywords: "smart watch smartwatch fitness tracker wearable" },
  // ── Electronic Accessories
  { id: "p5", img: "earbuds", category: "accessories", brand: "Kontrok", store: "Kontrok Official Store", title: "Kontrok Buds Pro ANC TWS Wireless Earbuds Bluetooth 5.3 40H Playtime Earphone (Black / White)", price: 18.9, originalPrice: 39, rating: 4.8, reviews: 2314, sold: 5120, stock: 380, location: "pp", badge: "mall", colors: [BLACK, WHITE], highlights: ["Active noise cancellation up to 35dB", "40 hours total with charging case", "Bluetooth 5.3 low-latency game mode", "IPX5 sweat resistant"], keywords: "wireless earbuds headphones bluetooth audio" },
  { id: "p6", img: "charger", category: "accessories", brand: "VoltMax", store: "VoltMax Official Store", title: "VoltMax 65W GaN Fast Charger USB-C PD 3.0 + QC 4.0 Wall Adapter for Laptop iPhone Samsung", price: 9.9, originalPrice: 19.9, rating: 4.9, reviews: 3012, sold: 8800, stock: 640, location: "pp", badge: "mall", warranty: "local", highlights: ["65W total output, 3 ports", "GaN tech: 40% smaller than standard chargers", "Charges a MacBook Air to 50% in 30 min", "Over-heat and over-current protection"], keywords: "charger usb-c adapter laptop accessories" },
  { id: "p7", img: "phone", category: "accessories", brand: "No Brand", store: "CaseLab KH", title: "Slim Shockproof Phone Case + 9H Tempered Glass Screen Protector for iPhone 15 / 16 Series", price: 2.9, originalPrice: 7.5, rating: 4.8, reviews: 5402, sold: 12040, stock: 1500, location: "pp", badge: "freeship", colors: [sw("Clear", "#E5E7EB"), BLACK, sw("Navy", "#1E3A8A")], sizes: ["iPhone 15", "iPhone 15 Pro", "iPhone 16", "iPhone 16 Pro Max"], sizeLabel: "model", highlights: ["Military-grade drop protection", "Raised edges protect camera and screen", "9H tempered glass included", "MagSafe compatible"], keywords: "phone case iphone samsung screen protector smartphone" },
  { id: "p8", img: "keyboard", category: "accessories", brand: "KeyFlow", store: "Gadget Corner PP", title: "KeyFlow Wireless Bluetooth Keyboard Ultra-Slim Rechargeable for Mac / iPad / Windows (White)", price: 15.9, originalPrice: 32, rating: 4.7, reviews: 588, sold: 1340, stock: 160, location: "sr", highlights: ["Pairs with up to 3 devices", "Rechargeable, 3 months per charge", "Scissor-switch quiet keys", "Works with macOS, iPadOS, Windows"], keywords: "keyboard computer accessories bluetooth" },
  { id: "p9", img: "headphones", category: "accessories", brand: "SoundWave", store: "SoundWave KH Official", title: "SoundWave Over-Ear Wireless Headphones Bluetooth 5.3 60H Playtime Deep Bass Foldable with Mic", price: 22.9, originalPrice: 49, rating: 4.7, reviews: 966, sold: 2410, stock: 190, location: "pp", badge: "mall", colors: [BLACK, sw("Beige", "#E7D9C4")], highlights: ["60 hours of playtime", "40mm drivers with deep bass mode", "Foldable with memory-foam cushions", "Built-in mic for calls"], keywords: "headphones headphone audio bluetooth" },
  // ── TV & Home Appliances
  { id: "p10", img: "speaker", category: "appliances", brand: "SoundWave", store: "SoundWave KH Official", title: "SoundWave Active Bookshelf Speakers 2.0 Bluetooth 5.3 60W Wooden Studio Monitors (Pair)", price: 15.9, originalPrice: 29, rating: 4.7, reviews: 941, sold: 2130, stock: 120, location: "sr", badge: "mall", colors: [BLACK, sw("Walnut", "#7C4A2D")], highlights: ["60W RMS stereo pair", "4\" woofer + silk-dome tweeter", "Bluetooth 5.3, optical and RCA inputs", "Remote control included"], keywords: "speaker bluetooth audio music home audio" },
  // ── Health & Beauty
  { id: "p11", img: "lotion", category: "beauty", brand: "Mekong Beauty", store: "Mekong Beauty Official", title: "Mekong Beauty Brightening Body Emulsion 200ml Niacinamide + Ceramide Moisturizer", price: 6.5, originalPrice: 14, rating: 4.9, reviews: 4120, sold: 9800, stock: 900, location: "pp", badge: "mall", highlights: ["5% niacinamide evens skin tone", "Ceramides restore the skin barrier", "Light, non-sticky texture", "Dermatologically tested"], keywords: "skincare lotion moisturizer body" },
  { id: "p12", img: "serum", category: "beauty", brand: "Mekong Beauty", store: "Mekong Beauty Official", title: "Mekong Beauty Vitamin C Brightening Face Serum 30ml 15% Ascorbic Acid + Hyaluronic Acid", price: 5.9, originalPrice: 11, rating: 4.8, reviews: 2876, sold: 7400, stock: 520, location: "pp", badge: "mall", highlights: ["15% stabilised vitamin C", "Hyaluronic acid for hydration", "Fades dark spots in 4 weeks", "Dropper bottle, 30ml"], keywords: "skincare serum vitamin c face" },
  { id: "p13", img: "cleanser", category: "beauty", brand: "Mekong Beauty", store: "Mekong Beauty Official", title: "Mekong Beauty Gentle Foaming Cleanser 150ml pH 5.5 Daily Face Wash for Sensitive Skin", price: 4.5, originalPrice: 8.9, rating: 4.8, reviews: 1930, sold: 5200, stock: 610, location: "pp", badge: "mall", highlights: ["Low pH 5.5 formula", "Removes sunscreen and light makeup", "Fragrance-free", "150ml lasts ~3 months"], keywords: "skincare cleanser face wash" },
  { id: "p14", img: "lipstick", category: "beauty", brand: "Rumdoul Cosmetics", store: "Beauty Box BTB", title: "Rumdoul Matte Velvet Lipstick Long-Lasting Transfer-Proof Lip Color (Nude / Ruby / Coral)", price: 3.5, originalPrice: 8, rating: 4.6, reviews: 1203, sold: 4300, stock: 300, location: "btb", badge: "freeship", colors: [sw("Nude", "#D6A38F"), sw("Ruby", "#9F1239"), sw("Coral", "#F87171")], highlights: ["Up to 12 hours wear", "Transfer-proof matte finish", "Enriched with vitamin E", "Cruelty-free"], keywords: "makeup lipstick lip cosmetics" },
  { id: "p15", img: "perfume", category: "beauty", brand: "Maison Lumière", store: "Global Beauty Direct", title: "Maison Lumière Eau de Parfum Floral Musk 50ml Long-Lasting Fragrance for Women", price: 12.9, originalPrice: 32, rating: 4.7, reviews: 655, sold: 1100, stock: 75, location: "overseas", badge: "mall", highlights: ["Top notes: pear and bergamot", "Heart: jasmine and rose", "Base: white musk and amber", "Lasts 6–8 hours"], keywords: "perfume fragrance scent" },
  // ── Babies & Toys
  { id: "p16", img: "toys", category: "babies", brand: "PlayCo", store: "Toy Town Phnom Penh", title: "PlayCo Retro Robot & Mini Cars Collection Toy Set (12 pcs) Educational Gift for Kids 3+", price: 8.9, originalPrice: 16, rating: 4.8, reviews: 734, sold: 1820, stock: 140, location: "pp", badge: "freeship", highlights: ["12 pieces: robots and die-cast cars", "Non-toxic, child-safe paints", "Great birthday gift for ages 3+", "Storage box included"], keywords: "toys kids robot car gift" },
  // ── Groceries & Pets
  { id: "p17", img: "chocolate", category: "groceries", brand: "SweetHouse", store: "Kampot Gourmet Official", title: "Kampot Gourmet Dark Chocolate Bars 70% Cacao with Kampot Pepper (6 x 80g) Gift Pack", price: 11.9, originalPrice: 18, rating: 4.9, reviews: 1867, sold: 4500, stock: 260, location: "pp", badge: "mall", highlights: ["70% single-origin cacao", "Infused with Kampot pepper", "Best before: 8 months", "Gift-ready box of 6"], keywords: "chocolate snacks sweets candy" },
  { id: "p18", img: "pet", category: "groceries", brand: "PawPal", store: "PawPal Pet Shop", title: "PawPal Pet Hoodie for Small Dogs & Cats Soft Cotton Sweatshirt (S / M / L)", price: 4.2, originalPrice: 9, rating: 4.8, reviews: 1104, sold: 3300, stock: 420, location: "pp", badge: "freeship", colors: [sw("Mustard", "#EAB308"), sw("Grey", "#9CA3AF")], sizes: ["S", "M", "L"], highlights: ["Soft breathable cotton", "Easy pull-on design", "Machine washable", "Fits French bulldogs, corgis and cats"], keywords: "pet dog cat clothes hoodie" },
  // ── Home & Lifestyle
  { id: "p19", img: "mug", category: "home", brand: "Angkor Living", store: "Angkor Living Official", title: "Angkor Living Minimalist Ceramic Coffee Mug 350ml Matte Glaze Microwave Safe (White / Sand / Sage)", price: 3.2, originalPrice: 6.5, rating: 4.8, reviews: 2210, sold: 6100, stock: 800, location: "pp", badge: "mall", colors: [WHITE, sw("Sand", "#E7D9C4"), sw("Sage", "#A3B18A")], highlights: ["350ml stoneware", "Microwave and dishwasher safe", "Matte glaze, comfortable handle", "Packed in protective box"], keywords: "mug cup kitchen coffee dining" },
  { id: "p20", img: "armchair", category: "home", brand: "Angkor Living", store: "Angkor Living Official", title: "Angkor Living Velvet Accent Armchair Mid-Century Modern Wooden Legs Living Room Chair", price: 89, originalPrice: 159, rating: 4.7, reviews: 318, sold: 420, stock: 18, location: "pp", badge: "mall", warranty: "local", colors: [sw("Mustard", "#D4A017"), sw("Emerald", "#047857"), sw("Grey", "#6B7280")], highlights: ["Soft velvet upholstery", "Solid rubberwood legs", "Supports up to 150kg", "Free assembly in Phnom Penh"], keywords: "furniture chair sofa armchair living room" },
  { id: "p21", img: "bedding", category: "home", brand: "Angkor Living", store: "Angkor Living Official", title: "Angkor Living 100% Cotton Bedsheet Set Queen Size 4-Piece Fitted Sheet + Pillowcases", price: 16.9, originalPrice: 35, rating: 4.6, reviews: 512, sold: 980, stock: 140, location: "pp", badge: "mall", colors: [WHITE, sw("Grey", "#9CA3AF"), sw("Blush", "#FBCFE8")], highlights: ["100% long-staple cotton, 300TC", "Fitted sheet fits mattresses up to 30cm", "Includes 2 pillowcases", "Gets softer with every wash"], keywords: "bedding bedsheet bed sheets" },
  { id: "p22", img: "lamp", category: "home", brand: "Lumio", store: "Home Deco Siem Reap", title: "Lumio Nordic LED Floor Lamp Adjustable Head Matte Grey Reading Lamp with E27 Bulb", price: 27.5, originalPrice: 49, rating: 4.7, reviews: 286, sold: 610, stock: 55, location: "sr", highlights: ["Adjustable metal shade", "Includes warm-white 9W LED bulb", "Foot switch", "155cm tall"], keywords: "lamp lighting floor light home" },
  // ── Women's Fashion
  { id: "p23", img: "dress", category: "women", brand: "Rumdoul Studio", store: "Rumdoul Studio Official", title: "Rumdoul Studio Women's Satin Maxi Evening Dress Flowy A-Line Sleeveless Party Gown", price: 18.9, originalPrice: 42, rating: 4.7, reviews: 1980, sold: 4700, stock: 310, location: "pp", badge: "mall", colors: [sw("Red", "#DC2626"), sw("Champagne", "#F3E5AB"), BLACK], sizes: ["S", "M", "L", "XL"], highlights: ["Silky satin with lining", "Flowy A-line silhouette", "Hidden back zipper", "Designed in Phnom Penh"], keywords: "dress gown evening women" },
  { id: "p24", img: "whiteSneakers", category: "women", brand: "No Brand", store: "Siem Reap Style", title: "Women's Classic White Platform Sneakers Casual Lace-Up Canvas Shoes", price: 14.9, originalPrice: 32, rating: 4.7, reviews: 2210, sold: 5300, stock: 380, location: "sr", badge: "freeship", sizes: ["36", "37", "38", "39", "40"], highlights: ["4cm platform sole", "Breathable canvas upper", "Cushioned insole", "True to size"], keywords: "sneakers shoes white women" },
  // ── Men's Fashion
  { id: "p25", img: "tshirt", category: "men", brand: "Tonle Basics", store: "Tonle Basics", title: "Tonle Basics Men's Oversized Cotton T-Shirt Basic Crew Neck Short Sleeve Tee (S-XXL)", price: 4.9, originalPrice: 9.9, rating: 4.7, reviews: 3340, sold: 10200, stock: 2000, location: "pp", badge: "freeship", colors: [WHITE, BLACK, sw("Olive", "#556B2F")], sizes: ["S", "M", "L", "XL", "XXL"], highlights: ["220gsm heavyweight cotton", "Relaxed oversized fit", "Pre-shrunk, colorfast", "Made in Cambodia"], keywords: "t-shirt tshirt shirt tee clothing men" },
  { id: "p26", img: "runningShoe", category: "men", brand: "Stride", store: "Global Sports Direct", title: "Stride Men's Running Shoes Lightweight Breathable Mesh Sports Sneakers", price: 19.9, originalPrice: 45, rating: 4.6, reviews: 1408, sold: 3600, stock: 260, location: "overseas", colors: [BLACK, sw("Olive", "#4D5B3A")], sizes: ["39", "40", "41", "42", "43", "44"], highlights: ["Engineered mesh upper", "EVA foam midsole", "Rubber outsole with grip pattern", "Only 260g per shoe"], keywords: "sneakers shoes running men sports" },
  // ── Watches, Bags & Jewelry
  { id: "p27", img: "watch", category: "watches", brand: "Heritage", store: "Time House Official", title: "Heritage Men's Minimalist Leather Watch Quartz Analog 3ATM Water Resistant (Brown / Black)", price: 21, originalPrice: 48, rating: 4.8, reviews: 622, sold: 1300, stock: 90, location: "pp", badge: "mall", warranty: "local", colors: [sw("Brown", "#92400E"), BLACK], highlights: ["Japanese quartz movement", "Genuine leather strap", "40mm stainless steel case", "3ATM water resistant"], keywords: "watch leather men" },
  { id: "p28", img: "bag", category: "watches", brand: "Rumdoul Studio", store: "Rumdoul Studio Official", title: "Rumdoul Studio Women's Crossbody Shoulder Bag Vegan Leather Mini Handbag (Tan / Black / Cream)", price: 9.5, originalPrice: 22, rating: 4.8, reviews: 2654, sold: 6900, stock: 410, location: "pp", badge: "mall", colors: [sw("Tan", "#D2B48C"), BLACK, sw("Cream", "#FFFDD0")], highlights: ["Vegan leather, water resistant", "Adjustable crossbody strap", "Fits phone, wallet and keys", "Gold-tone hardware"], keywords: "bag handbag purse crossbody women" },
  { id: "p29", img: "backpack", category: "watches", brand: "Urban Trek", store: "Urban Trek KH", title: 'Urban Trek Water-Resistant Laptop Backpack 15.6" with USB Charging Port Anti-Theft (Navy)', price: 13.9, originalPrice: 29, rating: 4.8, reviews: 1477, sold: 3700, stock: 330, location: "pp", badge: "freeship", highlights: ['Padded sleeve fits 15.6" laptops', "Hidden anti-theft back pocket", "USB charging port", "Water-resistant fabric"], keywords: "backpack bag laptop travel" },
  { id: "p30", img: "sunglasses", category: "watches", brand: "No Brand", store: "Global Style Direct", title: "Polarized Sunglasses UV400 Unisex Retro Square Frame (Black / Tortoise)", price: 5.5, originalPrice: 15, rating: 4.5, reviews: 980, sold: 3100, stock: 500, location: "overseas", badge: "freeship", colors: [BLACK, sw("Tortoise", "#8B5A2B")], highlights: ["Polarized lenses cut glare", "UV400 protection", "Lightweight frame", "Case and cloth included"], keywords: "sunglasses glasses eyewear" },
  // ── Sports & Outdoor
  { id: "p31", img: "yogaMat", category: "sports", brand: "Tonle Active", store: "Tonle Active Official", title: "Tonle Active Yoga Mat 6mm Non-Slip TPE Exercise Mat with Carry Strap (Teal / Purple / Black)", price: 8.9, originalPrice: 18, rating: 4.8, reviews: 1310, sold: 2800, stock: 220, location: "pp", badge: "mall", colors: [sw("Teal", "#0D9488"), sw("Purple", "#7C3AED"), BLACK], highlights: ["6mm cushioning", "Double-sided non-slip texture", "Eco TPE, no latex", "183 × 61cm"], keywords: "yoga mat fitness exercise" },
  { id: "p32", img: "dumbbell", category: "sports", brand: "Tonle Active", store: "Tonle Active Official", title: "Tonle Active Adjustable Dumbbell Set 20kg with Storage Case Home Gym Weights", price: 34, originalPrice: 65, rating: 4.7, reviews: 402, sold: 760, stock: 40, location: "pp", badge: "mall", highlights: ["Adjusts from 2.5kg to 10kg per hand", "Anti-slip knurled handles", "Converts to a barbell", "Storage case included"], keywords: "dumbbell weights gym fitness" },
  { id: "p33", img: "trainingShoes", category: "sports", brand: "Stride", store: "Global Sports Direct", title: "Stride Cross-Training Gym Shoes Cushioned Lightweight Sports Sneakers (Blush)", price: 24.9, originalPrice: 55, rating: 4.6, reviews: 655, sold: 1490, stock: 120, location: "overseas", badge: "freeship", sizes: ["39", "40", "41", "42", "43", "44"], highlights: ["Stable heel for lifting", "Flexible forefoot for HIIT", "Breathable upper", "Non-marking outsole"], keywords: "sneakers shoes training gym fitness sports" },
  // ── Automotive & Motorcycles
  { id: "p34", img: "car", category: "auto", brand: "RoadEye", store: "Auto Pro Cambodia", title: "RoadEye Car Dash Cam 1080P Front Camera Night Vision G-Sensor Loop Recording + 32GB Card", price: 22.9, originalPrice: 49, rating: 4.6, reviews: 733, sold: 1560, stock: 85, location: "overseas", badge: "freeship", warranty: "local", highlights: ["1080P with 170° wide angle", "Night vision and WDR", "Auto-saves clips on impact", "32GB microSD card included"], keywords: "dash cam car camera automotive" },
];

export const products: Product[] = seed.map(({ img, ...p }) => ({ ...p, image: unsplash(IMG[img]) }));
const imageKey = Object.fromEntries(seed.map((s) => [s.id, s.img])) as Record<string, ImgKey>;

export const productById = (id: string) => products.find((p) => p.id === id);

/** Gallery for the product page: full shot + three detail crops of the same photo. */
export function galleryFor(p: Product): string[] {
  const id = IMG[imageKey[p.id]];
  return [
    unsplash(id, 800),
    unsplash(id, 800, { z: 1.8, x: 0.35, y: 0.4 }),
    unsplash(id, 800, { z: 1.8, x: 0.65, y: 0.55 }),
    unsplash(id, 800, { z: 2.4, x: 0.5, y: 0.5 }),
  ];
}

export interface CategoryDef {
  id: CategoryId;
  sub: { title: string; items: string[] }[];
}

export const categories: CategoryDef[] = [
  { id: "devices", sub: [
    { title: "Mobiles", items: ["Smartphones", "Feature Phones", "Refurbished Phones"] },
    { title: "Computers & Laptops", items: ["Laptops", "Desktops", "Monitors"] },
    { title: "Cameras & Wearables", items: ["Mirrorless Cameras", "Action Cams", "Smart Watches"] },
  ] },
  { id: "accessories", sub: [
    { title: "Mobile Accessories", items: ["Phone Cases", "Screen Protectors", "Chargers", "Power Banks"] },
    { title: "Audio", items: ["Wireless Earbuds", "Headphones", "Earphones"] },
    { title: "Computer Accessories", items: ["Keyboards", "Mice", "USB Hubs"] },
  ] },
  { id: "appliances", sub: [
    { title: "Home Audio", items: ["Bluetooth Speakers", "Soundbars", "Party Speakers"] },
    { title: "Kitchen Appliances", items: ["Air Fryers", "Blenders", "Rice Cookers"] },
    { title: "Cooling & Air", items: ["Fans", "Air Purifiers", "Dehumidifiers"] },
  ] },
  { id: "beauty", sub: [
    { title: "Skincare", items: ["Cleansers", "Sunscreen", "Moisturizers", "Serums"] },
    { title: "Makeup", items: ["Lipstick", "Foundation", "Eyeshadow"] },
    { title: "Fragrances", items: ["Perfume for Women", "Perfume for Men", "Body Mist"] },
  ] },
  { id: "babies", sub: [
    { title: "Toys & Games", items: ["Robot Toys", "Die-Cast Cars", "Building Blocks"] },
    { title: "Baby Gear", items: ["Strollers", "Carriers", "High Chairs"] },
    { title: "Diapering", items: ["Diapers", "Wipes", "Changing Mats"] },
  ] },
  { id: "groceries", sub: [
    { title: "Snacks & Sweets", items: ["Chocolate", "Chips", "Biscuits"] },
    { title: "Pet Supplies", items: ["Pet Clothing", "Pet Food", "Pet Toys"] },
    { title: "Local Specialties", items: ["Kampot Pepper", "Palm Sugar", "Coffee Beans"] },
  ] },
  { id: "home", sub: [
    { title: "Furniture", items: ["Armchairs", "Sofas", "Desks"] },
    { title: "Kitchen & Dining", items: ["Mugs & Cups", "Cookware", "Tumblers"] },
    { title: "Bedding & Lighting", items: ["Bedsheets", "Pillows", "Floor Lamps"] },
  ] },
  { id: "women", sub: [
    { title: "Clothing", items: ["Dresses", "Tops", "Skirts"] },
    { title: "Shoes", items: ["Sneakers", "Heels", "Flats"] },
    { title: "Accessories", items: ["Hair Accessories", "Scarves", "Belts"] },
  ] },
  { id: "men", sub: [
    { title: "Clothing", items: ["T-Shirts", "Shirts", "Jeans"] },
    { title: "Shoes", items: ["Running Shoes", "Sneakers", "Sandals"] },
    { title: "Accessories", items: ["Wallets", "Belts", "Caps"] },
  ] },
  { id: "watches", sub: [
    { title: "Watches", items: ["Men's Watches", "Women's Watches", "Smart Watches"] },
    { title: "Bags", items: ["Crossbody Bags", "Backpacks", "Totes"] },
    { title: "Eyewear & Jewelry", items: ["Sunglasses", "Necklaces", "Rings"] },
  ] },
  { id: "sports", sub: [
    { title: "Exercise & Fitness", items: ["Yoga Mats", "Dumbbells", "Resistance Bands"] },
    { title: "Sports Shoes", items: ["Running Shoes", "Training Shoes", "Badminton Shoes"] },
    { title: "Outdoor", items: ["Camping", "Cycling", "Hiking"] },
  ] },
  { id: "auto", sub: [
    { title: "Car Electronics", items: ["Dash Cams", "Phone Holders", "Car Chargers"] },
    { title: "Car Care", items: ["Car Wash", "Wax & Polish", "Air Fresheners"] },
    { title: "Motorcycle", items: ["Helmets", "Rain Covers", "Locks"] },
  ] },
];

export type TileKey =
  | "tile.phones" | "tile.laptops" | "tile.headphones" | "tile.smartwatches" | "tile.cameras" | "tile.skincare"
  | "tile.makeup" | "tile.fragrance" | "tile.toys" | "tile.pets" | "tile.furniture" | "tile.lighting"
  | "tile.dresses" | "tile.backpacks" | "tile.fitness" | "tile.carElectronics";

/** 2 x 8 category tiles. Each sets a search query (or a category) on the feed. */
export const categoryTiles: { key: TileKey; img: ImgKey; query?: string; category?: CategoryId }[] = [
  { key: "tile.phones", img: "smartphone", query: "smartphone" },
  { key: "tile.laptops", img: "laptop", query: "laptop" },
  { key: "tile.headphones", img: "headphones", query: "headphones" },
  { key: "tile.smartwatches", img: "smartwatch", query: "smartwatch" },
  { key: "tile.cameras", img: "camera", query: "camera" },
  { key: "tile.skincare", img: "cleanser", query: "skincare" },
  { key: "tile.makeup", img: "lipstick", query: "makeup" },
  { key: "tile.fragrance", img: "perfume", query: "perfume" },
  { key: "tile.toys", img: "toys", category: "babies" },
  { key: "tile.pets", img: "pet", query: "pet" },
  { key: "tile.furniture", img: "armchair", query: "furniture" },
  { key: "tile.lighting", img: "lamp", query: "lighting" },
  { key: "tile.dresses", img: "dress", query: "dress" },
  { key: "tile.backpacks", img: "backpack", query: "backpack" },
  { key: "tile.fitness", img: "dumbbell", query: "fitness" },
  { key: "tile.carElectronics", img: "car", category: "auto" },
];
export const tileImage = (k: ImgKey) => unsplash(IMG[k], 160);

/** Official brand stores for the Kontrok Mall section. */
export const mallStores: { name: string; tagline: string; img: ImgKey }[] = [
  { name: "Angkor Living", tagline: "Homes made warmer", img: "armchair" },
  { name: "Mekong Beauty", tagline: "Clean Khmer skincare", img: "cleanser" },
  { name: "SoundWave", tagline: "Hear every beat", img: "headphones" },
  { name: "Rumdoul Studio", tagline: "Designed in Phnom Penh", img: "dress" },
  { name: "Tonle Active", tagline: "Move more every day", img: "dumbbell" },
  { name: "Kampot Gourmet", tagline: "Taste of Cambodia", img: "chocolate" },
];
export const mallImage = (k: ImgKey) => unsplash(IMG[k], 320);

export const trendingSearches = ["Wireless Earbuds", "Skincare", "Smart Watch", "Phone Case", "Sneakers", "Mirrorless Camera"];

export const heroImages = {
  sale: [unsplash(IMG.earbuds, 240), unsplash(IMG.smartwatch, 240), unsplash(IMG.speaker, 240)],
  mall: [unsplash(IMG.perfume, 240), unsplash(IMG.watch, 240), unsplash(IMG.bag, 240)],
};
export const serviceImages = {
  mall: unsplash(IMG.runningShoe, 160),
  brands: unsplash(IMG.bag, 160),
  blog: unsplash(IMG.headphones, 160),
};

/** Matches when every query word appears in title, keywords, brand, store or category. */
export function matchesQuery(p: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = `${p.title} ${p.keywords} ${p.category} ${p.brand} ${p.store}`.toLowerCase();
  return q.split(/\s+/).every((w) => hay.includes(w.replace(/s$/, "")));
}

// ── Reviews & seller stats (deterministic per product, so SSR and client agree)

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return Math.abs(h);
}

export interface Review { name: string; stars: number; date: string; variant?: string; text: string }

const REVIEWERS = ["Sokha C.", "Dara P.", "Sreymom K.", "Vibol T.", "Channary S.", "Pisey L.", "Rithy M.", "Bopha N."];
const REVIEW_TEXT = [
  "Arrived in 2 days to Phnom Penh, exactly as described. Packaging was very neat.",
  "Good quality for the price. Seller replied quickly to my questions in chat.",
  "Second time ordering from this store — consistent quality, recommended!",
  "Works perfectly. Paid with KHQR and got the voucher discount too.",
  "Color is slightly different from the photo but still very nice. Fast delivery.",
  "Bought as a gift and my family loves it. Will buy again during the next sale.",
];
const DATES = ["16 Nov 2026", "12 Nov 2026", "08 Nov 2026", "03 Nov 2026", "29 Oct 2026", "21 Oct 2026"];

export function reviewsFor(p: Product): Review[] {
  const h = hash(p.id);
  return Array.from({ length: 4 }, (_, i) => {
    const k = (h >> (i * 3)) + i;
    const variant = [p.colors?.[k % (p.colors?.length || 1)]?.name, p.sizes?.[k % (p.sizes?.length || 1)]].filter(Boolean).join(", ");
    return {
      name: REVIEWERS[k % REVIEWERS.length],
      stars: i === 2 && p.rating < 4.8 ? 4 : 5,
      date: DATES[i + (h % 3)],
      variant: variant || undefined,
      text: REVIEW_TEXT[(k + i) % REVIEW_TEXT.length],
    };
  });
}

/** Rating histogram (5★..1★) whose weighted average approximates p.rating. */
export function ratingBreakdown(p: Product): number[] {
  // shares always sum to 1: 5★ scales with rating, 3/2/1★ fixed small tails
  const s5 = Math.min(0.85, Math.max(0.5, 0.55 + (p.rating - 4.5) * 0.8));
  const shares = [s5, 1 - s5 - 0.06, 0.03, 0.02, 0.01];
  const counts = shares.map((s) => Math.round(p.reviews * s));
  counts[0] += p.reviews - counts.reduce((a, b) => a + b, 0); // fix rounding drift
  return counts;
}

export function sellerStats(p: Product) {
  const h = hash(p.store);
  return {
    positive: 92 + (h % 8),
    onTime: 95 + (h % 5),
    chat: 88 + ((h >> 4) % 12),
  };
}

export function questionsFor(p: Product): { q: string; a: string }[] {
  return [
    { q: "Is this item in stock and ready to ship?", a: `Yes, ${p.stock} units ready. Orders before 3pm ship the same day.` },
    { q: "Can I pay cash on delivery?", a: "Yes, Cash on Delivery is available in Phnom Penh and most provinces." },
  ];
}
