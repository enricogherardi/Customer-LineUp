package it.clup.services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import it.clup.entities.Customer;
import it.clup.entities.LineUpRequest;
import it.clup.entities.Supermarket;
import it.clup.utilities.LineUpReqBody;
import it.clup.utilities.Result;

@Stateless
@ApplicationPath("/")
public class CustomerService {
	@PersistenceContext(unitName = "CLupEJB")
	private EntityManager em;

	// 1. Login method: it checks whether in the DB there is a Customer with certain
	// username and password).
	@GET
	@Path("/login")
	@Produces("application/json")
	public Response checkAuthentication(@QueryParam("username") String username,
			@QueryParam("password") String password) {

		// checkAuthentication exploits the NamedQuery "Customer.checkCredentials"

		Customer customer = null;
		try {

			customer = em.createNamedQuery("Customer.checkCredentials", Customer.class).setParameter(1, username)
					.setParameter(2, password).getSingleResult();
			System.out.println("Customer successfully logged in!");
			Result res = new Result("1");
			return Response.status(Response.Status.OK).entity(res).build();

		} catch (Exception e) {

			System.out.println("Impossible to perform Customer login");
			Result res = new Result("0");
			return Response.status(Response.Status.OK).entity(res).build();

		}
	}

	// 2. Registration method: it saves a new Customer in the DB, storing his
	// username, email and password.
	@POST
	@Transactional
	@Path("/signup")
	@Consumes("application/json")
	public Response customerReg(@QueryParam("username") String username, @QueryParam("email") String email,
			@QueryParam("password") String password) {

		Customer customer = new Customer(username, email, password);

		// The customer is inserted in the DB by means of em.persist and em.flush
		// methods (JPA)
		try {

			em.persist(customer);
			em.flush();

		} catch (PersistenceException e) {

			System.out.println("Could not register the Customer");
			e.printStackTrace();
			Result res = new Result("0");
			return Response.status(Response.Status.OK).entity(res).build();

		}

		System.out.println("Customer successfully registered");
		Result res = new Result("1");
		return Response.status(Response.Status.OK).entity(res).build();
	}

	// 3. Method for creating a new LineUpRequest
	@POST
	@Transactional
	@Path("/addlineupreq")
	@Produces("application/json")
	public Response addLineUpRequest(@QueryParam("username") String username, @QueryParam("marketId") String marketId) {

		LineUpRequest req = null;
		Supermarket market = null;
		Customer customer = null;

		try {

			// The customer is retrieved by means of the NamedQuery "Customer.retrieveId"
			// based on his username
			customer = em.createNamedQuery("Customer.retrieveId", Customer.class).setParameter(1, username)
					.getSingleResult();
			// The market is retrieved through its Id using the find method of JPA
			market = em.find(Supermarket.class, Integer.parseInt(marketId));

			long requestTime = System.currentTimeMillis();
			long entranceTime = 0;
			long exitTime = 0;

			req = new LineUpRequest(customer, market, requestTime, entranceTime, exitTime);

			// The LineUpRequest is added through the qrRequest of Supermarket
			market.qrRequest(req);

			// store the LineUpRequest with persist() method and update with flush()
			em.persist(req);
			em.flush();

		} catch (Exception e) {

			// e.printStackTrace(); For debugging
			System.out.println("Could not add a new LineUpRequest");
			LineUpReqBody res = new LineUpReqBody("0", 0, 0, 0, 0);
			return Response.status(Response.Status.OK).entity(res).build();

		}

		System.out.println("New LineUpRequest successfully sent ");

		// The waitingTime is divided by 1000 to return the value in seconds
		LineUpReqBody res = new LineUpReqBody("1", req.getWaitingTime() / 1000,
				market.getQueueSize() - market.getNumInside(), req.getId(), market.getNumInside());
		return Response.status(Response.Status.OK).entity(res).build();

	}

	// 4. Method for Customer entrance
	@GET
	@Path("/entrlineup")
	@Produces("application/json")
	public Response LineUpEntrance(@QueryParam("requestId") String requestId) {

		LineUpRequest request = null;
		Supermarket market = null;

		try {

			// The request and market are retrieved through their Id using the find() method
			// of JPA
			request = em.find(LineUpRequest.class, Integer.parseInt(requestId));
			market = em.find(Supermarket.class, request.getMarket().getId());

		} catch (Exception e) {

			// e.printStackTrace(); For debugging
			LineUpReqBody res = new LineUpReqBody("0", 0, 0, 0, 0);
			return Response.status(Response.Status.OK).entity(res).build();
		}

		System.out.println("Customer has entered the supermarket");

		// If the Customer is not entered yet and the Supermarket is not full, then he
		// is allowed to enter
		if (request.getEntrance() == false && (market.getNumInside() < market.getCapacity())) {

			market.qrEntrance(request);

		} else {

			LineUpReqBody res = new LineUpReqBody("0", 0, 0, 0, 0);
			return Response.status(Response.Status.OK).entity(res).build();

		}

		// The
		LineUpReqBody res = new LineUpReqBody("1", request.getWaitingTime() / 1000,
				market.getQueueSize() - market.getNumInside(), request.getId(), market.getNumInside());
		return Response.status(Response.Status.OK).entity(res).build();

	}

	// 5. Method for removing a LineUpRequest
	@POST
	@Transactional
	@Path("/dellineupreq")
	@Consumes("application/json")
	public Response DeleteLineUpRequest(@QueryParam("requestId") String requestId) {

		Customer customer = null;
		Supermarket market = null;
		LineUpRequest request = null;
		try {

			// The find method is used to retrieve the correct LineUpRequest based on its
			// requestId

			request = em.find(LineUpRequest.class, Integer.parseInt(requestId));

			if (request == null) {

				System.out.println("There is no LineUpRequest for this Customer");
				Result res = new Result("0");
				return Response.status(Response.Status.OK).entity(res).build();

			}

			market = em.find(Supermarket.class, request.getMarket().getId());

			market.removeLineUpRequest(request);

			// remove method is used to delete the LineUpRequest from the database and
			// flush() to update

			em.remove(request);
			em.flush();

		} catch (Exception e) {

			e.printStackTrace();
			System.out.println("Error during LineUpRequest deletion");
			Result res = new Result("0");
			return Response.status(Response.Status.OK).entity(res).build();

		}

		Result res = new Result("1");
		return Response.status(Response.Status.OK).entity(res).build();

	}

	// 5. Method for showing all the available Supermarkets to the Customer
	@GET
	@Path("/retrmarkets")
	@Produces("application/json")
	public Response retrieveSupermarkets() {

		List<Supermarket> marketList = null;

		try {

			marketList = em.createNamedQuery("Supermarket.retrieveAll", Supermarket.class).getResultList();

		} catch (Exception e) {

			e.printStackTrace();
			System.out.println("Error in sending back the list of Supermarkets to the Customer");
			return Response.status(Response.Status.OK).entity(marketList).build();

		}

		System.out.println("List of Supermarkets sent to the Customer");
		return Response.status(Response.Status.OK).entity(marketList).build();

	}

}