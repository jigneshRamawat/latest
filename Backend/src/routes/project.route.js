import express from "express";
import projectControler from "../controller/project.controler.js"
import authMiddleware from "../midleware/auth.millerware.js";
import multer from "multer";

const router = express.Router();

const upload = multer({
    storage:multer.memoryStorage(),
})

router.post("/project", authMiddleware.authProjectMiddleware , upload.single("image") , projectControler.createProject);
router.get("/all" , projectControler.getProjectitems)
router.delete("/project/:id",  projectControler.deleteProject);


export default router;
