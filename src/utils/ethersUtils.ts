import { ethers } from 'ethers'

export const isValidAddress = (receiversAddress: any) => {
	try {
		ethers.utils.getAddress(receiversAddress)
		return true
	} catch (error) {
		return false
	}
}
