const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Validator', function () {
  let Validator, validator, owner, addr1, addr2;

  beforeEach(async function () {
    Validator = await ethers.getContractFactory('Validator');
    [owner, addr1, addr2] = await ethers.getSigners();
    validator = await Validator.deploy();
    await validator.deployed();
  });

  it('should add and validate a transaction', async function () {
    const txHash = await validator.addTransaction(addr1.address, 100);
    const tx = await validator.getTransaction(txHash);
    expect(tx.sender).to.equal(owner.address);
    expect(tx.receiver).to.equal(addr1.address);
    expect(tx.amount).to.equal(100);
    expect(tx.isValid).to.be.false;

    await validator.validateTransaction(txHash);
    const validatedTx = await validator.getTransaction(txHash);
    expect(validatedTx.isValid).to.be.true;
  });
});
