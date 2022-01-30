async function main() {
  const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
	const keyboardsContract = await keyboardsContractFactory.deploy();
	await keyboardsContract.deployed();

	console.log("Contract deployed to: ", keyboardsContract.address);

	let keyboards = await keyboardsContract.getKeyboards();
	console.log("Got the keyboards!", keyboards);

	const keyboardTxn = await keyboardsContract.create("A really good keyboard!");
	await keyboardTxn.wait();

	keyboards = await keyboardsContract.getKeyboards();
	console.log("Got the keyboards!", keyboards);
}

main()
  .then(() => process.exit(0))
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
