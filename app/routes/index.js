import { Route, PureContainer, Section, Sandbox } from "cx/widgets";
import { FirstVisibleChildLayout } from "cx/ui";

import AppLayout from "../layout";

import Default from "./default";
import About from "./about";
import Dashboard from "./dashboard";
import Old from "./old";

export default (
	<cx>
		<PureContainer outerLayout={AppLayout} layout={FirstVisibleChildLayout}>
			<Route route="~/" url:bind="url">
				<Default />
			</Route>
			<Route route="~/old" url:bind="url">
				<Old />
			</Route>
			<Route route="~/about" url:bind="url">
				<About />
			</Route>
			<Route route="~/dashboard" url:bind="url">
				<Dashboard />
			</Route>
			<Section title="Page Not Found" mod="card">
				This page doesn't exists. Please check your URL.
			</Section>
		</PureContainer>
	</cx>
);
