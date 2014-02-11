/** @jsx React.DOM */
// connect to the socket server
var socket = io.connect();

// if we get an "info" emit from the socket server then console.log the data we recive
socket.on('info', function (data) {
    console.log(data);
});

React.renderComponent(
  <h1>Hello, world!</h1>,
  document.getElementById('content')
);
