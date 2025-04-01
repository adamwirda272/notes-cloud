import notes from "../models/notesModels.js";

export const getNotes = async (req, res) => {
    try {
        const allNotes = await notes.findAll({ where : { user_id: req.user.id } });
        res.status(200).json(allNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await notes.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = await notes.create({
            title,
            content,
            user_id: req.user.id
        });
        res.status(201).json({ note: newNote, message: "Note created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateNote = async (req, res) => {
    const { title, content } = req.body;

    try {
        const note = await notes.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        note.title = title;
        note.content = content;
        await note.save();
        res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const note = await notes.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        await note.destroy();
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}