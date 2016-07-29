var express = require('express');
var cors = require('cors');
var app = express();
var dateFormat = require('dateformat');

module.exports = function(app, customerObject)
{
    app.use(cors());

    //CustomerList
    app.post('/api/customers', function(req,res){
        console.log("\nmongoDB access /Time : "+dateFormat(new Date(), "yyyy-mm-dd : HH:MM:ss")+" /URLPATH = " + req._parsedUrl.path);
        console.log("req.body = ", req.body);
        customerObject.find(function(err, customer){
            console.log("customer = " , customer);
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(customer);
        })

    });

    //Select Customer
    app.post('/api/customerDetail', function(req, res){
        console.log("\nmongoDB access /Time : "+dateFormat(new Date(), "yyyy-mm-dd : HH:MM:ss")+" /URLPATH = " + req._parsedUrl.path);
        console.log("req.body = ", req.body);
        customerObject.findOne({_id : req.body._id}, function(err, customer){
            console.log("customer = " , customer);
            if(err) return res.status(500).json({error: err});
            if(!customer) return res.status(404).json({error: 'customer not found'});
            res.json(customer);
        })

    });

    //Update Customer
    app.post('/api/customerUpdate', function(req, res){
        console.log("\nmongoDB access /Time : "+dateFormat(new Date(), "yyyy-mm-dd : HH:MM:ss")+" /URLPATH = " + req._parsedUrl.path);
        console.log("req.body = ", req.body);
        customerObject.update({_id : req.body._id}, { $set: req.body }, function(err, customer){
            console.log("customer = " , customer);
            if(err) res.status(500).json({ error: 'database failure' });
            if(!customer.n) return res.status(404).json({ error: 'customer not found' });
            res.json( { message: 'customer updated' } );
        })
    });

    //Insert Customer
    app.post('/api/customerInsert', function(req, res){

        console.log("\nmongoDB access /Time : "+dateFormat(new Date(), "yyyy-mm-dd : HH:MM:ss")+" /URLPATH = " + req._parsedUrl.path);
        
        var customer = new customerObject();
        customer.userId = req.body.userId;
        customer.userName = req.body.userName;
        customer.userAge = req.body.userAge;
        customer.userBirth = new Date(req.body.userBirth);
        customer.flagList = req.body.flagList;

        console.log("insertData = ", customer);

        customer.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                console.log("Insert Error! / result code : 0");
                return;
            }

            res.json({result: 1});
            console.log("Insert Success! / result code : 1");

        });
    });

    //Delete Customer
    app.post('/api/customerDelete', function(req, res){
        customerObject.remove({_id : req.body._id}, function(err, output){
            console.log("\nmongoDB access /Time : "+dateFormat(new Date(), "yyyy-mm-dd : HH:MM:ss")+" /URLPATH = " + req._parsedUrl.path);
            console.log("req.body = ", req.body)
            if(err) return res.status(500).json({ error: "database failure" });
                res.status(204).end();
        })
    });

    app.listen(80, function(){
        console.log('CORS-enabled web server listening on port 80');
    });
}
