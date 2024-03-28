const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket,
};

async function newTicket (req, res) {
    const flight = await Flight.findById(req.params.id); 
    res.render('tickets/new', {
        title: 'Add Ticket',
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

async function deleteTicket(req, res){
    try {
        const ticket = await Ticket.findById(req.params.id);
        await Ticket.findByIdAndDelete(req.params.id)
        res.redirect(`/flights/${ticket.flight}`)
    } catch (err) {
        console.log(err)
    }
}

// async function deleteTicket(req, res){
//     try {
//         await Ticket.findByIdAndDelete(req.params.id);
//         res.redirect(`/flights/${req.params.id}`)
//     } catch (err) {
//         console.log(err)
//     }
// }