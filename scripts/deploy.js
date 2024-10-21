async function main() {
  const Validator = await ethers.getContractFactory('Validator');
  console.log('Deploying Validator contract...');
  const validator = await Validator.deploy();
  await validator.deployed();
  console.log('Validator contract deployed to:', validator.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
