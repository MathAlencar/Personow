// app/socket/socket.ts
import { io, Socket } from "socket.io-client";

export const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"],
  autoConnect: false,
});

export function connectSocket() {
  if (typeof window === "undefined") return;

  if (socket.connected) {
    console.log("Socket já conectado.");
    return;
  }

  socket.connect();

  socket.on("connect", () => {
    console.log("🔥 Conectado ao Socket.IO. ID:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Desconectado do Socket.IO.");
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket.on("connect_error", (err: any) => {
    console.log("⚠️ Erro de conexão:", err.message);
  });
}
