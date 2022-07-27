/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
require('dotenv').config()
const fetch = require('node-fetch')
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var xhub = require('express-x-hub');
app.use(bodyParser.urlencoded({ 
  extended: true 
}));
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));
console.log("Puerto: "+app.get('port'))
app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());
var token = process.env.TOKEN || 'token';
var tokenpermanente = process.env.Authorization || 'token';
var received_updates = [];

const url = "https://graph.facebook.com/v13.0/111960884887832/messages"


app.get('/', function(req, res) {
  //console.log(req);
  


 res.send('<pre>' + JSON.stringify(received_updates, null, 2) +  '</pre>');

});




app.get(['/facebook', '/instagram'], function(req, res) {



  
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == token
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.post('/facebook', function(req, res) {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  
  //const payload = req.body.entry[0].changes[0].value.messages[0].button.payload
  const mensaje = req.body.entry[0].changes[0].value.messages[0].text.body
  const nombre = req.body.entry[0].changes[0].value.contacts[0].profile.name
  const numero = req.body.entry[0].changes[0].value.metadata.display_phone_number;
  console.log('Facebook request body: '+payload+" "+ numero);
let data ={
  "messaging_product": "whatsapp",
  "preview_url": false,
  "recipient_type": "individual",
  "to": "56945407148",
  "type": "text",
  "text": {
      "body": "mensaje de *"+nombre+"*\n"+numero+"\n"+  mensaje
  }
}
let data1 ={
  "messaging_product": "whatsapp",
  "preview_url": false,
  "recipient_type": "individual",
  "to": "56945038836",
  "type": "text",
  "text": {
      "body": "mensaje de *"+nombre+"*\n"+numero+"\n"+  mensaje
  }
}

  if (mensaje){
    enviarmensaje(data)
    enviarmensaje(data1)
    res.sendStatus(200);
    res.status(200)
  }

  if(payload=="Llamado" || payload=="Whatsapps"){
    console.log("entra ------------------->")
    let data ={
      "messaging_product": "whatsapp",
      "preview_url": false,
      "recipient_type": "individual",
      "to": "56945407148",
      "type": "text",
      "text": {
          "body": "mensaje de "+  payload
      }
    }
    let data1 ={
      "messaging_product": "whatsapp",
      "preview_url": false,
      "recipient_type": "individual",
      "to": "56945038836",
      "type": "text",
      "text": {
          "body": "mensaje de *"+nombre+"*\n"+numero+"\n"+  payload
      }
    }
    
    enviarmensaje(data)
    res.sendStatus(200);
  }

    //console.log(numero)
  //console.log(nombre)
  //console.log(mensaje)


  if (!req.isXHubValid()) {
    console.log('Warning - request header X-Hub-Signature not present or invalid');
    res.sendStatus(401);
    return;
  }



  console.log('request header X-Hub-Signature validated');
  // Process the Facebook updates here
  received_updates.unshift(req.body);
  res.sendStatus(200);
 
  
  
  
});

app.post('/instagram', function(req, res) {
  
  console.log('Instagram request body:');
  console.log(req.body);
  // Process the Instagram updates here
  received_updates.unshift(req.body);
  res.status(200)
  res.sendStatus(200);
});

app.post('/prueba/:num/:nombre', function(req, res) {
 let num= req.params.num
 let nombre= req.params.nombre

 let data3={
  "messaging_product": "whatsapp",
  "to": num,
  "type": "template",
  "template": {
    "language": {
      "policy": "deterministic",
      "code": "es"
    },
    "name": "saludo",
    "components": [
    {
      "type" : "header",
      "parameters": [
  
      {
        "type": "video",
        "video": {
          "link": "https://promarketing.cl/video.mp4"
          
        }
      }

 
    ]

    },
    {
      "type" : "body",
      "parameters": [
        {
          "type": "text",
          "text": nombre
        }
       
       
      ] 
    
      }
    ]
  }
}
enviarmensaje(data3)

res.sendStatus(200)
res.status(200)

})
  

  

function enviarmensaje(data){
  const url = "https://graph.facebook.com/v13.0/111960884887832/messages"

  fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json',
  'Authorization': tokenpermanente }
}).then(res => res.json())
.then(json => console.log(json));


return;

}


  










app.listen();


