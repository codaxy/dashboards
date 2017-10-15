import { Controller } from "cx/ui";

const getDollarToEuro = () =>
	fetch("https://api.fixer.io/latest?base=USD")
		.then(x => {
			if (!x.ok) throw new Error("Failed to fetch dollar to euro from http://fixer.io/.");
			return x;
		})
		.then(x => x.json())
		.then(x => {
			return x.rates.EUR;
		});

export default class extends Controller {
	onInit() {
		this.timer = setInterval(::this.fetchConversion, 60 * 1000);
		this.fetchConversion();
	}

	onDestroy() {
		clearInterval(this.timer);
	}

	fetchConversion() {
        getDollarToEuro().then(p => {
            this.store.set("dollarToEuro", p);
        });
    }
}
