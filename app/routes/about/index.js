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
					Dashboards allow you to build personalized dashboards by arranging
					widgets on a rectangular board. Each board can be customized to use
					different background color or image. If you sign in your dashboards
					will be saved.
				</p>
				<br />
				<h4>Tech</h4>
				<p ws>
					The application is built using CxJS, React, Babel and webpack and uses
					not yet fully supported browser features such as CSS grid layout and
					IntersectionObserver. Application source code is available on{" "}
					<a href="https://github.com/codaxy/dashboards">GitHub</a>. Developers
					are encouraged to contribute new widgets and new ideas.
				</p>
			</Section>
		</FlexBox>
	</cx>
);
