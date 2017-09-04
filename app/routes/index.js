import { Route, PureContainer, Section, Sandbox } from "cx/widgets";
import { FirstVisibleChildLayout } from "cx/ui";

import AppLayout from "../layout";

import Default from "./default";
import About from "./about";
import Dashboard from "./dashboard";
import Old from "./old";
import SignIn from './sign-in';
import New from './new';

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
			<Route route="~/new" url:bind="url">
				<New />
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
			<Route route="~/:dashboardId" url:bind="url">
				<Default />
			</Route>
		</Sandbox>
	</cx>
);
