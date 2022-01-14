const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { userJwtKey, cryptoKey, adminJwtKey } = require('../config/keys');


// const encryptData = (data) => {
//     try {
//         const algorithm = 'aes-192-cbc';
//         const password = cryptoKey;
//         const key = crypto.scryptSync(password, 'salt', 24);
//         const iv = Buffer.alloc(16, 0);
//         const cipher = crypto.createCipheriv(algorithm, key, iv);
//         let encrypted = cipher.update(data, 'utf8', 'hex');
//         encrypted += cipher.final('hex');
//         return encrypted;
//     } catch (e) {
//         return null;
//     }
// };

// signing jwt token
const signJwt = (id, email) => {
    try {
        const payload = {
            userid: id,
            email,
        };
        const token = jwt.sign(payload, userJwtKey, {
            expiresIn: '80h', // expires in 80 hours
        });
        if (token) {
            return token;
        }
        return null;
    } catch (e) {
        return null;
    }
};

const signJwtAdmin = (id, email) => {
    try {
        const payload = {
            adminid: id,
            email,
        };
        console.log(payload)
        const token = jwt.sign(payload, adminJwtKey, {
            expiresIn: '80h', // expires in 80 hours
        });
        console.log(token)
        if (token) {
            return token;
        }
        return null;
    } catch (e) {
        return null;
    }
};

// password hashing
const hashPassword = async (password) => {
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
        hashedPassword = null;
    }
    return hashedPassword;
};

// verify password hash
const verifyHash = async (password, passwordHash) => {
    let isPasswordValid;
    try {
        isPasswordValid = await bcrypt.compare(password, passwordHash);
    } catch (e) {
        console.log('error', e);
        isPasswordValid = null;
    }
    return isPasswordValid;
};

// const decryptPass = (encryptedPassword) => {
//     try {
//         const algorithm = 'aes-192-cbc';
//         const password = cryptoKey;
//         const key = crypto.scryptSync(password, 'salt', 24);
//         const iv = Buffer.alloc(16, 0);

//         const decipher = crypto.createDecipheriv(algorithm, key, iv);

//         const encrypted = encryptedPassword;
//         let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//         decrypted += decipher.final('utf8');
//         return decrypted;
//     } catch (e) {
//         console.log(e);
//         return null;
//     }
// };
// verify jwt token
// eslint-disable-next-line consistent-return
// const verifyJwt = (token) => {
//     if (token) {
//         return new Promise((resolve, reject) => {
//             const decryptedToken = decryptPass(token);
//             if (decryptedToken) {
//                 jwt.verify(decryptedToken, userJwtKey, (err, decoded) => {
//                     if (err) {
//                         reject(new Error(false));
//                     } else {
//                         resolve(decoded);
//                     }
//                 });
//             } else {
//                 reject(new Error(false));
//             }
//         });
//     }
// };

// const verifyAdminJwt = (token) => {
//     if (token) {
//         return new Promise((resolve, reject) => {
//             const decryptedToken = decryptPass(token);
//             if (decryptedToken) {
//                 jwt.verify(decryptedToken, adminJwtKey, (err, decoded) => {
//                     if (err) {
//                         reject(new Error(false));
//                     } else {
//                         resolve(decoded);
//                     }
//                 });
//             } else {
//                 reject(new Error(false));
//             }
//         });
//     }
// };


module.exports = {
    hashPassword,
    verifyHash,
    signJwt,
    signJwtAdmin,
};
