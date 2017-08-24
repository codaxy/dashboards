import Controller from "./Controller";
import { enableCultureSensitiveFormatting } from "cx/ui";

enableCultureSensitiveFormatting();

const defaultProps = {};

export default (props = defaultProps) =>
	<cx>
		<div>Text</div>
	</cx>;
