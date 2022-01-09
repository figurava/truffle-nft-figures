const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build-contracts/Figurava.json', 'utf8'));
const data = JSON.stringify({abi: contract.abi, networks: contract.networks})
console.log(data);
fs.writeFileSync('./pages/artifacts/FiguravaABI.json', data);