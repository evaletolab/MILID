//
// stateless authentification
import { utils, getPublicKey, sign, verify } from 'noble-ed25519';

const account = 'test@pouet.com:password1';

//
// SOLUTION A
import { SHA256 } from 'crypto-js';

const user = account.split(':')[0];
const hidenUser = SHA256(user);
const hidenAccount = SHA256(account);

//
// use the pattern to access user content
console.log('# simple solution for a stateless readonly account content');
console.log('/project/users/sha256(user)-sha256(account).json');
console.log('/project/users/'+hidenUser+'-'+hidenAccount+'.json');
console.log('# ');

//
// SOLUTION A
(async () => {
  //
  // server side operation
  const privateKey = utils.randomPrivateKey(); // 32-byte Uint8Array or string.
  const publicKey = await getPublicKey(privateKey);
  const signature = await sign(account, privateKey);  
  console.log('# server side signed account',signature.toString());

  //
  // client side, publickey
  const userEntry = 'test@pouet.com:password1';
  const isSigned = await verify(signature, userEntry, publicKey);
  console.log('# validate user entry ',isSigned);
})();










