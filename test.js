var bls = require('noble-bls12-381');

function generatePubKey(privKey) {
  var pubKey = bls.getPublicKey(privKey);
  return pubKey
};

function signMessage(privKey, message) {
  message = new TextEncoder().encode(message)
  let signature = bls.sign(message, privKey)
  return signature
};

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkSig(signature, publicKey, message) {
  message = new TextEncoder().encode(message)
  let sig = await signature
  let pk = await publicKey
  let isCorrect = await bls.verify(sig, message, pk)
  console.log(isCorrect)
  return isCorrect
}

async function verifyMulti(signature, publicKeyArray, message) {
  let sig = await signature
  let isCorrect = await bls.verifyBatch(message, publicKeyArray, sig)
  console.log(isCorrect)
  return isCorrect

}

async function aggSig(signatureArray) {
  let sig = await Promise.all(signatureArray)
  let agg = await bls.aggregateSignatures(sig)
  console.log("Agg Sig :" + bufferToHex(agg))
  return agg
}

async function aggKey(keyArray) {
  //let keys = await Promise.all(keyArray)
  let singleKey = await bls.aggregatePublicKeys(keyArray)
  console.log("Agg Key :" + bufferToHex(singleKey))
  return singleKey
}

module.exports = { generatePubKey: generatePubKey, signMessage: signMessage, checkSig: checkSig, aggSig: aggSig, aggKey: aggKey, verifyMulti: verifyMulti };


//  browserify test.js --standalone myBundle > bundle.js
