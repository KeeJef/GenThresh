function testfunction(){
    const privateKey = '67d53f170b908cabb9eb326c3c337762d59289a8fec79f7bc9254b584b73265c';
    var bls = require('noble-bls12-381');
    var pubkey = bls.getPublicKey(privateKey);
    return pubkey
  };

function testfunction2(){
var arithmetic = require('arithmetic');
var test = arithmetic.add(2, 4);
return test
}

module.exports = {myFunc1: testfunction, myFunc2: testfunction2};



