const widgets = {};
const props = {};

export function registerWidget(type, factory, defaultProps) {
	widgets[type] = factory;
	props[type] = defaultProps;
}

export function createWidget(type, props) {
	return widgets[type](props);
}

export function getWidgetTypes() {
	return Object.keys(widgets);
}

export function getWidgetTypeProps() {
	return Object.keys(widgets).map(type => ({
		type,
		...props[type]
	}));
}

registerWidget(
	"text",
	props => System.import("./text").then(x => x.default(props)),
	{
		description: "Text label",
		box: {
			width: 4,
			height: 2,
			class: "text"
		}
	}
);

registerWidget(
	"time",
	props => System.import("./time").then(x => x.default(props)),
	{
		description: "Current date and time",
		box: {
			width: 12,
			height: 8,
			class: "kpi"
		}
	}
);

registerWidget(
	"btc-price-bchain-info",
	props => System.import("./btc-price-bchain-info").then(x => x.default(props)),
	{
		description: "Bitcoin (BTC) price from blockhain.info",
		box: {
			width: 8,
			height: 8,
			class: "kpi"
		}
	}
);

registerWidget(
	"btc-price-coindesk",
	props => System.import("./btc-price-coindesk").then(x => x.default(props)),
	{
		description: "Bitcoin (BTC) price from CoinDesk",
		box: {
			width: 8,
			height: 8,
			class: "kpi"
		}
	}
);

registerWidget(
	"github-stars",
	props => System.import("./github-stars").then(x => x.default(props)),
	{
		description: "Number of stars for your favorite GitHub project",
		box: {
			width: 8,
			height: 8,
			class: "kpi"
		}
	}
);

registerWidget(
	"dollar-to-euro",
	props =>
		System.import("./dollar-to-euro").then(x => x.default(props)),
	{
		description: "Conversion dollar to euro",
		box: {
			width: 16,
			height: 8,
			class: "kpi"
		}
	}
);

registerWidget(
	"popular-stackoverflow-tags",
	props =>
		System.import("./popular-stackoverflow-tags").then(x => x.default(props)),
	{
		description: "Poular StackOverflow tags",
		box: {
			width: 16,
			height: 8,
			class: "kpi"
		}
	}
);

registerWidget(
	"news",
	props =>
		System.import("./news").then(x => x.default(props)),
	{
		description: "News",
		box: {
			width: 20,
			height: 12,
			class: "kpi"
		}
	}
);

registerWidget(
	"github-issues",
	props => System.import("./github-issues").then(x => x.default(props)),
	{
		description: "Open issues for your favorite GitHub project",
		box: {
			width: 20,
			height: 12,
			class: "kpi"
		}
	}
);

registerWidget(
	"stackoverflow-questions",
	props =>
		System.import("./stackoverflow-questions").then(x => x.default(props)),
	{
		description: "Hot questions on StackOverflow",
		box: {
			width: 20,
			height: 12,
			class: "kpi"
		}
	}
);
