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
  
 
 
  
  //console.log('Facebook request body: '+req.body);
  
 
try {
  
  const mensaje = req.body.entry[0].changes[0].value.messages[0].text.body

  if (mensaje){
    
    const nombre = req.body.entry[0].changes[0].value.contacts[0].profile.name
    const numero = req.body.entry[0].changes[0].value.contacts[0].wa_id;


    if(mensaje.includes("hola")||mensaje.includes("Hola")){
   
 let datacliente={
  "messaging_product": "whatsapp",
  "to": numero,
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


enviarmensaje(datacliente)

    }
    //console.log(JSON.stringify(req.body))
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    //console.log('nombre: '+nombre);
    let data ={
      "messaging_product": "whatsapp",
      "preview_url": false,
      "recipient_type": "individual",
      "to": "56945407148",
      "type": "text",
      "text": {
        "body": "Mensaje de *"+nombre+"*\n"+ 
        "wa.me/"+numero+
        "\n"+numero+
        "\n Mensaje: \n"+  mensaje
    }
    }
    let data1 ={
      "messaging_product": "whatsapp",
      "preview_url": false,
      "recipient_type": "individual",
      "to": "56945038836",
      "type": "text",
      "text": {
          "body": "Mensaje de *"+nombre+"*\n"+ 
          "wa.me/"+numero+
          "\n"+numero+
          "\n Mensaje: \n"+  mensaje
      }
    }

    enviarmensaje(data)
    enviarmensaje(data1)
    res.sendStatus(200);
    res.status(200)
  }
} catch (error) {
}

try {
  const payload  = req.body.entry[0].changes[0].value.messages[0].button.payload

  if(payload){
  

    let nom = req.body.entry[0].changes[0].value.contacts[0].profile.name
    let num = req.body.entry[0].changes[0].value.contacts[0].wa_id
    //console.log("sssssssssssssss"+JSON.stringify(num))
    //console.log(ruta+" entra ------------------->"+ nom +" selecciono "+payload)
    let bodytext = "Mensaje de *"+  nom +
    "* \n Numero: *"+num+ 
    "* \n Whatasapps: *https://wa.me/"+num+ 
    "* \n Seleccionó contacto vía: *"+ payload+"*"
    let data ={
      "messaging_product": "whatsapp",
      "preview_url": false,
      "recipient_type": "individual",
      "to": "56945407148",
      "type": "text",
      "text": {
          "body": bodytext
      }
    }
    let data1 ={
      "messaging_product": "whatsapp",
      "preview_url": false,
      "recipient_type": "individual",
      "to": "56945038836",
      "type": "text",
      "text": {
          "body": bodytext
      }
    }
    let datacliente ={
      "messaging_product": "whatsapp",
      "preview_url": true,
      "recipient_type": "individual",
      "to": num,
      "type": "text",
      "text": {
          "body": "Gracias por responder, mientras tanto puedes ver algunos de nuestros trabajos "
          
      }
    }
    enviarmensaje(data)
    enviarmensaje(data1)
    enviarmensaje(datacliente)
   
  let paginas  =[
   "https://comparaisapres.cl",
   "https://sublimestore.cl",
   "https://fastcheckservice.cl",
   "https://sangucherianicho.cl",
   "https://centroesteticagustina.cl"
]
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  for (let i = 0; i < 5; i++) {
      console.log(`Waiting ${i} seconds...`);
      await sleep(i * 1000);
  }
  console.log('Done');
}

demo();


  paginas.forEach (element => enviarmensaje(textomensaje(element,num)));

    res.sendStatus(200);
    res.Status(200);
  }

  

  if (!req.isXHubValid()) {
    console.log('Warning - request header X-Hub-Signature not present or invalid');
    res.sendStatus(401);
    return;
  }



  //console.log('request header X-Hub-Signature validated');
  // Process the Facebook updates here
  received_updates.unshift(req.body);
  res.sendStatus(200);
   
} catch (error) {
}

//------------------------------------------
  
  
  
});

app.post('/cliente', function(req, res) {
try {
  console.log("ingresa a cliente "+ JSON.stringify(req.body))
console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  let num= req.body.numero
  let nom= req.body.nombre
  let correo= req.body.correo
  let mensaje= req.body.mensaje
  console.log("nombre "+ nombre)
  console.log("correo "+ correo)
  console.log("tel "+ num)
  console.log("mensaje "+ mensaje)
  console.log()
  
  let bodytext = "Formulario de *"+  nom +
  "* \n Numero: *"+num+ 
  "* \n Whatasapps: *https://wa.me/"+num+ 
  "* \n Correo: *"+ correo+"*"
  "* \n *Mensaje:* \n"+ mensaje


  let data1 ={
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": "56945038836",
    "type": "text",
    "text": {
        "body": bodytext
    }
  }
  let data2 ={
    "messaging_product": "whatsapp",
    "preview_url": false,
    "recipient_type": "individual",
    "to": "56945038836",
    "type": "text",
    "text": {
        "body": bodytext
    }
  }
  
  enviarmensaje(data1)
  enviarmensaje(data2)
  
  res.sendStatus(200)
  res.status(200)
  
  }
  catch (error) {
  
}
})


try {
  

app.post('/prueba/:num/:nombre', function(req, res) {

 let num= req.params.num
 let nom= req.params.nombre
 console.log("envia mensaje a "+nom);

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
          "text": nom
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

} catch (error) {
  
}
  
function textomensaje(element,num){
  let datacliente ={
    "messaging_product": "whatsapp",
    "to": num,
    "text": {
        "preview_url": true,
        "body": element
    }
  }
  return datacliente
   }
  

async function enviarmensaje(data){
  const url = "https://graph.facebook.com/v13.0/111960884887832/messages"

await fetch(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json',
  'Authorization': tokenpermanente }
}).then(res => res.json())
.then(json => console.log("json"));


return;

}


  










app.listen();


