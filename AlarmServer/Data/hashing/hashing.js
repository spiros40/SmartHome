const encrypt = require('bcrypt');

const  encryption=(data)=>{
    const saltRounds = 10; // Salt rounds determine the complexity of the hashing algorithm
    // Generate a salt and hash the password
    encrypt.hash(data, saltRounds, function(err, hash) {
        if (err) {
            console.error(err);
            return;
        }
        // Store the hash in your database
        console.log('Hashed password:', hash);
    });
};
module.exports=encryption;  