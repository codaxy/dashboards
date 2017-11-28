import { HtmlElement, FlexBox, Section } from "cx/widgets";

import Controller from "./Controller";

export default (
	<cx>
		<FlexBox
			controller={Controller}
			align="center"
			justify="center"
			style="height: 100%"
		>
			<h2 putInto="header">About</h2>

			<Section mod="card" style="padding: 50px">
				<h4>Info</h4>
				<p ws>
					Dashboards allows you to build personalized dashboards by arranging
					widgets on a rectangular board. Each board can be customized with different size,
					background image or color. Dashboards are stored in browser's local storage.
					If you sign in your dashboards will be saved to Google Firebase.
				</p>
				<br />
				<h4>Tech</h4>
				<p ws>
					The application is built using <a href="https://cxjs.io">CxJS</a>,
					<a href="https://reactjs.org/">React</a>, <a href="https://babeljs.io/">Babel</a> and
					<a href="https://webpack.js.org/">webpack</a> and uses
					not yet fully supported browser features such as CSS grid layout and
					IntersectionObserver. Application source code is available on
					<a href="https://github.com/codaxy/dashboards">GitHub</a>. Developers
					are encouraged to contribute new widgets and new ideas.
				</p>
			</Section>
		</FlexBox>
	</cx>
);
