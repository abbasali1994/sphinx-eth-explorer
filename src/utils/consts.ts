import Web3 from "web3";

export const env = true ? "goerli" : "mainnet";

export const ERC20_ABI = [
	{
		constant: true,
		inputs: [],
		name: "name",
		outputs: [{ name: "", type: "string" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "totalSupply",
		outputs: [{ name: "", type: "uint256" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "decimals",
		outputs: [{ name: "", type: "uint8" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [],
		name: "enableTokenTransfer",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: false,
		inputs: [{ name: "_value", type: "uint256" }],
		name: "burn",
		outputs: [{ name: "success", type: "bool" }],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [{ name: "", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", type: "uint256" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "TransferAllowed",
		outputs: [{ name: "", type: "bool" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "owner",
		outputs: [{ name: "", type: "address" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "symbol",
		outputs: [{ name: "", type: "string" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{ name: "_to", type: "address" },
			{ name: "_value", type: "uint256" },
		],
		name: "transfer",
		outputs: [{ name: "success", type: "bool" }],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [{ name: "", type: "address" }],
		name: "frozenAccount",
		outputs: [{ name: "", type: "bool" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [
			{ name: "", type: "address" },
			{ name: "", type: "address" },
		],
		name: "allowance",
		outputs: [{ name: "", type: "uint256" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [],
		name: "disableTokenTransfer",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{ name: "target", type: "address" },
			{ name: "freeze", type: "bool" },
		],
		name: "freezeAccount",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: false,
		inputs: [{ name: "newOwner", type: "address" }],
		name: "transferOwnership",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ name: "initialSupply", type: "uint256" },
			{ name: "tokenName", type: "string" },
			{ name: "tokenSymbol", type: "string" },
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, name: "target", type: "address" },
			{ indexed: false, name: "frozen", type: "bool" },
		],
		name: "FrozenFunds",
		type: "event",
	},
	{ anonymous: false, inputs: [{ indexed: false, name: "", type: "bool" }], name: "TransferEnabled", type: "event" },
	{ anonymous: false, inputs: [{ indexed: false, name: "", type: "bool" }], name: "TransferDisabled", type: "event" },
	{
		anonymous: false,
		inputs: [
			{ indexed: true, name: "from", type: "address" },
			{ indexed: true, name: "to", type: "address" },
			{ indexed: false, name: "value", type: "uint256" },
		],
		name: "Transfer",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, name: "from", type: "address" },
			{ indexed: false, name: "value", type: "uint256" },
		],
		name: "Burn",
		type: "event",
	},
];

export const DAI_TOKEN = {
	name: "DAI",
	symbol: "DAI",
	decimal: 6,
	address: env ? "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844" : "0x6B175474E89094C44Da98b954EedeAC495271d0F".toLowerCase(),
};

export const WEB3_URL = {
	http: `https://${env}.infura.io/v3/081ef49860d24c1eb109c97454700a02`,
	wss: `wss://${env}.infura.io/ws/v3/081ef49860d24c1eb109c97454700a02`
}



export const web3WSS = new Web3(WEB3_URL.wss);
export const web3Http = new Web3(WEB3_URL.http);
