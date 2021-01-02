import express from 'express';
import mongoose from 'mongoose';

import NoteMessage from '../models/noteMessage.js';

const router = express.Router();

export const getNotes = async (req, res) => { 
    try {
        const noteMessages = await NoteMessage.find();
                
        res.status(200).json(noteMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getNote = async (req, res) => { 
    const { id } = req.params;

    try {
        const note = await NoteMessage.findById(id);
        
        res.status(200).json(note);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createNote = async (req, res) => {
    const { title, message, tags } = req.body;

    const newNoteMessage = new NoteMessage({ title, message, tags })

    try {
        await newNoteMessage.save();

        res.status(201).json(newNoteMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, message, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No note with id: ${id}`);

    const updatedNote = { title, message, tags, _id: id };

    await NoteMessage.findByIdAndUpdate(id, updatedNote, { new: true });

    res.json(updatedNote);
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No note with id: ${id}`);

    await NoteMessage.findByIdAndRemove(id);

    res.json({ message: "Note deleted successfully." });
}

// export const starNote = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No note with id: ${id}`);
    
//     const note = await NoteMessage.findById(id);

//     const updatedNote = await NoteMessage.findByIdAndUpdate(id, { starCount: note.starCount + 1 }, { new: true });
    
//     res.json(updatedNote);
// }


export default router;