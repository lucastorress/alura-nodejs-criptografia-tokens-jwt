import { generateKeyPairSync, createSign, createVerify } from 'crypto'

/*
    generateKeyPairSync: Allow to genetare a pair of public and private key
    createSign: Allow to create a signature
    createVerify: Allow to use the validator to validate the signature
*/

const config = {
    modulusLength: 2048,

    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
}

// Generate a pair of public and private key
const { privateKey, publicKey } = generateKeyPairSync('rsa', config)

console.log(`Private key:\n${privateKey}`)
console.log(`Public key:\n${publicKey}`)

let data = 'Hello world'

const sign = createSign('rsa-sha256');
const signature = sign.update(data).sign(privateKey, 'hex');

console.log(`Signature:\n${signature}`)

const verify = createVerify('rsa-sha256');

// Try to corrupt the data
// data += ', this is a corrupted data';

const isVerified = verify.update(data).verify(publicKey, signature, 'hex');

console.log(`Is authentic? ${isVerified}`);