export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "Sneakers" | "Merchandise";
  color?: string;
  rating?: number;
  isNew?: boolean;
  collections?: string[]; // slugs of collections
};

export const PRODUCTS: Product[] = [
  { id: "bits-campus-sneakers", name: "BITS Campus Sneakers", price: 5499, originalPrice: 6499, category: "Sneakers", color: "linear-gradient(135deg,#f8fafc,#e2e8f0)", rating: 4.6, isNew: true, collections: ["bits-fest", "essentials"] },
  { id: "bits-hoodie", name: "BITS Hoodie", price: 2499, category: "Merchandise", color: "linear-gradient(135deg,#f1f5f9,#e2e8f0)", rating: 4.4, collections: ["winter", "essentials"] },
  { id: "campus-runner", name: "Campus Runner", price: 4999, originalPrice: 5999, category: "Sneakers", color: "linear-gradient(135deg,#eef2ff,#e9d5ff)", rating: 4.8, collections: ["sports"] },
  { id: "bits-tee", name: "BITS T‑shirt", price: 1299, category: "Merchandise", color: "linear-gradient(135deg,#fafaf9,#f5f5f4)", rating: 4.1, collections: ["essentials"] },
  { id: "heritage-sneakers", name: "Heritage Sneakers", price: 5799, category: "Sneakers", color: "linear-gradient(135deg,#fef3c7,#fde68a)", rating: 4.7, collections: ["heritage", "sports"] },
  { id: "bits-cap", name: "BITS Cap", price: 899, category: "Merchandise", color: "linear-gradient(135deg,#e0f2fe,#f0f9ff)", rating: 4.2, isNew: true, collections: ["summer"] },
  { id: "pilani-track", name: "Pilani Track Shoes", price: 4699, category: "Sneakers", color: "linear-gradient(135deg,#ffedd5,#fed7aa)", rating: 4.3, collections: ["sports"] },
  { id: "notebook-stickers", name: "Notebook & Sticker Pack", price: 699, category: "Merchandise", color: "linear-gradient(135deg,#f1f5f9,#e2e8f0)", rating: 4.0, collections: ["orientation"] },
  { id: "festival-sneakers", name: "Festival Sneakers", price: 5999, originalPrice: 6999, category: "Sneakers", color: "linear-gradient(135deg,#e9d5ff,#e0e7ff)", rating: 4.9, collections: ["bits-fest"] },
  { id: "bits-tote", name: "BITS Tote Bag", price: 799, category: "Merchandise", color: "linear-gradient(135deg,#f3f4f6,#e5e7eb)", rating: 4.1, collections: ["summer", "orientation"] },
  { id: "court-classics", name: "Court Classics", price: 3999, category: "Sneakers", color: "linear-gradient(135deg,#dbeafe,#bfdbfe)", rating: 4.0, collections: ["heritage"] },
  { id: "bits-bottle", name: "BITS Water Bottle", price: 599, category: "Merchandise", color: "linear-gradient(135deg,#fff1f2,#ffe4e6)", rating: 3.9, collections: ["summer"] },
];

export type Collection = {
  slug: string;
  title: string;
  description: string;
  color?: string;
};

export const COLLECTIONS: Collection[] = [
  { slug: "essentials", title: "Campus Essentials", description: "Daily staples for lectures and labs.", color: "linear-gradient(135deg,#f8fafc,#e2e8f0)" },
  { slug: "sports", title: "Sports & Fitness", description: "Gear up for practice and tournaments.", color: "linear-gradient(135deg,#e0f2fe,#f0f9ff)" },
  { slug: "bits-fest", title: "BITS Fest Picks", description: "Festival-ready styles and accessories.", color: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
  { slug: "heritage", title: "Heritage Classics", description: "Timeless designs inspired by campus.", color: "linear-gradient(135deg,#fef3c7,#fde68a)" },
  { slug: "summer", title: "Summer Drop", description: "Lightweight essentials for the heat.", color: "linear-gradient(135deg,#fef9c3,#fde68a)" },
  { slug: "orientation", title: "Orientation Starter Kit", description: "Kickstart the semester with the basics.", color: "linear-gradient(135deg,#f3f4f6,#e5e7eb)" },
];

