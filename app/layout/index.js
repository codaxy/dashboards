import { HtmlElement, Link, FlexRow, CxCredit, enableTooltips } from "cx/widgets";
import { ContentPlaceholder } from "cx/ui";
import Controller from "./Controller";

enableTooltips();

import UserAccount from './UserAccount';

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
				<UserAccount/>
				<dl>
					<dt>
						<Link href="~/" url:bind="url">
						Dashboards
						</Link>
					</dt>
					<dd>
						<Link href="~/new" url:bind="url">
							New
						</Link>
					</dd>
				</dl>
				<dl>
					<dt>Admin</dt>
					<dd>
						<Link href="~/users" url:bind="url" match="prefix">
							Users
						</Link>
					</dd>
				</dl>

				<ContentPlaceholder name="aside" />
			</aside>
		</div>
	</cx>
);
