import e from "express";
import { getNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/notesControllers.js";
import auth from "../middlewares/authentication.js";

const router = e.Router();

router.get("/api/notes", auth, getNotes);
router.get("/api/notes/:id", auth, getNoteById);
router.post("/api/notes", auth, createNote);
router.patch("/api/notes/:id", auth, updateNote);
router.delete("/api/notes/:id", auth, deleteNote);

export default router;