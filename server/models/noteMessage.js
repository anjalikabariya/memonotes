import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    title: String,
    message: String,
    tags: [String],
    // starCount: {
    //     type: Number,
    //     default: 0,
    // },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var NoteMessage = mongoose.model('NoteMessage', noteSchema);

export default NoteMessage;