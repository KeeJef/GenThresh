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

async function aggSig (signatureArray){
  let sig = await Promise.all(signatureArray)
  let agg = await bls.aggregateSignatures(sig)
  return agg
  }

module.exports = { generatePubKey: generatePubKey, signMessage: signMessage, checkSig: checkSig, aggSig: aggSig};


//  browserify test.js --standalone myBundle > bundle.js
