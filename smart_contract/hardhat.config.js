require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/qvO3kwimXzENCpOwFV4Vyg-kFvTDjySY",
      accounts: [
        "ec81094f8e8409cc0fae8b77403a2a63c26ad0142e78f3f5bd9e24601705e60a",
      ],
    },
  },
};
