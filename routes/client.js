const net = require('net');
const client = new net.Socket();
var returnString = "";
client.connect({ host:'localhost', port: 15555 });
client.on('data', (data) => {
  console.log(data.toString('utf-8'));
  returnString = data.toString('utf-8');
});

const sendData = (data) => {
  stringifiedJson = JSON.stringify(data);
  dataOut = `${stringifiedJson.replace('^','')}^`;
  client.write(dataOut);
}

const getData = () => {
	return returnString;
}

module.exports ={
    sendData,
    getData
}