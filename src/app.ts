import express from 'express';
import { createServer } from 'node:http';
import swaggerUi from 'swagger-ui-express';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv';

import events from './events';
import logEventsController from './events/log/controller';
import docs from './swagger.json';
import { routes } from './routes';

dotenv.config();

class App {
  private connectedUsers: Record<string, string>;

  constructor(
    private readonly app = express(),
    public readonly server = createServer(app),
    private readonly io = new Server(server),
  ) {
    this.socket();
    this.middlewares();
    this.routes();

    this.connectedUsers = {};
  }

  middlewares() {
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;

      next();
    });
  }

  routes() {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs));
    this.app.use(routes);
  }

  socket() {
    this.io.on('connection', async (socket) => {
      const connectionTime = new Date();
      const { userId = null } = socket.handshake.query;

      if (userId && typeof userId === 'string') {
        this.connectedUsers[userId] = socket.id;

        events.listen(socket);

        socket.on('disconnect', () => {
          const disconnectionTime = new Date();
          delete this.connectedUsers[userId];

          logEventsController.handle({
            type: 'navigation',
            userId,
            datetime: connectionTime,
            endDatetime: disconnectionTime,
          });
        });
      }
    });
  }
}

export default new App().server;
