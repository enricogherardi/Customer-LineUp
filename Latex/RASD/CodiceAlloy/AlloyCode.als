open util/time
open util/boolean

sig Customer {
	id: one Int,
	hasDevice: one Bool
}{
	id > 0
}
sig Supermarket {
	id: one Int,
	capacity: one Int
}{
	id > 0
	capacity > 0 and capacity < 5
}
abstract sig Request {
	custumer: one Customer,
	state: State one -> Time,
	supermarket: Supermarket
}
sig LineUpRequest extends Request {
	qrCode: one QRCode
}
sig BookingRequest extends Request {
	booking: one Booking
}
sig TicketEntrance {
	ticket: one Ticket,
	customer: one Customer,
	supermarket: one Supermarket
}
sig Ticket {
	number: one Int
}{
	number > 0
}
sig QRCode {
	id: one Int
}{
	id > 0
}
sig Booking {
	id: one Int
}{
	id > 0
}


abstract sig State {}
one sig Reserved extends State{}
one sig Started extends State{}
one sig Finished extends State{}

//Fact

//Unique Istances
fact uniqueQRCode {
	all disj c, c': QRCode | c.id != c'.id
}
fact uniqueBooking {
	all disj b, b': Booking | b.id != b'.id
}
fact uniqueTicket {
	all disj t, t': Ticket | t.number != t'.number
}
fact uniqueCustomer {
	all disj a, a': Customer | a.id != a'.id
}

//Only not-Tech User can have a ticket
fact ticketForNoTech {
	all t: TicketEntrance | t.customer.hasDevice = False
}
fact RequestForTechCustomer {
	all q: Request | q.custumer.hasDevice = True
}

//A QRCode, Booking, Ticket has to be associated to its Request
fact allQRCodeInLineUPRequest  {
	all q: QRCode | one l: LineUpRequest | q.id = l.qrCode.id
}
fact allBookingInBookingRequest {
	all b: Booking | one r: BookingRequest | b.id = r.booking.id
}
fact allTicketInEntrance {
	all t: Ticket | one e: TicketEntrance | t.number = e.ticket.number
}

//The number of client inside the Supermarket cannot exced its capacity
/*fact notFullSupermarket {	
	let x = Started
	let y = 
	all s: Supermarket | #Request.x.s < s.capacity
}*/
//Request static Behavior
fact requestStateChart {
	//A request is always created as "Reserved"
	all r: Request | one t': Time | r.state.t' = Reserved
	all r: Request, t: Time |
		//Once a Request is finished it cannot change status again
		(r.state.t = Finished =>
			all t': Time | gte[t',t] => r.state.t' = Finished)
		and
		//Once a Request is started it cannot get back to Reserved
		(r.state.t = Started =>
			all t': Time | gte[t',t] => r.state.t' = Reserved)
}

//A user can be envolved in one "Started" request per time
fact oneStartedPerUser {
	no disj r,r': Request |
		r.custumer = r'.custumer and
			some t: Time |
				r.state.t = Started and r'.state.t = Started
}

//DYNAMIC MODELLING
pred isCustomerInARequest[c: Customer, t: Time] {
	one r: Request | r.state.t = Started and r.custumer = c
}

run isCustomerInARequest for 3
 
//pred for supermarket
pred makeALineUpRequest[c: Customer, q: QRCode, t: Time, r': LineUpRequest]{
	//precondition
	not isCustomerInARequest[c,t]
	//postcondition
	r'.custumer = c
	r'.qrCode = q
	not isCustomerInARequest[c,t.next]
	r'.state.(t.next) = Reserved
}

run makeALineUpRequest for 3

pred makeABookingRequest[c: Customer, b: Booking, t: Time, r': Request]{
	//precondition
	not isCustomerInARequest[c,t]
	//postcondition
	r'.custumer = c
	r'.booking = b
	not isCustomerInARequest[c,t.next]
	r'.state.(t.next) = Reserved
}

run makeABookingRequest for 3

pred startARequest[r: Request, t: Time]{
	//precondition
	not isCustomerInARequest[r.custumer,t]
	r.state.t = Reserved
	//postcondition
	r.state.(t.next) = Started
	isCustomerInARequest[r.custumer,t.next]
}

run startARequest for 3

pred endARequest[r: Request, t: Time] {
	//precondition
	isCustomerInARequest[r.custumer,t]
	r.state.t = Reserved or r.state.t = Started
	//postcondition
	r.state.(t.next) = Finished
	not isCustomerInARequest[r.custumer,t.next]
}

run endARequest for 3

//Pred Show
//run makeALineUpRequest for 3 but int 
pred show {
	#Customer = 3
	#TicketEntrance = 1
	#BookingRequest = 1
	#LineUpRequest = 1
	#Supermarket = 1
}
run show for 3

