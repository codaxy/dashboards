import {
	HtmlElement,
	Link,
	FlexRow,
	LinkButton,
	CxCredit,
	Repeater,
	enableTooltips
} from "cx/widgets";
import { ContentPlaceholder } from "cx/ui";
import Controller from "./Controller";

enableTooltips();

import UserAccount from "./UserAccount";

export default (
	<cx>
		<div
			controller={Controller}
			class={{
				layout: true,
				nav: { bind: "layout.aside.open" }
			}}
		>
			<CxCredit style="color: white" />
			<main class="main" onMouseDownCapture="onMainClick">
				<ContentPlaceholder />
			</main>
			<header class="header">
				<i
					class={{
						hamburger: true,
						open: { bind: "layout.aside.open" }
					}}
					onClick={(e, { store }) => {
						store.toggle("layout.aside.open");
					}}
				/>
				<ContentPlaceholder name="header" />
				<div style="margin-left: auto" />
				<ContentPlaceholder name="tools" />
			</header>
			<aside class="aside">
				<h1><Link href="~/">Dashboards</Link></h1>
				<dl style="flex: 1 1 0%; overflow: auto">
					<dt>
						<Link href="~/new" url:bind="url">
							Create New Dashboard
						</Link>
					</dt>
					<dt>
						<Link href="~/" url:bind="url">
							Home
						</Link>
					</dt>
					<Repeater records:bind="dashboards">
						<dd>
							<LinkButton
								mod="hollow"
								icon="dashboard"
								url:bind="url"
								href:tpl="~/{$record.id}"
								text:tpl="{$record.title}"
								style="min-width: 200px"
							/>
						</dd>
					</Repeater>
					<dt>
						<Link href="~/about" url:bind="url">
							About
						</Link>
					</dt>
				</dl>
				<UserAccount />
			</aside>
		</div>
	</cx>
);
