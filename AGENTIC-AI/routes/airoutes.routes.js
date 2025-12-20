import express from "express"
import ResponseAI from "../controller/ResponseAI.js"

const Router=express.Router()

Router.post("/response",ResponseAI)
export default Router
