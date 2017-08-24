import { Controller, Format } from "cx/ui";

export default class extends Controller {
	onInit() {
		this.timer = setInterval(::this.updateTime, 1000);
		this.updateTime();
	}

	onDestroy() {
		clearInterval(this.timer);
	}

	updateTime() {
		this.store.set("time", Format.value(Date.now(), "datetime;hhmma"));
		this.store.set("day", Format.value(Date.now(), "datetime;DDDD"));
		this.store.set("date", Format.value(Date.now(), "date"));
	}
}
