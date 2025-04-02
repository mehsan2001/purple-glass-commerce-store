
import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Nebula Wireless Headphones",
    price: 149.99,
    description: "Experience premium sound with our flagship Nebula wireless headphones. Featuring active noise cancellation, 40-hour battery life, and ultra-comfortable memory foam ear cushions.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Memory foam ear cushions",
      "Touch controls",
      "Voice assistant compatible"
    ],
    image: "/products/headphones.png",
    category: "Audio"
  },
  {
    id: 2,
    name: "Astro Smart Watch",
    price: 299.99,
    description: "The Astro Smart Watch combines elegant design with cutting-edge technology. Track your fitness, receive notifications, and monitor your health with this premium wearable device.",
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "Water resistant (50m)",
      "7-day battery life",
      "GPS functionality"
    ],
    image: "/products/smartwatch.png",
    category: "Wearables"
  },
  {
    id: 3,
    name: "Quantum Portable Speaker",
    price: 89.99,
    description: "Take your music anywhere with the Quantum Portable Speaker. Delivering powerful, immersive sound in a compact, waterproof design that fits in your bag.",
    features: [
      "Waterproof (IPX7 rated)",
      "12-hour battery life",
      "Built-in microphone",
      "Bluetooth 5.0",
      "Multi-speaker pairing"
    ],
    image: "/products/speaker.png",
    category: "Audio"
  },
  {
    id: 4,
    name: "Infinity Wireless Earbuds",
    price: 129.99,
    description: "Infinity Wireless Earbuds offer crystal-clear sound, seamless connectivity, and a comfortable fit. Perfect for workouts, commuting, or all-day wear.",
    features: [
      "Active Noise Cancellation",
      "8-hour single charge",
      "Additional 24 hours with charging case",
      "Touch controls",
      "IPX5 sweat resistant"
    ],
    image: "/products/earbuds.png",
    category: "Audio"
  }
];
