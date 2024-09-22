import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway(4002)
export class MyGateWay implements OnModuleInit {

    // config websocket
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log(socket);
    });
  }
  @WebSocketServer()
  server: Server;

  // send message to server
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);


    // send message from server to websocket
    this.server.emit("onMessage",{
        msg:'New Message',
        body:body
    })
  }
}
