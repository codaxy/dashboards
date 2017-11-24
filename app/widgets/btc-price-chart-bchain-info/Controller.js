import { Controller } from "cx/ui";

const getBtcPrice = () =>
	fetch("https://api.blockchain.info/charts/market-price?cors=true&timespan=30days&format=json&lang=en")
		.then(x => {
			if (!x.ok)
				throw new Error("Failed to fetch BTC price from blockchain.info");
			return x;
		})
		.then(x => x.json());

export default class extends Controller {
	onInit() {
		this.timer = setInterval(::this.fetchPrice, 60 * 60 * 1000);
		this.fetchPrice();
	}

	onDestroy() {
		clearInterval(this.timer);
	}

	fetchPrice() {
		this.store.set("status", "loading");
		getBtcPrice()
			.then(p => {
				this.store.set("status", "ok");
				this.store.set("data", p);
			})
			.catch(err => {
				this.store.set("status", "error");
				this.store.set("error", err.toString());
			});
	}
}
