var bls = require('noble-bls12-381');

function generatePubKey(privKey) {
  var pubKey = bls.getPublicKey(privKey);
  return pubKey
};

function signMessage(privKey, message) {
  signature = bls.sign(message,privKey)
  return signature
};

async function checkSig (signature, publicKey, message){
let sig = await signature
let isCorrect = await bls.verify(sig,message, publicKey)
return isCorrect
}

module.exports = { generatePubKey: generatePubKey, signMessage: signMessage, checkSig: checkSig };


//  browserify test.js --standalone myBundle > bundle.js
