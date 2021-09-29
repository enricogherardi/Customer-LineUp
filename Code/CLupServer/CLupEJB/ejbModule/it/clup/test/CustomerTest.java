package it.clup.test;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import it.clup.entities.Customer;


public class CustomerTest {
	
	@Test
	public void TestCreation() {
		
		Customer c1 = new Customer("enrico", "enrico@a", "a");
		assertEquals("enrico", c1.getUsername());
		assertEquals("enrico@a", c1.getEmail());
		assertEquals("a", c1.getPassword());
		
	}
	
}
