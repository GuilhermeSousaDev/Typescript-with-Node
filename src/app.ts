import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import { mongoURI } from './config/config'

import userRoute from './routes/user.route'

export class App {
  private express: express.Application
  private port = 9090

  constructor() {
    this.express = express() 
    this.routes()
    this.middlewares()
    this.database()
    this.listen()
  }

  public getApp(): express.Application {
    return this.express
  }

  private database() :void {
    mongoose.connect(mongoURI).then(() => console.log("Conectado com Sucesso"))
  }

  private middlewares() :void {
      this.express.use(cors())
      this.express.use(express.json())
      this.express.use(bodyParser.urlencoded({ extended: false }))
      this.express.use(bodyParser.json())
  }

  private routes() :void {
    this.express.use('/user', userRoute)
  }

  private listen() :void {
    this.express.listen(this.port, () => console.log("Servidor iniciado na porta " + this.port))
}
}
