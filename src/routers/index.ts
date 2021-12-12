import * as express from "express";
import createUserRouter from "./userRouter";
import createEnderecoRouter from "./enderecoRouter";
import createRodadaRouter from "./rodadaRouter";
import createTimeRouter from "./timeRouter";
import createCampeonatoRouter from "./campeonatoRouter";
import createApostaRouter from "./apostaRouter";

const createRouters = (app: express.Express) => {
  app.use("/users", createUserRouter());
  app.use("/enderecos", createEnderecoRouter());
  app.use("/rodadas", createRodadaRouter());
  app.use("/times", createTimeRouter());
  app.use("/campeonatos", createCampeonatoRouter());
  app.use("/apostas", createApostaRouter());
};

export default createRouters;
