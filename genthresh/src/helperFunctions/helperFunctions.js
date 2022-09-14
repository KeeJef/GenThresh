module.exports = {uint8ArrayToString,bufferToHex, generatePubKey, signMessage, checkSig, verifyMulti, aggSig, aggKey};

const bls = require("@noble/bls12-381");

function uint8ArrayToString(array) {
  var str = String.fromCharCode.apply(null, array);
  return str
}

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function generatePubKey(privKey) {
  var pubKey = bls.getPublicKey(privKey);
  return pubKey
}

async function signMessage(privKey, message) {
  message = new TextEncoder().encode(message)
  let signature = await bls.sign(message, privKey)
  return signature
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