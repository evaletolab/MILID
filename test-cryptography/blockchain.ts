//
// dumb blockchain code
import { utils, getPublicKey, sign, verify } from 'noble-ed25519';
import { SHA256 } from 'crypto-js';

//
// create a FAKE block of 10 transaction address
const transactions = new Array(10).fill(0).map(elem => SHA256(utils.randomPrivateKey().toString()).toString() );

//
// looking for a new address Block
const time = Date.now();
const content = transactions.join();
//
// adjust proof of work difficulty
const difficulty= (newblock:string) => newblock.indexOf('0000') !== 0;

//
// the proof of work
let work = 0;
let newblock;
do{
  newblock = SHA256(++work + content).toString();
}while(difficulty(newblock));

console.log(' --> block address',newblock, 'in ',(Date.now()-time),' ms');
console.log(' --> block TXs:', transactions); 