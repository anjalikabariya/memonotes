import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createNote, updateNote } from '../../actions/notes';

const Form = ({ currentId, setCurrentId }) => {
  const [noteData, setNoteData] = useState({ title: '', message: '', tags: '' });
  const note = useSelector((state) => (currentId ? state.notes.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (note) setNoteData(note);
  }, [note]);

  const clear = () => {
    setCurrentId(0);
    setNoteData({ title: '', message: '', tags: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createNote(noteData));
      clear();
    } else {
      dispatch(updateNote(currentId, noteData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing Note: "${note.title}"` : 'Creating a Note'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={noteData.title} onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={noteData.message} onChange={(e) => setNoteData({ ...noteData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={noteData.tags} onChange={(e) => setNoteData({ ...noteData, tags: e.target.value.split(',') })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
