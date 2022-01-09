import Web3 from 'web3';
import axios from 'axios';
import TruffleContract from 'truffle-contract';
import FiguravaAbi from './../artifacts/FiguravaABI.json'

export default {
  web3: null,
  web3Provider: null,
  contracts: {},
  emitUpdate : null,

  initWeb3: async function(emitUpdate) {
    this.emitUpdate = emitUpdate;
    // Modern dapp browsers...
    if (window.ethereum) {
      this.web3Provider = window.ethereum;
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      this.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    if(!this.web3Provider) return; // undefined web3 Provider

    this.web3 = new Web3(this.web3Provider);

    // Get chain id
    this.web3.eth.getChainId().then((chainId)=> {
         this.emitUpdate({chainId: chainId});

         // handle network contract deployments
         if(chainId > 200) this.initContract(); // local chain 1337
         else alert('Contract is not deployed on selected network.')
    });

  },
  emitError(err) {
    this.emitUpdate({web3_error: err});
  },
  initContract() {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      this.contracts.Figurava = TruffleContract(FiguravaAbi);
      // Set the provider for our contract
      this.contracts.Figurava.setProvider(this.web3Provider);
      // Use our contract to retrieve wallet's tokens
      this.totalSupply();
      // check if already logged in
      if(window.ethereum && window.ethereum.selectedAddress)
        this.connect();
  },

  getDeployedContract() {
    return new Promise((resolve,reject) => {
      if(this.deployedContract)
        resolve(this.deployedContract);
      else
        this.contracts.Figurava.deployed()
          .then((instance) => {
            this.deployedContract = instance;
            resolve(this.deployedContract);
        });
    });
  },

  totalSupply() {
    this.getDeployedContract().then((instance) =>{
        // Using call() allows us to read data from the blockchain without having to send a full transaction, meaning we won't have to spend any ether.
        return instance.totalSupply.call();
      }).then((minted) => {
        this.emitUpdate({minted: Web3.utils.hexToNumber(minted)});
      })
      .catch((err) => {
        this.emitError(err)
      });
  },

  walletOfOwner() {
    this.emitError(null);
    this.getDeployedContract().then((instance) =>{
        // Using call() allows us to read data from the blockchain without having to send a full transaction, meaning we won't have to spend any ether.
        return instance.walletOfOwner.call(this.account);
      })
      .then((tokens) => {
        tokens = tokens.map((item)=> Web3.utils.hexToNumber(item))
        this.emitUpdate({tokens: tokens});
      })
      .catch((err) => {
        this.emitError(err)
      });
  },

  requireWeb3() {
    if(this.web3) return false;
    alert('Web3 required');
    return true;
  },

  async connect() {
    if(this.requireWeb3()) return;
    this.emitError(null);
    try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
    } catch (err) {
        // User denied account access...
        console.error("User denied account access");
        this.emitError(err);
        return;
    }

    this.web3.eth.getAccounts((error, accounts) =>{
      if (error) {
        this.emitError(error);
        return
      }
      this.emitError(null);
      this.account = accounts[0];
      this.emitUpdate({account: this.account});
      this.listenAccountsChanges();
      return this.walletOfOwner();
    }).catch((err) => {
        this.emitError(err);
      });
  },

  listenAccountsChanges() {
      window.ethereum.on("accountsChanged", (accounts) => {
          if(!accounts || !accounts.length || this.account != accounts[0])
            window.location.reload();
      });
  },

  mint(count) {
    this.emitError(null);
    // make sure decimal number is correctly converted to string
    const price = (count * 0.05).toFixed(2).toString();
    this.getDeployedContract().then((instance)  =>{
      // Execute mint as a transaction by sending account
      return instance.mint(this.account,count, {from: this.account, value : Web3.utils.toHex( Web3.utils.toWei(price, 'ether'))});
    }).then((result) =>{
      this.totalSupply();
      return this.walletOfOwner();
    }).catch((err) =>{
      this.emitError(err);
    });
  }

};
