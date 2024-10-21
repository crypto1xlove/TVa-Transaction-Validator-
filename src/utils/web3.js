import Web3 from 'web3';
import Validator from '../abi/Validator.json';

const getWeb3 = async () => {
  return new Web3(Web3.givenProvider || 'http://localhost:8545');
};

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Validator.networks[networkId];
  return new web3.eth.Contract(Validator.abi, deployedNetwork && deployedNetwork.address);
};

export { getWeb3, getContract };
