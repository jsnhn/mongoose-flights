const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    index,
    new: newFlight,
    create,
    show,
};
    
async function index(req, res) {
    try {
        const flights = await Flight.find({}).sort({departs: -1})
        // console.log(flights);
        res.render('flights/index', {
            flights
        });
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    console.log('dt: ', dt)
   
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    console.log('departsDate: ', departsDate)
    res.render('flights/new', { 
        departsDate,
        errorMsg: '',
     });
}

async function create(req, res) {
    for(let key in req.body){
        if(req.body[key] === '') delete req.body[key]
    }
    try {
        await Flight.create(req.body)
        res.redirect('flights')
    } catch(err) {
        console.log(err)
        res.render('/flights/new', {errorMsg: err.message})
    }
}

async function show(req, res) {

    try {
        const flight = await Flight.findById(req.params.id); 
        flight.destinations.sort((a, b) => b.arrival - a.arrival); //js object. unless you do flight.save() it wont be reflected in mongo
        const tickets = await Ticket.find({ flight: flight._id });
    
        res.render('flights/show', {
            title: 'Flight Details',
            flight,
            tickets })
    } catch(err) {
        console.log(err)
        res.redirect('/flights')
    }
}

 

