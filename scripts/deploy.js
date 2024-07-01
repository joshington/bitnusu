const { ethers } = require("hardhat");

async function main() {
  try {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying bitnusu  contract  with the account:",
      deployer.address
    );
    
    const  Bitnusu = await ethers.getContractFactory("Bitnusu");
    const bitnusu  = await Bitnusu.deploy("0x5b207C79fd665d33D74C19138E2944Ffb72016c7");

    await bitnusu.waitForDeployment();

    console.log(`Bitnusu contract deployed to ${bitnusu.target}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
