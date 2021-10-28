import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { mongoURI } from './config/config'

import userRoute from './routes/user.route'
import messageRoute from './routes/message.route'

export class App {
  private express: express.Application
  private port = 8081

  constructor() {
    this.express = express() 
    this.routes()
    this.middlewares()
    this.database()
    this.listen()
  }

  private database() :void {
    mongoose.connect(mongoURI).then(() => console.log("Conectado com Sucesso"))
  }

  private middlewares() :void {
      this.express.use(cors())
  }

  private routes() :void {
    this.express.use(express.json())
    this.express.use(express.urlencoded())
    //routes
    this.express.use('/user', userRoute)
    this.express.use('/message', messageRoute)
  }

  private listen() :void {
    this.express.listen(this.port, () => console.log("Servidor iniciado na porta " + this.port))
}
}
