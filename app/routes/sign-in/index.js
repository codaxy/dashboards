import { Section, Text, Button } from "cx/widgets";
import { expr } from "cx/ui";

import Controller from "./Controller";

export default () =>
	<cx>
		<div style="padding: 10px" controller={Controller}>
			<Section mod="card" title="Sign In" visible={expr("!{user.id}")}>
				<p>
					Please sign in using one of the available authentication providers.
				</p>
				<p>
					<a href="#" onClick="signInWithGoogle">
						<img src="~/assets/sign-in/google/btn_google_signin_dark_normal_web.png" />
					</a>
				</p>
			</Section>

			<Section mod="card" title="User Info" visible={expr("!!{user.id}")} ws>
				<p ws>
					You're signed in as{" "}
					<Text tpl="{user.displayName}{user.email:wrap; (;)}" />.
				</p>

				<Button onClick="signOut" mod="primary">
					Sign Out
				</Button>
			</Section>
		</div>
	</cx>;
