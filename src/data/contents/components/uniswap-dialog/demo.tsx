import { useState } from "react";
import { UniSwapDialog } from "./index";

const Countries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Belarus", code: "BY" },
  { name: "Cyprus", code: "CY" },
  { name: "India", code: "IN" },
  { name: "Mauritius", code: "MU" },
  { name: "Russia", code: "RU" },
  { name: "United States", code: "US" },
];

export default function UniswapDialogDemo() {
  const [selectedCountry, setSelectedCountry] = useState(
    Countries.find((c) => c.code === "US")!
  );

  return (
    <div className="flex min-h-screen h-full items-center justify-center bg-transparent">
      <UniSwapDialog
        value={selectedCountry}
        onChange={setSelectedCountry}
        countries={Countries}
      />
    </div>
  );
}
