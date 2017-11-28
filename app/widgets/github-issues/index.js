import Controller from "./Controller";
import { enableCultureSensitiveFormatting } from "cx/ui";

enableCultureSensitiveFormatting();

import { Repeater, ContentResolver } from "cx/widgets";

export default ({ repo }) => (
	<cx>
		<div class="kpi-header" ws controller={{ type: Controller, repo }}>
			Recent Issues:
			<a
				href="#"
				onClick={(e, { store }) => {
					e.preventDefault();
					store.toggle("$data.settings.visible");
				}}
			>
				<strong text:bind="$data.repo" />
			</a>
		</div>
		<div class="kpi-main" style="justify-content: start; align-items: start">
			<ul>
				<Repeater records:bind="$data.issues">
					<li>
						<a
							href:bind="$record.html_url"
							target="_blank"
							rel="noopener"
							text:bind="$record.title"
						/>
					</li>
				</Repeater>
			</ul>
		</div>
		<div class="kpi-footer">
			<a
				href:tpl="https://github.com/{$data.repo}/issues"
				target="_blank"
				rel="noopener"
			>
				GitHub.com
			</a>
		</div>

		<ContentResolver
			visible:bind="$data.settings.visible"
			onResolve={() => System.import("./settings").then(x => x.default)}
		/>
	</cx>
);
