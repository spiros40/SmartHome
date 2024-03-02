const encrypt = require('bcrypt');

const  encryption=(data)=>{
    const saltRounds = 10; // Salt rounds determine the complexity of the hashing algorithm
    // Generate a salt and hash the password
    encrypt.hash(data, saltRounds, function(err, hash) {
        if (err) {
            console.error(err);
            return undefined;
        }else{
            // Store the hash in your database
            console.log('Hashed password:', hash);
            return hash;
        }
        
    });
};
module.exports=encryption;