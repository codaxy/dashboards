import { Controller } from "cx/ui";
import { Toast } from "cx/widgets";

import { firebase, auth } from "../../api/app";

export default class extends Controller {
	onInit() {}

	signInWithGoogle(e) {
		e.preventDefault();
		let provider = new firebase.auth.GoogleAuthProvider();
		this.signInWithProvider(provider);
	}

	signInWithTwitter(e) {
		e.preventDefault();
		let provider = new firebase.auth.TwitterAuthProvider();
		this.signInWithProvider(provider);
	}

	signInWithProvider(provider) {
		auth
			.signInWithPopup(provider)
			.then(({ user }) => {
				this.store.set("$root.user", {
					email: user.email,
					id: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL
				});
			})
			.catch(error => {
				let errorCode = error.code;
				let errorMessage = error.message;
				let toast = Toast.create({
					message: `Login failed with error code ${errorCode}. ${errorMessage}`,
					timeout: 15000
				});
				toast.open(this.store);
			});
	}

	signOut(e) {
		e.preventDefault();
		auth.signOut().then(() => {
			this.store.delete("$root.user");
		});
	}
}
