import io from 'socket.io-client';
import { getToken } from 'common/js/auth';
import eventKeys from './socket-event-keys';
import SocketIoClient from './socketIoClient';

const url = 'http://172.17.17.27:8090';
// const url = 'localhost:3322';

const options = {
  // port: '8080',
  // path: '/LcTakerServer/websocket/demo',
  // parser: parser,
  // forceNew: true,
  query: {
    'AUTH-TOKEN': getToken()
  },
  transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
}

const client = new SocketIoClient(io, url, options, eventKeys);

export default client

// // 1. 先安装：npm install socket.io-client --save

// import io from 'socket.io-client';
// import { getToken } from 'common/js/auth';
// import eventKeys from './socket-event-keys';

// const url = 'http://172.17.17.27:8090';
// // const url = 'localhost:3322';

// const socket = io(url, {
//   // port: '8080',
//   // path: '/LcTakerServer/websocket/demo',
//   // parser: parser,
//   query: {
//     'AUTH-TOKEN': getToken()
//   },
//   /*  whether to reuse an existing connection */
//   // forceNew: true,
//   transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
// });

// socket.on('connect', () => {
//   console.log(`socket connected. socket id = ${socket.id}`);
// });

// socket.on('connect_error', (error) => {
//   console.log(`socket connect_error: ${error}. socket id = ${socket.id}.`);
// });

// socket.on('message', (msg) => {
//   console.log(`socket message: ${msg}`);
// });

// socket.on('reconnect', (attemptNumber) => {
//   console.log(`socket reconnect: ${attemptNumber}. socket id = ${socket.id}.`);
// });

// // Fired upon an attempt to reconnect
// socket.on('reconnect_attempt', (attemptNumber) => {
//   // socket.io.opts.transports = ['polling', 'websocket'];
// });

// // Fired upon a disconnection.
// socket.on('disconnect', (reason) => {
//   console.log(`socket disconnect. socket id = ${socket.id}. reason { ${reason} }`);
// });


// socket.on(eventKeys.EVENT_REQUEST_QUOTE, (socketData) => {
//   console.log(socketData);
// });

// socket.on(eventKeys.EVENT_DEAL_DEALT, (socketData) => {
//   console.log(socketData);
// });

// Object.defineProperty(socket, 'eventKeys', { value: eventKeys });

// console.log(socket);
// export default socket;
