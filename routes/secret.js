var express = require('express');
var crypto = require('crypto'), algorithm = 'aes256', password = 'asaadsaad';

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}


var mongo = require('mongoskin');
var router = express.Router();

var db = mongo.db("mongodb://localhost:27017/lab1", {native_parser:true});
db.bind('homework7');



/* GET users listing. */
router.get('/', function(req, res, next) {

    db.homework7.findOne({}, function(err, item){
        console.log(item);
        let value = item.message;
        console.log(value);
        const origin = decrypt(item.message);
        console.log(origin);
        res.send('origin text = ' + origin);
        db.close();
    });
});

module.exports = router;
