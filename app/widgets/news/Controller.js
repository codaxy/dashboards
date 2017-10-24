import { Controller } from "cx/ui";

const getArticles = () =>
	fetch("https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=c03cf67d0e414ff3a578badda1b368cf")
		.then(x => {
			if (!x.ok) throw new Error("Failed to fetch news from https://newsapi.org.");
			return x;
		})
		.then(x => x.json())
		.then(x => {
			return x.articles;
		});

export default class extends Controller {
	onInit() {
		this.timer = setInterval(::this.fetchArticles, 60 * 1000);
		this.fetchArticles();
	}

	onDestroy() {
		clearInterval(this.timer);
	}

	fetchArticles() {
        getArticles().then(p => {
            this.store.set("$data.articles", p);
        });
    }
}
