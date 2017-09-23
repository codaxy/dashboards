import {Controller} from "cx/ui";

const getQuestions = repo =>
    fetch(`https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow&page=1&pageSize=10`)
        .then(x => {
            if (!x.ok) throw new Error("Failed to fetch issues from GitHub.");
            return x;
        })
        .then(x => x.json())
        .then(r => r.items);

export default class extends Controller {
    onInit() {
        getQuestions().then(p => {
            this.store.set("questions", p);
        });
    }
}
