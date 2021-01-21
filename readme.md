![Imgur](https://i.imgur.com/PhGhASq.png)

## [GenThresh](https://genthresh.com)

[GenThresh.com](https://GenThresh.com) uses bls12-381 as implemented [here](https://github.com/paulmillr/noble-bls12-381) to allow you to Generate, Sign, Aggregate and verify BLS signatures. It also allows for the spontaneous creation of rooms (using websockets) where users can automatically aggregate signatures. 

## Security

GenThresh has NOT been audited and should be therefor not be used for highly sensitive data or financial usecases.

## Code Quality

The code here is a prototype, management of the DOM without a framework is a mess, and the server-side script stores everything in memory which will not scale, i fully encourage someone to take this and iterate to a production ready app. 
