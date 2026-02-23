"use client";

import { FaFire } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { MorphingDiscoveryBar, type Category } from "./index";

const DISCOVERY_CATEGORIES: Category[] = [
  {
    id: 'popular',
    label: 'Popular',
    icon: <FaFire size={20} className="fill-current" />,
    activeColor: '#F9EBEF',
    activeTextColor: '#FF3B30'
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: <MdFavorite size={20} className="fill-current" />,
    activeColor: '#F9EBEF',
    activeTextColor: '#FD2649'
  },
];

export default function MorphingDiscoveryBarDemo() {
  return (
    <MorphingDiscoveryBar categories={DISCOVERY_CATEGORIES} />
  );
}