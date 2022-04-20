require('dotenv').config()
const ethers = require('ethers')
const Contract = require('./contract')

async function main() {

    const provider = new ethers.providers.InfuraProvider(Contract.network, process.env.INFURA_API_KEY);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const signer = wallet.connect(provider);
    const contract = new ethers.Contract(Contract.address, Contract.abi, signer);

    console.log("Going to pop wallet now to pay gas...")
    let nftTxn = await contract.mintNFT({
        from: process.env.ACCOUNT_ADDRESS,
        value: ethers.utils.parseEther('0.01'),
        gasLimit: 500000,
      });
    console.log("Mining...please wait.")
    await nftTxn.wait(); 
    console.log(nftTxn);
    console.log(`see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });