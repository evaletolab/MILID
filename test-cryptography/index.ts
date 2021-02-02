//
// stateless authentification
import { utils, getPublicKey, sign, verify } from 'noble-ed25519';

const privateKey = utils.randomPrivateKey(); // 32-byte Uint8Array or string.

(async () => {
  //
  // server side operation
  const publicKey = await getPublicKey(privateKey);
  const account = 'test@pouet.com:password1';
  const signature = await sign(account, privateKey);  
  console.log('---server side signed account',signature.toString());

  //
  // client side, publickey
  const userEntry = 'test@pouet.com:password1';
  const isSigned = await verify(signature, userEntry, publicKey);
  console.log('---validate user entry ',isSigned);
})();
