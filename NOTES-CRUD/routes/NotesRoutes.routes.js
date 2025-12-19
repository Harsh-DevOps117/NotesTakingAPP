import express from "express";
import { CreateNOTES, deleteNotes, GetNotes, updateNotes } from "../controller/createNOTESCRUD.js";

const Router=express.Router();

Router.post("/create",CreateNOTES)
Router.get("/getnotes",GetNotes)
Router.delete("/delete/:id",deleteNotes)
Router.put("/update/:id",updateNotes)

export default Router
