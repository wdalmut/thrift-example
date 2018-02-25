const thrift = require('thrift');
const UserService = require('../gen-nodejs/UserService');
const ttypes = require('../gen-nodejs/user_types');
const assert = require('assert');

const transport = thrift.TBufferedTransport;
const protocol = thrift.TBinaryProtocol;

const connection = thrift.createConnection("localhost", 9090, {
  transport : transport,
  protocol : protocol
});

connection.on('error', function(err) {
  assert(false, err);
});

// Create a Calculator client with the connection
const client = thrift.createClient(UserService, connection);

client.ping(function(err, response) {
  console.log("--------------");
  console.log('ping()');
});


client.getUser(1, function(err, response) {
  if (err) {
    return console.error(err);
  }

  console.log("--------------");
  console.log("user with id: 1: " + JSON.stringify(response));
});

// Goes in Error
client.getUser(3, function(err, response) {
  if (err) {
    connection.end();
    console.log("--------------");
    return console.error(err);
  }
});

