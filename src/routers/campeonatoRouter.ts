import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";
import Container from "typedi";
const router = Router();
import { CampeonatoController } from "../controllers/CampeonatoController";

const getController = (): CampeonatoController => {
  return Container.get<CampeonatoController>("CampeonatoController");
};

const createRouter = () => {
  router.get("/:id", (req, res) => getController().get(req, res));

  router.post("", authMiddleware, (req, res) =>
    getController().create(req, res)
  );

  router.delete("/:id", authMiddleware, (req, res) =>
    getController().remove(req, res)
  );

  return router;
};

export default createRouter;
