import Web3 from "web3";

export const ERC20_ABI = [
	{
		constant: true,
		inputs: [{ name: '_owner', type: 'address' }],
		name: 'balanceOf',
		outputs: [{ name: 'balance', type: 'uint256' }],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
]
export const DAI_TOKEN = {
	name: 'DAI',
	symbol: 'DAI',
	decimal: 6,
	address: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
}

export const CHAIN_ID = '0x5'

export const web3 = new Web3("wss://goerli.infura.io/ws/v3/081ef49860d24c1eb109c97454700a02");