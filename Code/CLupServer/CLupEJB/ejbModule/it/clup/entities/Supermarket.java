package it.clup.entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "supermarket", schema = "db_clup")
@NamedQueries({ @NamedQuery(name = "Supermarket.retrieveID", query = "SELECT s FROM Supermarket s WHERE s.name = ?1"),
		@NamedQuery(name = "Supermarket.retrieveAll", query = "SELECT s FROM Supermarket s"), })

public class Supermarket implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	// Notice that queue is the list of all the LineUpRequests and therefore it
	// includes both LineUpRequests of Customers inside the Supermarket and
	// LineUpRequests of Customers who have not entered yet
	@OneToMany(mappedBy = "market")
	private List<LineUpRequest> queue;

	@OneToOne(mappedBy = "market")
	private StoreManager storeManager;

	private String name;
	private int capacity;

	// The ait value is an estimation of the average time that Customers have to
	// wait for each person which is waiting before him. This is a simplified version
	// for this prototype with respect to what is stated into the Design Document.
	private long ait;
	private Integer numInside = 0;
	private Double latitude;
	private Double longitude;

	public Supermarket() {

	}

	public Supermarket(String name, int capacity, long ait) {

		super();
		this.name = name;
		this.capacity = capacity;
		this.ait = ait;

	}

	public Integer getId() {

		return id;

	}

	public String getName() {

		return name;

	}

	public void setName(String name) {

		this.name = name;

	}

	public int getCapacity() {

		return capacity;

	}

	public void setCapacity(int capacity) {

		this.capacity = capacity;

	}

	public long getAit() {

		return ait;

	}

	public void setAit(long ait) {

		this.ait = ait;

	}

	public int getNumInside() {

		return this.numInside;

	}

	public void setNumInside(Integer numInside) {

		this.numInside = numInside;

	}

	
	
	public Double getLatitude() {  
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public void qrEntrance(LineUpRequest lr) {

		if (numInside < capacity) {
			this.numInside++;
			lr.setRequestTime(System.currentTimeMillis());
			lr.setEntranceTime(System.currentTimeMillis());
			lr.setExitTime(System.currentTimeMillis() + ait);
			lr.setEntrance(true);
		}
	}

	public void removeLineUpRequest(LineUpRequest lr) {

		if (lr.getEntrance() == true) {
			this.numInside--;
		}
		queue.remove(lr);

	}

	public void qrRequest(LineUpRequest lr) {

		queue.add(lr);
		lr.setRequestTime(System.currentTimeMillis());
		lr.setEntranceTime(System.currentTimeMillis() + computeWaitingTime(lr));

	}

	public long computeWaitingTime(LineUpRequest lr) {

		int i = queue.indexOf(lr);
		int x = (i + 1) - numInside - (capacity - numInside);

		if (x < 0) {

			return 0;

		}

		return ait * (x);

	}

	public void updateWaitingTimes() {

		for (LineUpRequest lr : queue) {

			lr.setEntranceTime(System.currentTimeMillis() + computeWaitingTime(lr));

		}
	}

	public int getQueueSize() {

		return queue.size();

	}

}
