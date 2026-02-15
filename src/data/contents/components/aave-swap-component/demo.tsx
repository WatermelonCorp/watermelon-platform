"use client";

import { AaveSwapComponent } from "./index";

export default function AaveSwapComponentDemo() {
  return (
    <AaveSwapComponent
      from={{
        name: "Ethereum",
        symbol: "ETH",
        priceUSD: 3445.86,
        max: 411.82,
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024",
      }}
      to={{
        name: "Aave",
        symbol: "AAVE",
        priceUSD: 317.12,
        logo: "https://cryptologos.cc/logos/aave-aave-logo.png?v=024",
      }}
    />
  );
}