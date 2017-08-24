import {
	DragSource,
	Repeater,
	PureContainer,
	Button,
	FlexRow,
	FlexCol,
	IsolatedScope,
	Sandbox,
	TextField
} from "cx/widgets";
import { Controller } from "cx/ui";
import { getSearchQueryPredicate } from 'cx/util';
import DashboardWidget from "../../components/DashboardWidget";
import { GridLayout } from "../../components/GridLayout";
import { getWidgetTypeProps } from "../../widgets";
import uid from "uid";

class PageControlller extends Controller {
	onInit() {
		this.store.init("grid", []);

		this.store.set(
			"widgets",
			getWidgetTypeProps().map(w => ({
				id: w.type,
				...w
			}))
		);
	}

	onWidgetDrop(e, { store }, size) {
		store.set("dropped", true);
		store.update("grid", grid => [
			...grid,
			{
				...e.source.data.widget,
				box: size,
				id: uid()
			}
		]);
	}
}

export default (
	<cx>
		<h2 putInto="header">Grid Based Dashboard</h2>

		<FlexRow style="height: 100%">
			<div visible:bind="$page.add" class="drawer" style="width: 300px">
				<TextField
					value:bind="$page.search"
					style="width: 100%; margin-bottom: 15px"
					inputStyle="border-color: transparent"
					placeholder="Search..."
				/>
				<FlexRow spacing="large" wrap>
					<Repeater
						records:bind="widgets"
						recordAlias="$widget"
						keyField="type"
						filterParams:bind="$page.search"
						onCreateFilter={filter=> {
                            let predicate = getSearchQueryPredicate(filter);
                            return (record) => predicate(record.description);
                        }}
					>
						<div class="gallery">
							<Sandbox
								key:bind="$widget.id"
								storage:bind="galleryData"
								recordAlias="$data"
							>
								<IsolatedScope bind={["$widget", "$data"]}>
									<DragSource
										class:tpl="widget-cell {$widget.box.class}"
										style={{
											width: { expr: "{$widget.box.width} * 16" },
											height: { expr: "{$widget.box.height} * 16" }
										}}
										data={{
											type: "widget",
											widget: { bind: "$widget" }
										}}
									>
										<DashboardWidget
											type:bind="$widget.type"
											data:bind="$data"
										/>
									</DragSource>
								</IsolatedScope>
							</Sandbox>
						</div>
					</Repeater>
				</FlexRow>
			</div>

			<Button
				mod="hollow"
				putInto="tools"
				onClick={(e, { store }) => {
					store.toggle("$page.add");
				}}
			>
				Add
			</Button>

			<PureContainer controller={PageControlller}>
				<GridLayout
					rows={40}
					columns={80}
					onDrop="onWidgetDrop"
					style={{
						flex: "1 1 0%",
						marginRight: { expr: "{$page.add} ? '300px' : '0'" }
					}}
				>
					<Repeater records:bind="grid" recordAlias="$widget" keyField="id">
						<Sandbox
							key:bind="$widget.id"
							storage:bind="widgetData"
							recordAlias="$data"
						>
							<IsolatedScope bind={["$widget", "$data"]}>
								<DragSource
									class:tpl="widget-cell {$widget.box.class}"
									style={{
										gridArea: {
											tpl:
												"{[{$widget.box.row} + 1]} / {[{$widget.box.col} + 1]} / span {$widget.box.height} / span {$widget.box.width}"
										}
									}}
									visible:expr="{$widget.type}"
									data={{
										type: "widget",
										widget: { bind: "$widget" }
									}}
									onDragStart={(e, { store }) => {
										store.set("dropped", false);
									}}
									onDragEnd={(e, { store }) => {
										if (store.get("dropped")) store.delete("$widget");
									}}
								>
									<DashboardWidget
										type:bind="$widget.type"
										props:bind="$widget.props"
										data:bind="$data"
									/>
									<div class="widget-toolbar">
										<Button
											mod="hollow"
											icon="close"
											onClick={(e, { store }) => {
												store.delete("$widget");
											}}
										/>
									</div>
								</DragSource>
							</IsolatedScope>
						</Sandbox>
					</Repeater>
				</GridLayout>
			</PureContainer>
		</FlexRow>
	</cx>
);
