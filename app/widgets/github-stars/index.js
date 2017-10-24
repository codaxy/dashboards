import Controller from "./Controller";
import { enableCultureSensitiveFormatting } from "cx/ui";

enableCultureSensitiveFormatting();

const defaultProps = {
	repo: "codaxy/cxjs"
};

import { Rescope } from "cx/widgets";

export default ({ repo } = defaultProps) => (
	<cx>
		<Rescope bind="$data">
			<div class="kpi-header" controller={{ type: Controller, repo }}>
				Stars: <strong text:bind="repo" />
			</div>
			<div class="kpi-main">
				<div class="kpi-value" text:tpl="{$data.stars}" />
			</div>
			<div class="kpi-footer">
				<a
					href:tpl="https://github.com/{repo}/stargazers"
					target="_blank"
					rel="noopener"
				>
					GitHub.com
				</a>
			</div>
		</Rescope>
	</cx>
);
