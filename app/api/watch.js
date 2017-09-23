import { database } from "./app";

export default function watch(path, callback) {
	let ref = database.ref(path);

	let cb = x => callback(x.val());

	ref.on("value", cb);

	return () => {
		ref.off("value", cb);
	};
}
