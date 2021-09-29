package it.clup.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "lineUpRequest", schema = "db_clup")
public class LineUpRequest {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@OneToOne
	@JoinColumn(name = "customId", referencedColumnName = "id")
	private Customer customer;

	@ManyToOne
	@JoinColumn(name = "marketId")
	private Supermarket market;

	private long requestTime = 0;
	private long entranceTime = 0;
	private long exitTime = 0;
	private int qrCode;
	private Boolean entrance = false;

	public LineUpRequest() {

	}

	public LineUpRequest(Customer customer, Supermarket market, long requestTime, long entranceTime, long exitTime) {
		
		super();
		this.customer = customer;
		this.requestTime = requestTime;
		this.entranceTime = entranceTime;
		this.market = market;
		this.exitTime = exitTime;
		
	}

	public Integer getId() {
		
		return id;
		
	}

	public void setId(Integer id) {
		
		this.id = id;
		
	}

	public Customer getCustomer() {
		
		return customer;
		
	}

	public void setCustomer(Customer customer) {
		
		this.customer = customer;
		
	}

	public Supermarket getMarket() {
		
		return market;
		
	}

	public void setMarket(Supermarket market) {
		
		this.market = market;
		
	}

	public long getRequestTime() {
		
		return requestTime;
		
	}

	public void setRequestTime(long requestTime) {
		
		this.requestTime = requestTime;
		
	}

	public long getEntranceTime() {
		
		return entranceTime;
		
	}

	public void setEntranceTime(long entranceTime) {
		
		this.entranceTime = entranceTime;
		
	}

	public long getExitTime() {
		
		return exitTime;
		
	}

	public void setExitTime(long exitTime) {
		
		this.exitTime = exitTime;
		
	}

	public int getQrCode() {
		
		return qrCode;
		
	}

	public void setQrCode(int qrCode) {
		
		this.qrCode = qrCode;
		
	}

	public long getWaitingTime() {
		
		return this.entranceTime - this.requestTime;
		
	}

	public Boolean getEntrance() {
		
		return entrance;
		
	}

	public void setEntrance(Boolean entrance) {
		
		this.entrance = entrance;
		
	}

}
