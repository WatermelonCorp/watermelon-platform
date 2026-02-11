import { CarouselNavigator } from ".";
import { useState, useEffect } from "react";

const customThemes = [
  {
    bg: "bg-[#F4F4F9]",
    button: "bg-[#262629]",
    dot: "bg-[#D5D4E0]",
    progress: "bg-[#D5D4E0]",
  },
  {
    bg: "bg-[#E7F1FD]",
    button: "bg-[#016FFE]",
    dot: "bg-[#89BCF9]",
    progress: "bg-[#89BCF9]",
  },
  {
    bg: "bg-[#E0FAE7]",
    button: "bg-[#2EBE50]",
    dot: "bg-[#38E363]",
    progress: "bg-[#38E363]",
  },
  {
    bg: "bg-[#FCF5DB]",
    button: "bg-[#FEC400]",
    dot: "bg-[#FAD34C]",
    progress: "bg-[#FAD34C]",
  },
];

export default function CarouselNavigatorDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 4;
  const autoDelay = 4000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoDelay);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="flex justify-center items-center">
      <CarouselNavigator
        totalSlides={totalSlides}
        autoDelay={autoDelay}
        themes={customThemes}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
}