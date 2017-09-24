import { Controller } from "cx/ui";

const getIssues = repo =>
	fetch(`https://api.github.com/repos/${repo}/issues?state=open`)
		.then(x => {
			if (!x.ok) throw new Error("Failed to fetch issues from GitHub.");
			return x;
		})
		.then(x => x.json());

export default class extends Controller {
	onInit() {
		this.store.set("$data.repo", this.repo);
		getIssues(this.repo).then(p => {
			this.store.set("$data.issues", p);
		});
	}
}
