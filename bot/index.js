let mqtt = require('mqtt');
const Discord = require('discord.js');
const client = new Discord.Client();

// MQTT Host
var mqtt_host = 'mqtt://soldier.cloudmqtt.com';

// MQTT Topic
var mqtt_topic = '/ESP/LED';

// MQTT Config
var options = {
    port: 10174,
    host: 'mqtt://soldier.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'brdhfcif',
    password: 'gviTCGqRHgB9',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};



client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login('ODY2MzI2NzQ5NzI1ODUxNjUw.YPQ7qA.QJPbQjJyDLZ4vKsnmi5IUN-HUwY');

client.on('message',gotMessage);

const replies = [
    'สวัสดี',
    'สวัสดีจ้าาาาาา',
    'สวัสดีค่ะ',
    'ดีจ้า'
]

function gotMessage(message){
    console.log(message.content);
    if(message.content=="สวัสดี" && message.channel.id=='866326214246400003'){
        // message.channel.send("สวัสดีจ้าทุกคน");
        const index = Math.floor(Math.random()*replies.length);
        message.reply(replies[index]);
    }else if(message.content=="กินข้าวแล้วยัง"){
        //message.channel.send("กินแล้วเทอกินด้วยนะ อิอิ");
        message.reply("กินแล้วเทอกินด้วยนะ อิอิ");
    }else if(message.content=="รูปภาพ"){
        message.channel.send("https://lh3.googleusercontent.com/proxy/rxxG6fwvsbLCzHWj_GfC1enOX49BUisq6FDIbUWS7odhMEqjk_qJiRJa4YnHVaAHe_ThJQwz9FdeGDHlBsftQS3lw6BVCiuGk41KYjBAHVnNEDdwey3sGLaeIEy17p6FMu9qzajhUlumAy-evhYs6gNFEce_JtQ85mx25dAj6meYO6ihuy1LUAFbILkr6vGc0yMh99uBvcJr7I9Hw8ysFgT_t5J23_W1RSTLkdXxCPK6u9jYeUhQDelkRIMZSFcDomZB3Hg8AkkX56eD_w6OWgkFaXwxgIJYhWOKQ4VvmQ9eX1I4H9YB1Fy6yeMPC5gDOaENkEwgp_hNIX9eHTDHLODncLFB8vsWmaOEeVEU1ZkYuXaJixiqSfhGGxsrtPq6sNGk7X4JiM9A8Q");
    }else if(message.content=="วิดีโอ"){
        message.channel.send("https://www.youtube.com/watch?v=jFtv6iJbJP4");
    }
    else if(message.content=="เปิดไฟ"){
        message.channel.send("เปิดไฟเรียบร้อย");
        sendMsg ("relay1_on");
    }
    else if(message.content=="ปิดไฟ"){
        message.channel.send("ปิดไฟเรียบร้อย");
        sendMsg ("relay1_off");
    }
}


function sendMsg (msg_mqtt) {
    var client = mqtt.connect(mqtt_host, options);
    client.on('connect', function() { // When connected
        console.log('MQTT connected');
        // subscribe to a topic
        client.subscribe(mqtt_topic, function() {
            // when a message arrives, do something with it
            client.on('message', function(topic, message, packet) {
                console.log("Received '" + message + "' on '" + topic + "'");
            });
        });
        
  
        // publish a message to a topic
        client.publish(mqtt_topic, msg_mqtt, function() {
            console.log("Message is published");
            client.end(); // Close the connection when published
        });
        
    });
      
  }

