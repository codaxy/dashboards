import { Controller } from "cx/ui";
import watch from "../api/watch";

export default class extends Controller {
	onInit() {
        this.store.init("layout.aside.open", false); //window.innerWidth >= 800);

        this.addTrigger("navigation", ["url"], () => {
            //if (window.innerWidth < 800)
            this.store.set("layout.aside.open", false);
        });

        this.addTrigger(
            "dashboards",
            ["user.id", 'localStorageTimestamp'],
            userId => {
                if (this.unsubscribe) {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
                if (userId) {
                    this.unsubscribe = watch(`user/${userId}/dashboards`, ::this.loadDashboards);
                } else {
                    this.loadDashboards(JSON.parse(localStorage.getItem('dashboards') || '{}'))
                }
            },
            true
        );
    }

	loadDashboards(d) {
        let data = Object.keys(d || {}).map(k => ({ id: k, ...d[k] }));
        this.store.set("dashboards", data);
	}

	onDestroy() {
		if (this.unsubscribe) {
			this.unsubscribe();
			this.unsubscribe = null;
		}
	}

	onMainClick(e, { store }) {
		//if (window.innerWidth < 800)
		store.set("layout.aside.open", false);
	}
}
