import { Rescope } from "cx/widgets";

import Controller from "./Controller";
import { enableCultureSensitiveFormatting } from "cx/ui";

enableCultureSensitiveFormatting();

const defaultProps = {};

export default (props = defaultProps) => (
	<cx>
		<Rescope bind="$data">
			<div class="kpi-header" controller={Controller}>
				Dollar To Euro
			</div>
			<div class="kpi-main">
				<div class="kpi-value" text:tpl="$1 = &euro;{dollarToEuro}" />
			</div>
			<div class="kpi-footer">
				<a href="http://fixer.io/" target="_blank" rel="noopener">
					fixer.io
				</a>
			</div>
		</Rescope>
	</cx>
);
