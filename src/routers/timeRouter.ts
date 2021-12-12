import { Router } from "express";
import Container from "typedi";
const router = Router();
import { TimeController } from "../controllers/TimeController";

const getController = (): TimeController => {
  return Container.get<TimeController>("TimeController");
};

const createRouter = () => {
  router.get("/:id/partidas-mandante", (req, res) =>
    getController().partidasMandante(req, res)
  );
  router.get("/:id/partidas-visitante", (req, res) =>
    getController().partidasVisitante(req, res)
  );
  router.get("/:id/partidas", (req, res) => getController().partidas(req, res));
  return router;
};

export default createRouter;
