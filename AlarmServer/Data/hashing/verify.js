const bcrypt = require('bcrypt');
require('dotenv').config();

const hashCompare=(data)=>{
//Retrieved from your database
const hashedPassword = process.env.HASHED_PASSWORD; 
// Compare the provided password with the hashed password
    bcrypt.compare(data, hashedPassword, function(err, result) {
        if (err){
            console.error(err);
            return;
        }
        if (result) {
            console.log('Password is correct');
            return true;
        } else {
            console.log('Password is incorrect');
            return false;
        }
    });
};
module.exports= hashCompare;
