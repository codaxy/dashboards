import { HtmlElement, LinkButton, Link, Section, FlexRow } from "cx/widgets";

import Controller from "./Controller";
import { Repeater } from "cx/ui";

export default (
	<cx>
		<LinkButton href="~/new" mod="primary" putInto="tools">
			New Dashboard
		</LinkButton>

		<h2 putInto="header">Home</h2>

		<div class="home">
			<h3>My Dashboards</h3>

			<FlexRow controller={Controller} spacing wrap>
				<Repeater records:bind="dashboards">
					<Link
						class="dashboard-card"
						href:tpl="~/{$record.id}"
						text:tpl="{$record.title}"
					/>
				</Repeater>
				<p visible:expr="!{dashboards.length}" ws>
					No dashboards in your inventory.
				</p>
			</FlexRow>

			<h3>Samples</h3>

			<FlexRow controller={Controller} spacing wrap>
				<Link class="dashboard-card" href="~/lao6cfj">
					Crypto
				</Link>
			</FlexRow>
		</div>
	</cx>
);
