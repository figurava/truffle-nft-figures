const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build-contracts/Figurava.json', 'utf8'));
const data = JSON.stringify({abi: contract.abi, networks: contract.networks})
console.log(data);
fs.writeFileSync('./src/artifacts/FiguravaABI.json', data);