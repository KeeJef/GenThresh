var bls = require('noble-bls12-381');

testfunction()

async function testfunction() {

  privKey = "970a3e0249bc5e464291d5eee88ae364d8b794f648950055a382a28ed73d655472f218dae342d3ee4566443ff23a78d85580eb4b11954f6286c6cfc67ad1c082"
  message1 = "test"
  message2 = "tes3"

  let signature1 = await bls.sign(message1, privKey)
  let signature2 = await bls.sign(message2, privKey)

  console.log(signature1 +"     "+ signature2)

  signature1 = bufferToHex(signature1)
  signature2 = bufferToHex(signature2)

  if (signature1 == signature2){
    console.log ("Sigs are same")
  }
};

function generatePubKey(privKey) {
  var pubKey = bls.getPublicKey(privKey);
  return pubKey
};

async function signMessage(privKey, message) {
  let signature = await bls.sign(message, privKey)
  return signature
};

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkSig(signature, publicKey, message) {
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
  singleKey = singleKey.toCompressedHex()
  console.log("Agg Key :" + bufferToHex(singleKey))
  return singleKey
}

module.exports = { generatePubKey: generatePubKey, signMessage: signMessage, checkSig: checkSig, aggSig: aggSig, aggKey: aggKey, verifyMulti: verifyMulti };


//  browserify test.js --standalone myBundle > bundle.js
