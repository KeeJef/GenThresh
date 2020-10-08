function generatePubKey(privKey){
    var bls = require('noble-bls12-381');
    var pubKey = bls.getPublicKey(privKey);
    return pubKey
  };

function testfunction2(){
var arithmetic = require('arithmetic');
var test = arithmetic.add(2, 4);
return test
}

module.exports = {generatePubKey: generatePubKey, myFunc2: testfunction2};


//  browserify test.js --standalone myBundle > bundle.js
