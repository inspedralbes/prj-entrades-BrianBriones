import { io } from "socket.io-client";

// Apuntamos al puerto 4000 que es donde tienes Node.js, 
// no al 3000 (que es tu Nuxt)
export const socket = io("http://localhost:4000");
