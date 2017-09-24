import { PureContainer } from "cx/widgets";
import { VDOM } from "cx/ui";

export class OnScreenLoader extends PureContainer {
	initState(context, instance) {
		instance.state = { active: !window.IntersectionObserver };
	}

	explore(context, instance) {
		if (instance.state.active) super.explore(context, instance);
	}

	prepare(context, instance) {
		if (instance.state.active) super.prepare(context, instance);
	}

	cleanup(context, instance) {
		if (instance.state.active) super.cleanup(context, instance);
	}

	render(context, instance, key) {
		return (
			<OnScreen key={key} instance={instance} data={instance.data}>
				{instance.state.active && this.renderChildren(context, instance)}
			</OnScreen>
		);
	}
}

OnScreenLoader.prototype.styled = true;

class OnScreen extends VDOM.Component {
	render() {
		if (!this.elRef)
			this.elRef = el => {
				this.el = el;
			};

		let { children, data } = this.props;
		return (
			<div ref={this.elRef} data={data.classNames} style={data.style}>
				{children}
			</div>
		);
	}

	componentDidMount() {
		if (window.IntersectionObserver) {
			this.observer = new IntersectionObserver(::this.onIntersection, {
				target: document.querySelector(".drawer")
			});
			this.observer.observe(this.el);
		}
	}

	destroy() {
		if (this.observer) this.observer.disconnect();
		delete this.observer;
	}

	componentWillUnmount() {
		this.destroy();
	}

	onIntersection(entries) {
		entries.forEach(e => {
			if (e.isIntersecting) {
				console.log("INTERSECTION", e);
				this.props.instance.setState({ active: true });
				this.destroy();
			}
		});
	}
}
