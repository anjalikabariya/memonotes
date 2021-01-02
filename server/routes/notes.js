import express from 'express';

import { getNotes, getNote, createNote, updateNote, deleteNote } from '../controllers/notes.js';

const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.get('/:id', getNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);
// router.patch('/:id/starNote', starNote);

export default router;