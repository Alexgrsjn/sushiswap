const UniswapV2ERC20 = artifacts.require("UniswapV2ERC20");
const UniswapV2Factory = artifacts.require("UniswapV2Factory"); //feeTOSetter
//const UniswapV2Pair = artifacts.require("UniswapV2Pair"); Deployed by factory
const UniswapV2Router02 = artifacts.require("UniswapV2Router02"); //factory addr + Wrapped Address
const MasterChef = artifacts.require("MasterChef"); //sushi token addres + devaddress + sushi per block + startblock +  bonusendblock
const SushiBar = artifacts.require("SushiBar"); //sushi IERC
const SushiMaker = artifacts.require("SushiMaker"); // factory + bar + sushi + wrapped addresses
const SushiRoll = artifacts.require("SushiRoll"); // 
const Migrations = artifacts.require("Migrations");
const SushiToken = artifacts.require("SushiToken");

const { bytecode } = require('../build/contracts/UniswapV2Pair.json');
const { keccak256 } = require('@ethersproject/solidity');
const computedInitCodeHash = keccak256(['bytes'], [`${bytecode}`]);

module.exports = async function (deployer) {
  deployer.deploy(Migrations);

  await deployer.deploy(UniswapV2ERC20)

   await deployer.deploy(UniswapV2Factory, "0x1d32388d509fe398679b4deeb873a96348900f2d")

    await deployer.deploy(UniswapV2Router02, UniswapV2Factory.address, "0xF561b31d0c6f9c8b96a0Ee5DFADDaC9787Eaa70c")

     await deployer.deploy(SushiToken)

     await deployer.deploy(SushiBar, SushiToken.address)
 
     await deployer.deploy(SushiMaker, UniswapV2Factory.address, SushiBar.address, SushiToken.address, "0xF561b31d0c6f9c8b96a0Ee5DFADDaC9787Eaa70c")
     await deployer.deploy(MasterChef, SushiToken.address, "0x1d32388d509fe398679b4deeb873a96348900f2d", 5, 1612978, 1)
     

  
  .then(
  	async function () {
 		console.log(`   address public UniswapV2ERC20 = ${UniswapV2ERC20.address}\n`);
 		console.log(`   address public UniswapV2Factory = ${UniswapV2Factory.address}\n`);
 		console.log(`   address public UniswapV2Router02 = ${UniswapV2Router02.address}\n`);
    console.log(`    Init code hash for UniswapV2Pair is: ${computedInitCodeHash}\n`);
  		console.log(`   export SushiToken = ${SushiToken.address}\n`);
  		console.log(`   export SushiBar = ${SushiBar.address}\n`);
  		console.log(`   export SushiMaker = ${SushiMaker.address}\n`);
  		console.log(`   export MasterChef = ${MasterChef.address}\n`);

  	})
  //deployer.deploy(User);
};
