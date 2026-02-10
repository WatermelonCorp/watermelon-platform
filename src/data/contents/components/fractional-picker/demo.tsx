import { useState } from "react";
import { FractionalPicker } from ".";

export default function FractionalPickerDemo() {
  const [value, setValue] = useState(24);

  return (
   <>
      <FractionalPicker value={value} onChange={setValue} />
    </>
  );
}
