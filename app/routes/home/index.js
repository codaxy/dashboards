import { HtmlElement, LinkButton, Link, Section, FlexRow } from "cx/widgets";

import Controller from "./Controller";
import { Repeater } from "cx/ui";

export default (
	<cx>
		<LinkButton href="~/new" mod="primary" putInto="tools">
			New Dashboard
		</LinkButton>
		<FlexRow controller={Controller} padding spacing wrap>
			<Section mod="card" style="margin: 10px" title="My Dashboards" hLevel={4}>
				<div visible:expr="!!{user.id}">
					<Repeater records:bind="dashboards">
						<LinkButton
							mod="hollow"
							style="display:block; padding: 20px; height: auto"
							href:tpl="~/{$record.id}"
							text:tpl="{$record.title}"
						/>
					</Repeater>
					<p visible:expr="!{dashboards.length}" ws>
						No dashboards in your inventory.
						<Link href="~/new">Create a new dashboard</Link>
					</p>
				</div>
				<p visible:expr="!{user.id}" ws>
					Please <Link href="~/sign-in">sign-in</Link> to see your dashboards.
				</p>
			</Section>

			<Section
				mod="card"
				style="margin: 10px"
				title="Sample Dashboards"
				hLevel={4}
			>
				<LinkButton
					mod="hollow"
					style="display:block; padding: 20px; height: auto"
					href="~/lao6cfj"
				>
					Crypto
				</LinkButton>
			</Section>
		</FlexRow>
	</cx>
);
