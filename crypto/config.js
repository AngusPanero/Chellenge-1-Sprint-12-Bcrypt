const crypto = require('crypto');
const bcrypt = require('bcrypt'); 

const secret = crypto.randomBytes(64).toString('hex'); 
console.log(typeof secret); 

const hashedSecret = bcrypt.hashSync(secret, 10); 
console.log(typeof hashedSecret); 

module.exports = {secret};