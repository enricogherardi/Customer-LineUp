package it.clup.test;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import it.clup.entities.Customer;
import it.clup.entities.LineUpRequest;
import it.clup.entities.Supermarket;

public class SupermarketTest {
	
	@Test
	public void TestRequest() {
		
		Supermarket s = new Supermarket("esselunga", 1, 600000);
		Customer c1 = new Customer("enrico", "enrico@a", "a");
		LineUpRequest l1 = new LineUpRequest(c1, s, 0, 0, 0);
		
		s.qrRequest(l1);
		assertEquals(1, s.getQueueSize());
		
	}
	
	@Test
	public void TestEntrance() {
		
		Supermarket s = new Supermarket("esselunga", 1, 600000);
		Customer c1 = new Customer("enrico", "enrico@a", "a");
		LineUpRequest l1 = new LineUpRequest(c1, s, 0, 0, 0);
		
		s.qrRequest(l1);
		s.qrEntrance(l1);
		assertEquals(1, s.getNumInside());
		
	}
	
	@Test
	public void TestEntranceLimit() {
		
		Supermarket s = new Supermarket("esselunga", 1, 600000);
		Customer c1 = new Customer("enrico", "enrico@a", "a");
		Customer c2 = new Customer("ludo", "ludo@a", "b");
		LineUpRequest l1 = new LineUpRequest(c1, s, 0, 0, 0);
		LineUpRequest l2 = new LineUpRequest(c2, s, 0, 0, 0);
		
		s.qrRequest(l1);
		s.qrRequest(l2);
		s.qrEntrance(l1);
		s.qrEntrance(l2);

		assertEquals(1, s.getNumInside());
		
	}
	
	@Test
	public void TestWaitingTime() {
		
		Supermarket s = new Supermarket("esselunga", 1, 600000);
		Customer c1 = new Customer("enrico", "enrico@a", "a");
		Customer c2 = new Customer("ludo", "ludo@a", "b");
		LineUpRequest l1 = new LineUpRequest(c1, s, 0, 0, 0);
		LineUpRequest l2 = new LineUpRequest(c2, s, 0, 0, 0);
		
		s.qrRequest(l1);
		s.qrRequest(l2);


		assertEquals(600000, l2.getWaitingTime());
		assertEquals(0, l1.getWaitingTime());
		
	}
}
