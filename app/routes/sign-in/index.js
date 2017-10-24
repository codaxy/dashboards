import { Section, Text, Button, FlexRow } from "cx/widgets";
import { expr } from "cx/ui";

import Controller from "./Controller";

export default () => (
	<cx>
		<FlexRow
			controller={Controller}
			align="center"
			justify="center"
			style="height: 100%"
		>
			<Section mod="card" visible={expr("!{user.id}")}>
				<div>
					<h2 putInto="header">Sign In</h2>
				</div>
				<p>
					Please sign in using one of the available authentication providers.
				</p>
				<p>
					<a href="#" onClick="signInWithGoogle">
						<img src="~/assets/sign-in/google/btn_google_signin_dark_normal_web.png" />
					</a>
				</p>

				<p>
					<a href="#" onClick="signInWithTwitter">
						<img src="~/assets/sign-in/twitter/sign-in-with-twitter-gray.png" />
					</a>
				</p>

				<p>
					<a href="#" onClick="signInWithGitHub">
						<img src="~/assets/sign-in/github/SignInGitHub.png" />
					</a>
				</p>
			</Section>

			<Section mod="card" visible={expr("!!{user.id}")} ws>
				<div>
					<h2 putInto="header">Sign Out</h2>
				</div>
				<p ws>
					You're signed in as{" "}
					<Text tpl="{user.displayName}{user.email:wrap; (;)}" />.
				</p>

				<Button onClick="signOut" mod="primary">
					Sign Out
				</Button>
			</Section>
		</FlexRow>
	</cx>
);
