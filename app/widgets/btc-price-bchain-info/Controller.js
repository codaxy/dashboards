import { Controller } from "cx/ui";

const getBtcPrice = () =>
	fetch("https://blockchain.info/ticker")
		.then(x => {
			if (!x.ok)
				throw new Error("Failed to fetch BTC price from blockchain.info");
			return x;
		})
		.then(x => x.json())
		.then(x => {
			return x["USD"]["15m"];
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
