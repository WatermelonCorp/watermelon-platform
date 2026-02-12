import {PinItemComponent} from ".";
import { IoFastFood } from "react-icons/io5";
import {
  FaChargingStation,
  FaPills,
  FaSailboat,
  FaUtensils,
} from "react-icons/fa6";

const items = [
  {
    id: 1,
    name: "Harbor Bay Marina",
    type: "Marina",
    status: "Closes 7:00 PM",
    icon: IoFastFood,
    pinned: false,
  },
  {
    id: 2,
    name: "Mocha Brew",
    type: "Cafe",
    status: "Closes 9:00 PM",
    icon: FaSailboat,
    pinned: false,
  },
  {
    id: 3,
    name: "Olive Bistro",
    type: "Restaurant",
    status: "Closes 11:00 PM",
    icon: FaUtensils,
    pinned: false,
  },
  {
    id: 4,
    name: "GreenVolt Hub",
    type: "EV Charger",
    status: "Open 24 hours",
    icon: FaChargingStation,
    pinned: false,
  },
  {
    id: 5,
    name: "CarePlus Pharmacy",
    type: "Pharmacy",
    status: "Open 24 hours",
    icon: FaPills,
    pinned: false,
  },
];

export default function PinItemDemo() {
  return (
    <div className="flex items-center justify-center">
      <PinItemComponent items={items} />
    </div>
  );
}
