package it.clup.test;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import it.clup.entities.Customer;
import it.clup.entities.LineUpRequest;
import it.clup.entities.Supermarket;

public class LineUpRequestTest {
	
	@Test
	public void TestCreation() {
		
		Supermarket s = new Supermarket("esselunga", 1, 600000);
		Customer c1 = new Customer("enrico", "enrico@a", "a");
		LineUpRequest l1 = new LineUpRequest(c1, s, 0, 0, 0);
		

		assertEquals("esselunga", l1.getMarket().getName());
		assertEquals("enrico", l1.getCustomer().getUsername());
		
	
	}
	
}
