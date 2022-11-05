const express = require('express');
const bodyParser = require('body-parser')
const https = require('https');
const { options } = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',function(req,res){
    const fristName = req.body.FNAME ;
    const lastName = req.body.LNAME ;
    const email = req.body.EMAIL ;
    const data = {
        members : [{
        email_address : email ,
        status : 'subscribed' ,
        merge_fields : {
            FNAME : fristName ,
            LNAME : lastName
        }
        }]
    }
    const jsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/fb7f9d2e05"
    const options ={
        method :'POST',
        auth : 'mohamed:8189dc64e1b2c4102f7d777d53083a54-us21'
    }
    const request = https.request(url,options,function(resposne){
    resposne.on('data',function(data){
        if(resposne.statusCode ===200){
            res.sendFile(__dirname+"/success.html")
        }else{res.sendFile(__dirname+'/failure.html')}
        console.log(JSON.parse(data))
    })
    })
request.write(jsonData);
request.end();

app.post('/failure',function(req,res){
    res.redirect('/')
})
})







/* 8189dc64e1b2c4102f7d777d53083a54-us21 */
/* fb7f9d2e05 */









app.listen(process.env.PORT||3000,function(){
    console.log("on port 3000");
})
















































/* 8189dc64e1b2c4102f7d777d53083a54-us21 */
/* fb7f9d2e05 */







