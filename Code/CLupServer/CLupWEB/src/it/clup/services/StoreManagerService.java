package it.clup.services;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import it.clup.entities.StoreManager;
import it.clup.entities.Supermarket;


// This class is provided for future extentions
@Stateless
@ApplicationPath("/")
public class StoreManagerService {

	@PersistenceContext(unitName = "CLupEJB")
	private EntityManager em;

	// 1. Login method: it checks whether in the DB there is a Store Manager with
	// certain
	// username and password).
	@GET
	@Path("/stlogin")
	@Produces("application/json")
	public String checkAuthentication(@QueryParam("username") String username,
			@QueryParam("password") String password) {

		// checkAuthentication exploits the NamedQuery "StoreManager.checkCredentials"
		String pattern = "{ \"success\":\"%s\"}";

		StoreManager manager = null;
		try {
			manager = em.createNamedQuery("StoreManager.checkCredentials", StoreManager.class).setParameter(1, username)
					.setParameter(2, password).getSingleResult();
			System.out.println("StoreManager successfully logged in!");
			return String.format(pattern, 1);

		} catch (Exception e) {
			System.out.println("Impossible to perform StoreManager login");
			return String.format(pattern, 0);
		}
	}

	// 2. Registration method: it saves a new Store Manager in the DB, storing his
	// username, email, password and marketId.
	@POST
	@Transactional
	@Path("/stsignup")
	@Consumes("application/json")
	public String storeManagerReg(@QueryParam("username") String username, @QueryParam("email") String email,
			@QueryParam("password") String password, @QueryParam("market") String market) {

		String pattern = "{ \"success\":\"%s\"}";

		// Check if the name passed as a parameter exists in the database.
		Supermarket supermarket = null;
		try {
			supermarket = em.createNamedQuery("Supermarket.retrieveID", Supermarket.class).setParameter(1, market)
					.getSingleResult();

		} catch (Exception e) {
			System.out.println("The supermarket indicated by the StoreManager does not exist");
			return String.format(pattern, 0);
		}

		StoreManager manager = new StoreManager(username, email, password, supermarket);
		// The customer is inserted in the DB by means of em.persist and em.flush
		// methods (JPA)
		try {
			em.persist(manager);
			em.flush();

		} catch (Exception e) {
			System.out.println("Could not register the StoreManager");
			return String.format(pattern, 0);
		}
		System.out.println("StoreManager successfully registered");
		return String.format(pattern, 1);

	}

	// 3. TicketEntrance
	/*@GET
	@Path("/entrticket")
	@Produces("application/json")
	public String addTicket(@QueryParam("supermarket") String supermarket) {

		// 1. recupera con query il super relativo al nome
		Supermarket s = new Supermarket(supermarket, 1, 60000);

		s.ticketEntrance();

		String pattern = "{ \"success\":\"%s\", \"store\":\"%s\", \"queue\": \"%s\"}";
		return String.format(pattern, 1, s.getInside(), s.getQueue());
	}
*/
	
	/*
	// 4. TicketExit
	// C'è un bug nella rimozione del no tech ma sono troppo cotto per controllare
	// ora lol
	@GET
	@Path("/exitticket")
	@Produces("application/json")
	public String removeTicket(@QueryParam("supermarket") String supermarket) {

		// 1. recupera con query il super relativo al nome
		Supermarket s = new Supermarket(supermarket, 1, 60000);
		s.ticketEntrance();

		s.ticketExit();

		String pattern = "{ \"success\":\"%s\", \"store\":\"%s\", \"queue\": \"%s\"}";
		return String.format(pattern, 1, s.getInside(), s.getQueue());
	}
*/
	
	/*
	// 4. Affluence
	@GET
	@Path("/affluence")
	@Produces("application/json")
	public String checkAffluence(@QueryParam("supermarket") String supermarket) {

		// 1. recupera con query il super relativo al nome
		Supermarket s = new Supermarket(supermarket, 1, 60000);

		String pattern = "{ \"ticket\":\"%s\", \"store\":\"%s\", \"queue\": \"%s\", \"available\": \"%s\"}";
		return String.format(pattern, s.getInside(), s.getInside(), s.getQueueSize(), s.getCapacity() - s.getInside());
	}
	*/

}