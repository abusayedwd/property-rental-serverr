// const logger = require("../config/logger");

// const socketIO = (io) => {
//   io.on("connection", (socket) => {
//     console.log(`ID: ${socket.id} just connected`);

//     socket.on("join-room", (data, callback) => {
//       //console.log('someone wants to join--->', data);
//       if (data?.roomId) {
//         socket.join("room" + data.roomId);
//         callback("Join room successful");
//       } else {
//         callback("Must provide a valid user id");
//       }
//     });

//     socket.on("leave-room", (data) => {
//       if (data?.roomId) {
//         socket.leave("room" + data.roomId);
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log(`ID: ${socket.id} disconnected`);
//     });
//   });
// };

// module.exports = socketIO;

const logger = require("../config/logger");
const socketIO = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    socket.on("user_connected", (userId) => {
      console.log(`User ${userId} is online`);
      socket.join(userId); // Join the user to their own room
    });
  
    socket.on("join_chat", (chatId) => {
      console.log(`User joined chat: ${chatId}`);
      socket.join(chatId);
    });   
  
    socket.on("send_message", (data) => {
      console.log("New message received:", data); 
      io.to(data.chatId).emit("receive_message", data.message);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected");   
    });
  });
};

module.exports = socketIO;