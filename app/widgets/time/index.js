import Controller from "./Controller";
import { enableCultureSensitiveFormatting } from "cx/ui";

enableCultureSensitiveFormatting();

import { Rescope } from "cx/widgets";

const defaultProps = {};

export default (props = defaultProps) => (
	<cx>
		<Rescope bind="$data">
			<div class="kpi-header">Time</div>
			<div class="kpi-main" controller={Controller}>
				<div class="kpi-value" text:tpl="{time}" />
			</div>
			<div class="kpi-footer" ws>
				<span text:tpl="{day}" />
				<span text:tpl="{date}" />
			</div>
		</Rescope>
	</cx>
);
