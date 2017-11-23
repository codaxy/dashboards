import {
	HtmlElement,
	Link,
	FlexRow,
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
				<h1>Dashboards</h1>
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
							<Link
								href:tpl="~/{$record.id}"
								url:bind="url"
								text:bind="$record.title"
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
