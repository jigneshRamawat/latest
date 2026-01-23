import projectmodel from "../models/projectmondel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import storageService from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";

async function createProject(req, res) {
    console.log(req.user);
    console.log(req.body);
    console.log(req.file);

    const fileupload = await storageService.uploadfile(
        req.file.buffer,
        uuidv4() + ".png"
    );
    console.log(fileupload);

    const projectitem = await projectmodel.create({
        title: req.body.title,
        dec: req.body.dec,
        link: req.body.link,
        img: fileupload.url
    })
    res.status(201).json({ message: "project created", project: projectitem })


}

async function getProjectitems(req,res){
   const projectitem = await projectmodel.find()
   res.status(200).json({message:"fetch successfully",projectitem})
} 

async function deleteProject(req, res) {
    try {
        const { id } = req.params;

        const deleteItem = await projectmodel.findByIdAndDelete(id);

        if (!deleteItem) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            message: "Project deleted successfully",
            deletedProject: deleteItem
        });

    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default {
    createProject,
    getProjectitems,
     deleteProject

};
