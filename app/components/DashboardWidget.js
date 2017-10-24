import { createWidget } from "../widgets";
import { ContentResolver } from "cx/widgets";

export default ({ type, data, props }) => (
	<cx>
		<ContentResolver
			params={{ type, props }}
			onResolve={({ type, props }) => createWidget(type, props)}
		/>
	</cx>
);
