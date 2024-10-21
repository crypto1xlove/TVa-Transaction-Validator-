import React, { useState, useEffect } from 'react';
import { getWeb3, getContract } from '../utils/web3';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [txDetails, setTxDetails] = useState(null);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const contract = await getContract(web3);
      setWeb3(web3);
      setContract(contract);
    };
    init();
  }, []);

  const handleAddTransaction = async () => {
    const accounts = await web3.eth.getAccounts();
    const txHash = await contract.methods.addTransaction(receiver, amount).send({ from: accounts[0] });
    setTransactionHash(txHash);
  };

  const handleGetTransaction = async () => {
    const txData = await contract.methods.getTransaction(transactionHash).call();
    setTxDetails(txData);
  };

  return (
    <div>
      <h1>Transaction Validator</h1>
      <div>
        <h2>Add Transaction</h2>
        <input type="text" placeholder="Receiver Address" onChange={(e) => setReceiver(e.target.value)} />
        <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>
      <div>
        <h2>Get Transaction</h2>
        <input type="text" placeholder="Transaction Hash" onChange={(e) => setTransactionHash(e.target.value)} />
        <button onClick={handleGetTransaction}>Get Transaction</button>
        {txDetails && (
          <div>
            <p>Sender: {txDetails[0]}</p>
            <p>Receiver: {txDetails[1]}</p>
            <p>Amount: {txDetails[2]}</p>
            <p>Valid: {txDetails[3] ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
