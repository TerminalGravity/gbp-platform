import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");

  // 1. Deploy GBP Token
  console.log("\n1. Deploying GBPToken...");
  const GBPToken = await ethers.getContractFactory("GBPToken");
  const token = await GBPToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("   GBPToken deployed to:", tokenAddress);

  // 2. Deploy Staking
  console.log("\n2. Deploying Staking...");
  const Staking = await ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(tokenAddress);
  await staking.waitForDeployment();
  const stakingAddress = await staking.getAddress();
  console.log("   Staking deployed to:", stakingAddress);

  // 3. Deploy Campaign (treasury = staking for now)
  console.log("\n3. Deploying Campaign...");
  const Campaign = await ethers.getContractFactory("Campaign");
  const campaign = await Campaign.deploy(tokenAddress, stakingAddress, stakingAddress);
  await campaign.waitForDeployment();
  const campaignAddress = await campaign.getAddress();
  console.log("   Campaign deployed to:", campaignAddress);

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("DEPLOYMENT COMPLETE");
  console.log("=".repeat(50));
  console.log("GBPToken:  ", tokenAddress);
  console.log("Staking:   ", stakingAddress);
  console.log("Campaign:  ", campaignAddress);
  console.log("=".repeat(50));

  // Save addresses
  const fs = require("fs");
  const addresses = {
    GBPToken: tokenAddress,
    Staking: stakingAddress,
    Campaign: campaignAddress,
    network: "baseSepolia",
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };
  fs.writeFileSync("deployed-addresses.json", JSON.stringify(addresses, null, 2));
  console.log("\nAddresses saved to deployed-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
