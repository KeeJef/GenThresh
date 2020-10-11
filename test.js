var bls = require('noble-bls12-381');

function generatePubKey(privKey) {
  var pubKey = bls.getPublicKey(privKey);
  return pubKey
};

function signMessage(privKey, message) {
  signature = bls.sign(message,privKey)
  return signature
};

function checkSig (signature, publicKey, message){
isCorrect = bls.verify(signature,message, publicKey)
return isCorrect
}

async function aggregateSignatures(signatureArray){
  let sigs = await signatureArray
  aggregateSignature = bls.aggregateSignatures(sigs)
  return aggregateSignature
}

module.exports = { generatePubKey: generatePubKey, signMessage: signMessage, checkSig: checkSig, aggregateSignatures: aggregateSignatures};


//  browserify test.js --standalone myBundle > bundle.js
