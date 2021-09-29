package it.clup.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

//This class is provided for future extentions
@Entity
@Table(name = "storemanager", schema = "db_clup")
@NamedQuery(name = "StoreManager.checkCredentials", query = "SELECT sm FROM StoreManager sm WHERE sm.username = ?1 and sm.password = ?2")

public class StoreManager implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@OneToOne 
    @JoinColumn(name = "marketId", referencedColumnName = "id")
 	private Supermarket market;
	
	private String username;
	private String email;
	private String password;

	public StoreManager() {
   
	}

	public StoreManager(String username, String email, String password, Supermarket market) {
		
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.market= market;
		
	}

	public Integer getId() {
		
		return id;
		
	}

	public void setId(Integer id) {
		
		this.id = id;
		
	}

	public Supermarket getMarket() {
		
		return market;
		
	}

	public void setMarket(Supermarket market) {
		
		this.market = market;
		
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
	
	
}
