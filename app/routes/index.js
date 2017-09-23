import { Route, PureContainer, Section, Sandbox } from "cx/widgets";
import { FirstVisibleChildLayout } from "cx/ui";

import AppLayout from "../layout";

import Default from "./default";
import SignIn from "./sign-in";
import New from "./new";
import Home from "./home";

export default (
	<cx>
		<Sandbox
			outerLayout={AppLayout}
			layout={FirstVisibleChildLayout}
			key:bind="url"
			storage:bind="pages"
		>
			<Route route="~/sign-in" url:bind="url">
				<SignIn />
			</Route>
			<Route route="~/" url:bind="url">
				<Home />
			</Route>
			<Route route="~/new" url:bind="url">
				<New />
			</Route>
			<Route route="~/:dashboardId" url:bind="url">
				<Default />
			</Route>
		</Sandbox>
	</cx>
);
