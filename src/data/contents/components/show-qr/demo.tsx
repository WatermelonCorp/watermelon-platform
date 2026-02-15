import React from "react";

import { ShowQR } from "@/data/contents/components/show-qr";

const App: React.FC = () => {
  return (
    <div className="w-full">
      <ShowQR
        value="https://gemini.google.com"
        buttonLabel="Show QR Code"
        onCopy={() => console.log("Link copied to clipboard!")}
      />
    </div>
  );
};

export default App;
