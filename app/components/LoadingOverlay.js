import { VDOM } from "cx/ui";
import { PureContainer, Icon } from "cx/widgets";

export class LoadingOverlay extends PureContainer {
	declareData() {
		super.declareData(...arguments, {
			loading: undefined,
			error: undefined,
			status: undefined
		});
	}

	render(context, instance, key) {
		let { data } = instance;

		if (data.loading || data.status == "loading") {
			return (
				<div className="cxb-loadingoverlay">
					{Icon.render("loading", {
						style: {
							width: "24px",
							height: "24px",
							position: "relative",
							top: "6px"
						}
					})}
					Loading...
				</div>
			);
		}

		if (data.status == "error") {
			return (
				<div className="cxb-loadingoverlay cxs-error">
					<p>{data.error}</p>
					<a
						href="#"
						onClick={e => {
							instance.invoke("onRetry", e, instance);
						}}
					>
						Retry
					</a>
				</div>
			);
		}

		return super.render(context, instance, key);
	}
}
