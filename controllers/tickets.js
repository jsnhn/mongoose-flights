const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create,
};

async function newTicket (req, res) {
    const flight = await Flight.findById(req.params.id); 
    const tickets = await Ticket.find({});
    res.render('tickets/new', {
        title: 'Add Ticket',
        tickets,
        flight
    })
}

async function create(req, res) {
    try {
        req.body.flight = req.params.id;
        await Ticket.create(req.body)
    } catch(err) {
        console.log(err)
    }
    res.redirect(`/flights/${req.params.id}`)
};