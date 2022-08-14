import { Router } from "express";
import { getArtist, getArtists, saveArtist } from "./artist.controller";

const artistRouter = Router();

//Save new Artist
artistRouter.post("/", saveArtist);

//Update artist
artistRouter.put("/:id", saveArtist);

//get all Artists
artistRouter.get("/", getArtists);

//get Artist by Id
artistRouter.get("/:id", getArtist);

export default artistRouter;
