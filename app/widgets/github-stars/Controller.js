import { Controller } from "cx/ui";

const getRepo = repo =>
	fetch(`https://api.github.com/repos/${repo}`)
		.then(x => {
			if (!x.ok) throw new Error("Failed to fetch repo data from GitHub.");
			return x;
		})
		.then(x => x.json());

export default class extends Controller {
	onInit() {
		this.store.set("$data.repo", this.repo);
		getRepo(this.repo).then(p => {
			this.store.set("$data.stars", p.stargazers_count);
		});
	}
}
