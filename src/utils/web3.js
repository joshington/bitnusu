import Web3 from 'web3';
import contractAbi from '../../contracts/Bitnusu.abi.json';
import { contractAddress, cUSDContractAddress } from './constants';

let web3;
let contract;

const initWeb3 = async () => {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    const provider = new Web3.providers.HttpProvider(
      'https://alfajores-forno.celo-testnet.org'
    );
    web3 = new Web3(provider);
  }

    const contractAddress = contractAddress;
    const contractABI = contractAbi;

  contract = new web3.eth.Contract(contractABI, contractAddress);
};

export { web3, contract, initWeb3 };