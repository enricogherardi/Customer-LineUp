package it.clup.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "customer", schema = "db_clup")
@NamedQueries({
		@NamedQuery(name = "Customer.checkCredentials", query = "SELECT c FROM Customer c WHERE c.username = ?1 and c.password = ?2"),
		@NamedQuery(name = "Customer.retrieveId", query = "SELECT c FROM Customer c WHERE c.username = ?1") })

public class Customer implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String username;
	private String email;
	private String password;

	@OneToOne(mappedBy = "customer")
	private LineUpRequest lineUpReq;

	public Customer() {

	}

	public Customer(String username, String email, String password) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public LineUpRequest getLineUpReq() {
		return lineUpReq;
	}

	public void setLineUpReq(LineUpRequest lineUpReq) {
		this.lineUpReq = lineUpReq;
	}

	// Contructor for No-Tech Customer
	public Customer(String username, long entranceTime, long exitTime) {
		super();
		this.username = username;
		// this.entranceTime = entranceTime;
		// this.exitTime = exitTime;
	}

	/*
	 * public String showWaitingTime() { long min = (this.entranceTime -
	 * this.requestTime) / (1000 * 60); String s = "The waiting time of " + username
	 * + " is: " + min; return s; }
	 * 
	 * public long getWaitingTime() { return this.entranceTime - this.requestTime; }
	 * 
	 * public void printWT() { System.out.println(showWaitingTime()); }
	 * 
	 * @Override public String toString() { return "Customer [id=" + id +
	 * ", username=" + username + ", requestTime=" + requestTime + ", entranceTime="
	 * + entranceTime + ", exitTime=" + exitTime + " " + showWaitingTime() + "]"; }
	 */

}