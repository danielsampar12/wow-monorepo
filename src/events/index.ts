import { Socket } from 'socket.io';

import logEventsController from './log/controller';

class Events {
  listen(socket: Socket) {
    socket.on('log', logEventsController.handle);
  }
}

export default new Events();
