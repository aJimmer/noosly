/* 
 *FYI: Using the keyword let instead of var – your variable will not be hoisted.
 * Hoisting means that the variable declarations get moved to the top of the function scope in which they are created.
 */

let socket;

function init(url) {
	socket = new WebSocket(url);
	console.log('Connecting...');
}

function registerOpenHandler(handlerFunction) {
	// 'arrow functions' work exactly the same as anonymous functions

	/*
	 * FYI: Using an anonymous function is more complicated than writing socket.onopen = handlerFunction. 
	 * This pattern will serve you well when you need to respond to an event but have intermediary 
	 * steps that must happen before forwarding it on – like writing a log message, as you have done here.
	 */

	socket.onopen = () => {
		console.log('open');
		handlerFunction();
	};
}

/*
 * Client receives an object from the server in its onmessage callback inside registerMessageHandler. 
 * This object represents the event and has a data property that contains the JSON string from the server.
 */

function registerMessageHandler(handlerFunction) {
	socket.onmessage = (event) => {
		console.log('message', event.data);
		let data = JSON.parse(event.data);
		handlerFunction(data);
	}
}

/* Not needed:
 * Send the string converted to JSON message to the WebSocket server.
 */
function sendMessage(payload) {
	socket.send(JSON.stringify(payload));
}

/* To be a functioning module, ws-client.js needs to export 
 * object code with the exported functions as its properties. 
 */

export default {
	init,
	registerOpenHandler,
	registerMessageHandler,
	sendMessage
}

 /* FYI: If the key and value have the same name, ES6 allows you to omit the colon and the value. 
  * The key will automatically be the variable name, and the value will automatically be the 
  * value associated with that name. This feature of ES6 is the 'enhanced object literal' syntax.
  */

// export default {
// 	init: init 
// }

