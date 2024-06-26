const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema ({
    seat: {
        type: String,
        match: /[A-F][1-9]\d?/
    },
    price: {
        type: Number,
        min: 0
    },
    flight: {
        type: Schema.Types.ObjectId, //this can only store data that is object id. they look like strings but are objects
        ref: 'Flight', // letting mongoose know whatever id this is, it is pointing to the flight object
    },
});

module.exports = mongoose.model('Ticket', ticketSchema)