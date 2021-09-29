class LineupRequest {
    constructor(data) {
        this.meanOfTransport = data.meanOfTransport;
        this.qrCode = data.qrCode;
        this.queue = data.queue;
        this.supermarket = data.supermarket;
        this.username = data.username;
        this.waitingTime = data.waitingTime;
        this.numInside = data.numInside;
    }

    // just for static testing
    static async testSendLineupRequest(lineupData) {
        lineupData = {
            username: lineupData.username,
            supermarket: lineupData.supermarket,
            meanOfTransport: lineupData.meanOfTransport,
            waitingTime: 4000,
            queue: 30,
            qrCode: "1"
        };
        return new LineupRequest(lineupData);
    }

    static async sendLineupRequest(lineupData) {
        let params = "?username=" + lineupData.username +
        "&marketId=" + lineupData.supermarket.id;
        try {
            var response = await fetch(global.apiUrl + "/addlineupreq" + params, {
                method: "POST"
            });
            
            var status = response.status;
            if (status == 200) {
                response = await response.json();
            } else {
                console.log("[" + status + "] Error while requesting a new lineup");
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }

        if (response.success == 1) {
            lineupData = {
                username: lineupData.username,
                supermarket: lineupData.supermarket,
                meanOfTransport: lineupData.meanOfTransport,
                waitingTime: response.waitingTime,
                queue: response.queue,
                qrCode: response.qrcode,
                numInside: response.numInside
            };
            console.log("[" + status + "] Lineup created successfully");
            return new LineupRequest(lineupData);
        } else {
            console.log("[" + status + "] Error while requesting a new lineup");
            return undefined;
        }
    }

    deleteLineupRequest = async () => {
        let params = "?requestId=" + this.qrCode;

        try {
            var response = await fetch(global.apiUrl + "/dellineupreq" + params, {
                method: "POST"
            });

            var status = response.status;
            if (status == 200) {
                response = await response.json();
            } else {
                console.log("[" + status + "] Error while deleting the lineup");
                return false;
            }
            
        } catch (error) {
            console.log(error);
            return false;
        }


        if (response.success != 1) {
            console.log("[" + status + "] Error while deleting the lineup");
            return false;
        }

        console.log("[" + status + "] Lineup deleted successfully");
        return true;
    }
}

export default LineupRequest;