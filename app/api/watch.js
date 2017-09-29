import { database } from "./app";

export default function watch(path, callback) {
	let ref = database.ref(path);

	let cb = x => callback(x.val());

	let subscribed = false;

	ref.once('value')
		.then(() => {
            ref.on("value", cb);
            subscribed = true;
		})
		.catch(err => {
			callback(null, err)
		});

	return () => {
		if (subscribed)
			ref.off("value", cb);
	};
}
