# dApp Starter

> The template I use to kickstart all my web3 apps.

This starter kit is composed of Next.js and web3. It uses Typescript and an opinionated directory structure for maximum dev comfy-ness.

## Getting Started

First, install dependencies with `yarn install`. Then, run the development server with `yarn dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

The application connects to wallet on goerli ethereum testnet and displays ETH and DAI balances
It also displays all the previous Dai txns occured for that particular address
It also runs a infura subscription to listen to any new txns related to DAI token transfer on connected wallet address 
