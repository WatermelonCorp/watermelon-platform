'use client';

import Newsletter1 from './index';

export default function Newsletter1Demo() {
  return (
    <div className="w-full min-h-[500px] h-full flex justify-center items-center bg-muted/20">
      <Newsletter1 
        heading="Join Our Newsletter To Stay Up"
        placeholder="Enter Your Email"
        buttonText="Subscribe"
        disclaimer="Your privacy matters. We safeguard your information for a secure and confidential experience."
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Subscribed successfully!");
        }}
      />
    </div>
  );
}
