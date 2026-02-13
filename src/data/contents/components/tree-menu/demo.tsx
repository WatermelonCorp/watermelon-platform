"use client";

import TreeMenu from "./index"; 
const menu = [
  {
    id: "foundation",
    label: "Foundation",
    children: [
      {
        id: "design-principles",
        label: "Design Principles",
        children: [
          { id: "clarity", label: "Clarity" },
          { id: "efficiency", label: "Efficiency" },
          { id: "consistency", label: "Consistency" },
          { id: "beauty", label: "Beauty" },
        ],
      },
      {
        id: "colors",
        label: "Colors",
        children: [
          {
            id: "neutrals",
            label: "Neutrals",
            children: [
              { id: "neutral-50", label: "Slate 50" },
              { id: "neutral-500", label: "Slate 500" },
              { id: "neutral-900", label: "Slate 900" },
            ],
          },
          { id: "brand-colors", label: "Brand Colors" },
          { id: "functional-colors", label: "Functional Colors" },
        ],
      },
    ],
  },
  {
    id: "components",
    label: "Components",
    children: [
      {
        id: "buttons",
        label: "Buttons",
        children: [
          { id: "primary-button", label: "Primary Button" },
          { id: "secondary-button", label: "Secondary Button" },
        ],
      },
      {
        id: "cards",
        label: "Cards",
        children: [
          { id: "profile-card", label: "Profile Card" },
          { id: "product-card", label: "Product Card" },
        ],
      },
    ],
  },
  {
    id: "gestures",
    label: "Gestures",
    children: [
      { id: "tap", label: "Tap" },
      {
        id: "swipe",
        label: "Swipe",
        children: [
          { id: "swipe-left", label: "Swipe Left" },
          { id: "swipe-right", label: "Swipe Right" },
        ],
      },
    ],
  },
];

export default function TreeMenuDemo() {
  return (
      <TreeMenu menuData={menu} />
  );
}