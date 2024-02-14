const bcrypt = require('bcrypt');

const hashCompare=(data)=>{
//Retrieved from your database
const hashedPasswordFromDB = '$2b$10$4ad2QEoO3f3F9rxC77yPz.4p65a/epgQforOUTz0yteYtpFSLjy5e'; 
// Compare the provided password with the hashed password
    bcrypt.compare(data, hashedPasswordFromDB, function(err, result) {
        if (err){
            console.error(err);
            return;
        }
        if (result) {
            console.log('Password is correct');
        } else {
            console.log('Password is incorrect');
        }
    });
};
module.exports= hashCompare;
