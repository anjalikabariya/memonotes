import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
// import StarIcon from '@material-ui/icons/Star'
import EditIcon from '@material-ui/icons/Edit'
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deleteNote } from '../../../actions/notes';
import useStyles from './styles';

const Note = ({ note, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.title}>
          <Typography gutterBottom variant="h5" component="h2">{note.title}</Typography>
          <Typography variant="body2">{moment(note.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{note.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{note.message}</Typography>
        </div>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {/* <Button size="small" color="primary" onClick={() => dispatch(starNote(note._id))}><StarIcon fontSize="small" /> Star </Button> */}
        <Button size="small" color="primary" onClick={() => setCurrentId(note._id)}> <EditIcon fontSize="small" /> Edit </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deleteNote(note._id))}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Note;
