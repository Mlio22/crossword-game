import { io } from "socket.io-client";
import SERVER from "./constants";

const socket = io(SERVER);
socket.on("connect", () => console.log(socket.id));
socket.on("connect_error", () => {
  setTimeout(() => socket.connect(), 5000);
});
socket.on("disconnect", () => setTime("server disconnected"));

export default socket
