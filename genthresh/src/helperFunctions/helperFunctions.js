module.exports = {uint8ArrayToString,bufferToHex};


function uint8ArrayToString(array) {
  var str = String.fromCharCode.apply(null, array);
  return str
}

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}