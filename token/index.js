import jwt from 'jsonwebtoken';

// Secret key used to sign the token
const secret = 'mysecret';

// Payload to be signed
const payload = {
    username: 'Lucas',
    linkedin: 'https://www.linkedin.com/in/lucastorres',
    age: 24
}

// Now, we can sign the token
const token = jwt.sign(payload, secret, { expiresIn: '1d' });

console.log(`My JWT: ${token}`);

// Now, we can verify the token
const tokenSplitted = token.split('.');

console.log(`Header: ${tokenSplitted[0]}`);
console.log(`Payload: ${tokenSplitted[1]}`);
console.log(`Signature: ${tokenSplitted[2]}`);

const decoded = jwt.verify(token, secret);

console.log(`Payload decoded: ${JSON.stringify(decoded)}`);

/*
    After we decode the token,
    we can check if the token is expired

    To do that, we have to multiply the time in seconds by 1000
    As that, we transform to milliseconds
*/
const _iat = new Date(decoded.iat * 1000);
const _exp = new Date(decoded.exp * 1000);

console.log(`Is token expired? ${_exp < new Date()}`);
console.log(`Date of issue: ${_iat}`);
console.log(`Expiration date: ${_exp}`);