declare namespace Express {
  export interface Request {
    client_uuid: string;
    connectedUsers: {
      [userId: string]: string;
    };
    io: import('socket.io').Server;
  }
}
