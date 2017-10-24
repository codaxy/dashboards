import { Controller } from "cx/ui";

export default class extends Controller {
	onInit() {
		this.store.copy("$data.repo", "$data.settings.repo");
	}

	save() {
		this.store.copy("$data.settings.repo", "$widget.props.repo");
		this.store.set("$data.settings.visible", false);
	}
}
