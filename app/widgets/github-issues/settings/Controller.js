import { Controller } from "cx/ui";

export default class extends Controller {
	onInit() {
		this.store.copy('repo', 'settings.repo');
	}

	save() {
        this.store.copy('settings.repo', '$root.$widget.props.repo');
        this.store.set('settings.visible', false);
    }
}
