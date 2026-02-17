"use client";
import { MinimalCarousel, type CarouselCard } from "./index";
import { Anchor } from "lucide-react";
import { VscSparkleFilled } from "react-icons/vsc";
import { BsBookmarkStarFill } from "react-icons/bs";
import { FaCloud } from "react-icons/fa";

const CARDS: CarouselCard[] = [
  {
    id: "gxuri",
    title: "Gxuri",
    value: "1.03 ETH",
    color: "bg-[#AD46FF]",
    icon: VscSparkleFilled,
  },
  {
    id: "savings",
    title: "Savings",
    value: "25.08 ETH",
    color: "bg-[#171717]",
    icon: BsBookmarkStarFill,
  },
  {
    id: "yield",
    title: "Yield",
    value: "0.04 ETH",
    color: "bg-[#00B8DB]",
    icon: FaCloud,
  },
  {
    id: "spending",
    title: "Spending",
    value: "0 ETH",
    color: "bg-[#2B7FFF]",
    icon: Anchor,
  },
];

export default function MinimalCarouselDemo() {
  const handleCopy = (card: CarouselCard) => {
    console.log("Copied address for:", card.title);
  };

  const handleCustomize = (card: CarouselCard) => {
    console.log("Customizing:", card.title);
  };

  return (
      <MinimalCarousel 
        cards={CARDS} 
        onCopyClick={handleCopy}
        onCustomizeClick={handleCustomize}
      />
  );
}