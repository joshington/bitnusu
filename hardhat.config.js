

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      {
        version: "0.8.20",
      },
      {
        version:"0.8.24",
      }
    ],
  },
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.ALFA_PRIVATE_KEY],
    },
    // celo: {
    //   url: "https://forno.celo.org",
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
  etherscan: {
    apiKey: process.env.ETHER_API_KEY,
    customChains: [
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://alfajores-forno.celo-testnet.org/api",
          browserURL:"https://alfajores-forno.celo-testnet.org"
        }
      }
    ]
  },
  sourcify: {
    enabled:true,
  },
};

