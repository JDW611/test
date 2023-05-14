import { Router } from "express";
import * as tutorial from "../controller/controller";

const router = Router();

router.post("/api/tutorial", tutorial.create);

router.get("/api/tutorial", tutorial.findAll);

router.get("/api/tutorial/:id", tutorial.findOne);

router.put("/api/tutorial/:id", tutorial.update);

router.delete("/api/tutorial/:id", tutorial.remove);

export default router;
