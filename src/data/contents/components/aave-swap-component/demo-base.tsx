"use client";

import { AaveSwapComponent } from "./base";

export default function AaveSwapComponentDemo() {
  return (
    <AaveSwapComponent
      from={{
        name: "Ethereum",
        symbol: "ETH",
        priceUSD: 3445.86,
        max: 411.82,
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ethereum_logo_translucent.svg/400px-Ethereum_logo_translucent.svg.png",
      }}
      to={{
        name: "Aave",
        symbol: "AAVE",
        priceUSD: 317.12,
        logo: "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/aave.png",
      }}
    />
  );
}