const { Web3 } = require('web3');
const StakingContractABI = require('./contract/stakingABI.json');
const PresaleContractABI = require('./contract/presaleABI.json');

const web3 = new Web3('https://fragrant-light-isle.bsc.quiknode.pro/f1b8fd37b12bbd281d72476deffc0261c86d3d7d');

const StakingContractAddress = '0x23350A445f14137c4654a126A3B7Df8D68F6f415';
const StakingContract = new web3.eth.Contract(StakingContractABI, StakingContractAddress);

const PresaleContractAddress = '0xD3f208E5619165cF173A250334680CFFe6dE3602';
const PresaleContract = new web3.eth.Contract(PresaleContractABI, PresaleContractAddress);

// Staking Contract
async function getUserTransaction(userAddress, txNo) {
    let data = await StakingContract.methods.userTransactions(userAddress, txNo).call();
    return data;
}


// Presale Contract
async function getTokenPrice() {
    let data = await PresaleContract.methods.tokenPrice().call();
    return data;
}


module.exports = { getUserTransaction, getTokenPrice };