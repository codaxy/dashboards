import { Controller } from "cx/ui";

const getBtcPrice = () =>
	fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
		.then(x => {
			if (!x.ok)
				throw new Error("Failed to fetch BTC price from CoinDesk.");
			return x;
		})
		.then(x => x.json())
		.then(x => {
			return x.bpi.USD.rate_float;
		});

export default class extends Controller {
	onInit() {
		this.timer = setInterval(::this.fetchPrice, 60 * 1000);
        this.fetchPrice();
	}

	onDestroy() {
		clearInterval(this.timer);
	}

	fetchPrice() {
        getBtcPrice().then(p => {
            this.store.set("btcPrice", p);
        });
	}
}
