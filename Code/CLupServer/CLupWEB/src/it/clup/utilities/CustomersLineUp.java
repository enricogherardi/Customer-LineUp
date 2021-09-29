package it.clup.utilities;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import it.clup.services.CustomerService;
import it.clup.services.StoreManagerService;

@ApplicationPath("/")
public class CustomersLineUp extends Application {

	public Set<Class<?>> getClasses() {
		return new HashSet<Class<?>>(Arrays.asList(CustomerService.class, StoreManagerService.class));

	}

}