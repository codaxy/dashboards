import { HtmlElement, LinkButton, Section, FlexRow } from "cx/widgets";

import Controller from "./Controller";
import { Repeater } from "cx/ui";

export default (
	<cx>
		<FlexRow controller={Controller} padding spacing>
			<Section mod="card" style="margin: 10px" title="My Dashboards">
				<Repeater records:bind="dashboards">
					<LinkButton
						mod="hollow"
						style="display:block; padding: 20px; height: auto"
						href:tpl="~/{$record.id}"
						text:tpl="{$record.title}"
					/>
				</Repeater>

				<LinkButton href="~/new" mod="primary" putInto="tools">
					New Dashboard
				</LinkButton>
			</Section>
		</FlexRow>
	</cx>
);
