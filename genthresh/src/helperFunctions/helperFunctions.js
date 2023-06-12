module.exports = {
  stringToUint8Array,
  bufferToHex,
  generatePubKey,
  signMessage,
  checkSig,
  verifyMulti,
  aggSig,
  aggKey,
  saveFile,
};

const bls = require("@noble/bls12-381");
var FileSaver = require("file-saver");

function stringToUint8Array(string) {
  return Uint8Array.from(
    Array.from(string).map((letter) => letter.charCodeAt(0))
  );
}

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generatePubKey(privKey) {
  var pubKey = bls.getPublicKey(privKey);
  return pubKey;
}

async function signMessage(privKey, message) {
  message = new TextEncoder().encode(message);
  let signature = await bls.sign(message, privKey);
  return signature;
}

async function checkSig(signature, publicKey, message) {
  message = new TextEncoder().encode(message);
  let sig = await signature;
  let pk = await publicKey;
  let isCorrect = await bls.verify(sig, message, pk);
  return isCorrect;
}

async function verifyMulti(signature, publicKeyArray, message) {
  let sig = await signature;
  let isCorrect = await bls.verifyBatch(message, publicKeyArray, sig);
  return isCorrect;
}

async function aggSig(signatureArray) {
  let sig = await Promise.all(signatureArray);
  let agg = await bls.aggregateSignatures(sig);
  return agg;
}

async function aggKey(keyArray) {
  //let keys = await Promise.all(keyArray)
  let singleKey = await bls.aggregatePublicKeys(keyArray);
  return singleKey;
}

function saveFile(textToSave, fileName, fileType) {
  var blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
  let today = new Date().toISOString().slice(0, 10);
  FileSaver.saveAs(blob, fileName + today + fileType);
}