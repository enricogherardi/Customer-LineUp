package it.clup.utilities;

// This class is used for building the Response and provide useful information 
// such as waitingTime and the number of people inside the Supermarket (numInside)

public class LineUpReqBody {

	String success;
	long waitingTime;
	int queue;
	int qrcode;
	int numInside;

	public LineUpReqBody(String success, long waitingTime, int queue, int qrcode, int numInside) {

		super();
		this.success = success;
		this.waitingTime = waitingTime;
		this.queue = queue;
		this.qrcode = qrcode;
		this.numInside = numInside;

	}

	public String getSuccess() {

		return success;

	}

	public void setSuccess(String success) {

		this.success = success;

	}

	public long getWaitingTime() {

		return waitingTime;

	}

	public void setWaitingTime(long waitingTime) {

		this.waitingTime = waitingTime;

	}

	public int getQueue() {

		return queue;

	}

	public void setQueue(int queue) {

		this.queue = queue;

	}

	public int getQrcode() {

		return qrcode;

	}

	public void setQrcode(int qrcode) {

		this.qrcode = qrcode;

	}

	public int getNumInside() {

		return numInside;

	}

	public void setNumInside(int numInside) {

		this.numInside = numInside;

	}

}
