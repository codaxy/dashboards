import Controller from "./Controller";
import { enableCultureSensitiveFormatting } from "cx/ui";

enableCultureSensitiveFormatting();

import { Repeater, ContentResolver } from "cx/widgets";

const defaultProps = {
	repo: "codaxy/cxjs"
};

export default ({ repo } = defaultProps) =>
	<cx>
		<div class="kpi-header" ws controller={{ type: Controller, repo }}>
			Recent Issues:
			<a href="#" onClick={(e, {store}) => { e.preventDefault(); store.toggle('settings.visible'); }}>
				<strong text:bind="repo"  />
			</a>
		</div>
		<div class="kpi-main" style="justify-content: start; align-items: start">
			<ul>
				<Repeater records:bind="issues">
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
				href:tpl="https://github.com/{repo}/issues"
				target="_blank"
				rel="noopener"
			>
				GitHub.com
			</a>
		</div>

		<ContentResolver
			visible:bind="settings.visible"
			onResolve={()=>System.import('./settings').then(x=>x.default)}
		/>
	</cx>;
