import { Router } from "express";
import Container from "typedi";
const router = Router();
import { RodadaController } from "../controllers/RodadaController";

const getController = (): RodadaController => {
  return Container.get<RodadaController>("RodadaController");
};

const createRouter = () => {
  router.get("", (req, res) => getController().listar(req, res));
  router.post("", (req, res) => getController().criar(req, res));
  return router;
};

export default createRouter;
