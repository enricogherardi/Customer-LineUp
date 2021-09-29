public static int nextWaitingTime() {
		
	if(supermarket.size() < CAPACITY) {
		return 0;
	}

	Collections.sort(supermarket);
		
	for(int i = queue.size() - 1; i >= 0; --i) {
			
		int minTTL = supermarket.get(0);
		WT += minTTL;
			
		for(int j = 0; j < supermarket.size(); ++j) {
			supermarket.set(j, supermarket.get(j) - minTTL);
		}
		
		//The Customer leaves the store
		supermarket.remove(0);
		
		//The next queuing Customer is removed from the Queue 
		//and entres the Store
		supermarket.add(queue.get(i).getAIT());
		queue.remove(i);

		Collections.sort(supermarket);
	}
	return WT;
}
