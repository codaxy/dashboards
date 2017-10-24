import { Rescope } from "cx/widgets";

import Controller from "./Controller";
import { enableCultureSensitiveFormatting } from "cx/ui";

enableCultureSensitiveFormatting();

const defaultProps = {};

export default (props = defaultProps) => (
	<cx>
		<Rescope bind="$data">
			<div class="kpi-header" controller={Controller}>
				BTC Price
			</div>
			<div class="kpi-main">
				<div class="kpi-value" text:tpl="{btcPrice:currency;;0}" />
			</div>
			<div class="kpi-footer">
				<a href="https://www.coindesk.com/" target="_blank" rel="noopener">
					www.coindesk.com
				</a>
			</div>
		</Rescope>
	</cx>
);
