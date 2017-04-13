var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);

  if (request.text) {
    if (/^\/cool guy$/.test(request.text)) {
      this.res.writeHead(200);
      postMessage(cool());
      this.res.end();
    } else if (/^\/choose$/.test(request.text)) {
      this.res.writeHead(200);
      postMessage(choosePerson());
      this.res.end();
    } else if (/tryna start/.test(request.text)) {
      this.res.writeHead(200);
      postMessage("is that kwang tryna start again?");
      this.res.end();
    } else if (/^\/help$/.test(request.text)) {
      this.res.writeHead(200);
      postMessage(help());
      this.res.end();
    }
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function help() {
  return "commands available are /cool guy and /choose";
}

function choosePerson() {
  var people = ["cory", "franklin", "peter", "rich", "bernard", "michael", "kwang", "ept", "joe"];
  var index = Math.floor(Math.random() * people.length);
  return people[index];
}

function postMessage(message) {
  var options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : message
  };

  console.log('sending ' + message + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;