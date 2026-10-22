import { category } from "./config";
import Card1 from "./variant-1";
import Card2 from "./variant-2";
import Card3 from "./variant-3";
import Card4 from "./variant-4";
import Card5 from "./variant-5";
import Card6 from "./variant-6";
import Card7 from "./variant-7";
import Card8 from "./variant-8";
import Card9 from "./variant-9";
import Card10 from "./variant-10";
import Card11 from "./variant-11";
import Card12 from "./variant-12";
import Card13 from "./variant-13";
import Card14 from "./variant-14";
import Card15 from "./variant-15";
import code1 from "./variant-1.tsx?raw";
import code2 from "./variant-2.tsx?raw";
import code3 from "./variant-3.tsx?raw";
import code4 from "./variant-4.tsx?raw";
import code5 from "./variant-5.tsx?raw";
import code6 from "./variant-6.tsx?raw";
import code7 from "./variant-7.tsx?raw";
import code8 from "./variant-8.tsx?raw";
import code9 from "./variant-9.tsx?raw";
import code10 from "./variant-10.tsx?raw";
import code11 from "./variant-11.tsx?raw";
import code12 from "./variant-12.tsx?raw";
import code13 from "./variant-13.tsx?raw";
import code14 from "./variant-14.tsx?raw";
import code15 from "./variant-15.tsx?raw";
import type { UiVariant } from "@/data/components-registry";

export const variants: UiVariant[] = [
  {
    id: "card-01",
    title: "Card 1",
    description: "Sign-in card with work email and access code fields, a reset link and an email link option.",
    component: Card1,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-1.json",
    code: code1,
  },
  {
    id: "card-02",
    title: "Card 2",
    description: "Meeting notes card with a numbered action list and overlapping collaborator avatars that show names on hover.",
    component: Card2,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-2.json",
    code: code2,
  },
  {
    id: "card-03",
    title: "Card 3",
    description: "Team card listing members with avatars and roles in a two-column grid, plus an invite teammate tile.",
    component: Card3,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-3.json",
    code: code3,
  },
  {
    id: "card-04",
    title: "Card 4",
    description: "Image card with the title and description placed above a rounded 4:3 photo.",
    component: Card4,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-4.json",
    code: code4,
  },
  {
    id: "card-05",
    title: "Card 5",
    description: "Media card with a full-bleed image on top and View Details and Save Reference buttons below.",
    component: Card5,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-5.json",
    code: code5,
  },
  {
    id: "card-06",
    title: "Card 6",
    description: "Horizontal media card with the image on the left and text with a single action on the right.",
    component: Card6,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-6.json",
    code: code6,
  },
  {
    id: "card-07",
    title: "Card 7",
    description: "Image card with the title and description overlaid on a dark gradient at the bottom of the photo.",
    component: Card7,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-7.json",
    code: code7,
  },
  {
    id: "card-08",
    title: "Card 8",
    description: "Plain text card with a title and body copy on a light sky blue background.",
    component: Card8,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-8.json",
    code: code8,
  },
  {
    id: "card-09",
    title: "Card 9",
    description: "Square-cornered text card with a sky blue border, a sky blue title and a heavy drop shadow.",
    component: Card9,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-9.json",
    code: code9,
  },
  {
    id: "card-10",
    title: "Card 10",
    description: "Card with Overview, Activity and Files tabs that swap the text content shown inside it.",
    component: Card10,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-10.json",
    code: code10,
  },
  {
    id: "card-11",
    title: "Card 11",
    description: "Social post card with a verified author, square photo, toggleable like, comment, share, save and hashtags.",
    component: Card11,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-11.json",
    code: code11,
  },
  {
    id: "card-12",
    title: "Card 12",
    description: "Product card with a shoe image, heart favourite toggle, size and colour badges, price and Add to cart.",
    component: Card12,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-12.json",
    code: code12,
  },
  {
    id: "card-13",
    title: "Card 13",
    description: "Testimonial card with a dash-boxed highlighted phrase, author avatar and handle, and a five-star rating.",
    component: Card13,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-13.json",
    code: code13,
  },
  {
    id: "card-14",
    title: "Card 14",
    description: "Dismissible promo card with a sparkle icon, centred message and a Book a review button.",
    component: Card14,
    cli: "npx shadcn@latest add https://registry.watermelon.sh/r/card-14.json",
    code: code14,
  },
  {
    id: "card-15",
    title: "Card 15",
    description: "Row of three joined gallery cards with wide images that stack vertically on smaller screens.",
    component: Card15,
    cli: "npx shadcn@latest add Card",
    code: code15,
    colSpan: 2,
  }
];

export { category };
