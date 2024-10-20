// require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();

// module.exports = {
//   solidity: {
//     version: "0.8.27",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },
//   networks: {
//     hardhat: {
//       chainId: 1337 
//     },
//     volta: {
//       url: "https://volta-rpc.energyweb.org",
//       accounts: [process.env.PRIVATE_KEY], 
//     },
//   },
// };


require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "polygon_amoy",
  networks: {
    hardhat: {
    },
    polygon_amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}