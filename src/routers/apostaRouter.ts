import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";
import Container from "typedi";
const router = Router();
import { ApostaController } from "../controllers/ApostaController";

const getController = (): ApostaController => {
  return Container.get<ApostaController>("ApostaController");
};

const createRouter = () => {
  router.get("", authMiddleware, (req, res) => getController().list(req, res));
  router.get("/:id", authMiddleware, (req, res) =>
    getController().get(req, res)
  );
  router.post("", authMiddleware, (req, res) =>
    getController().create(req, res)
  );
  router.patch("/:id", authMiddleware, (req, res) =>
    getController().update(req, res)
  );

  return router;
};

export default createRouter;
