const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    data: {
        type: Buffer
    },
    contentType: {
        type: String
    }
});

module.exports = mongoose.model('Document', DocumentSchema);
