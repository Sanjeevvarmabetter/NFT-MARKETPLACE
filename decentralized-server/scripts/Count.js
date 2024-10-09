const { ethers } = require("hardhat");

async function main() {
    const [owner] = await ethers.getSigners(); 
    console.log(`Owner Address: ${owner.address}`);

    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = MyNFT.attach("0xEaA5a368b47B399cf889213ED2112cf1937DB397"); 
    const tokenCounter = await myNFT.tokencounter();
    console.log(`the number of tokens are ${tokenCounter}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Fatal Error:", error);
        process.exit(1);
    });

