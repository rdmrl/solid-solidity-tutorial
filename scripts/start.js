async function main() {
	const [owner, somebodyElse] = await hre.ethers.getSigners();

  const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
	const keyboardsContract = await keyboardsContractFactory.deploy();
	await keyboardsContract.deployed();

	const keyboardTxn1 = await keyboardsContract.create("A really great keyboard!");
	await keyboardTxn1.wait();

	const keyboardTxn2 = await keyboardsContract.connect(somebodyElse).create("An even greater keyboard!");
	await keyboardTxn2.wait();

	keyboards = await keyboardsContract.getKeyboards();
	console.log("Got the keyboards!", keyboards);

	keyboards = await keyboardsContract.connect(somebodyElse).getKeyboards();
	console.log("And as somebody else!", keyboards);
}

main()
  .then(() => process.exit(0))
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});
