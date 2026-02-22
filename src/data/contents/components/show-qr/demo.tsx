import React from "react";

import { ShowQr } from ".";

const App: React.FC = () => {
  return (
    <div className="w-full">
      <ShowQr
        value="https://gemini.google.com"
        buttonLabel="Show QR Code"
        onCopy={() => console.log("Link copied to clipboard!")}
      />
    </div>
  );
};

export default App;
