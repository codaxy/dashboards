import {
	DragSource,
	Repeater,
	PureContainer,
	Button,
	FlexRow,
	FlexCol,
	IsolatedScope,
	Sandbox,
	TextField,
	ColorField,
	Window
} from "cx/widgets";
import { Controller, LabelsTopLayout } from "cx/ui";
import { getSearchQueryPredicate } from "cx/util";
import DashboardWidget from "../../components/DashboardWidget";
import { GridLayout } from "../../components/GridLayout";
import { getWidgetTypeProps } from "../../widgets";
import uid from "uid";

import { database } from "../../api/app";
import watch from "../../api/watch";

class PageControlller extends Controller {
	onInit() {
		this.store.set(
			"widgets",
			getWidgetTypeProps().map(w => ({
				id: w.type,
				...w
			}))
		);

		let id = this.store.get("$route.dashboardId");
		let dashboardPath = `dashboard/${id}`;

		this.unsubscribe = watch(dashboardPath, w => {
			this.store.set("$page.dashboard", w);
		});

		this.addTrigger("autoSave", ["$page.dashboard"], w => {
			database.ref(dashboardPath).set(w);
		});

		this.addTrigger(
			"updateTitle",
			["$page.dashboard.title", "user.id"],
			(title, userId) => {
				if (userId && title !== undefined)
					database.ref(`user/${userId}/dashboards/${id}/title`).set(title);
			}
		);
	}

	onDestroy() {
		this.unsubscribe();
	}

	onWidgetDrop(e, { store }, size) {
		store.set("dropped", true);
		store.update("$page.dashboard.widgets", w => [
			...(w || []),
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
		<h2 putInto="header" text:bind="$page.dashboard.title" />

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
						onCreateFilter={filter => {
							let predicate = getSearchQueryPredicate(filter);
							return record => predicate(record.description);
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

			<PureContainer putInto="tools">
				<Button
					mod="hollow"
					onClick={(e, { store }) => {
						store.toggle("$page.edit");
					}}
				>
					Edit
				</Button>
				<Button
					mod="hollow"
					onClick={(e, { store }) => {
						store.toggle("$page.add");
					}}
				>
					Add Widget
				</Button>
			</PureContainer>

			<Window
				visible:bind="$page.edit"
				title="Dashboard Properties"
				bodyStyle="padding: 20px 30px 30px 30px"
			>
				<PureContainer layout={{ type: LabelsTopLayout, vertical: true }}>
					<TextField value:bind="$page.dashboard.title" label="Title" />
					<ColorField
						value:bind="$page.dashboard.backgroundColor"
						label="Background"
					/>
					<TextField
						value:bind="$page.dashboard.backgroundImgUrl"
						label="Image URL"
					/>
				</PureContainer>
			</Window>

			<PureContainer controller={PageControlller}>
				<GridLayout
					rows={40}
					columns={80}
					onDrop="onWidgetDrop"
					style={{
						flex: "1 1 0%",
						backgroundColor: { bind: "$page.dashboard.backgroundColor" },
						backgroundImage: {
							tpl: '{$page.dashboard.backgroundImgUrl:wrap;url(";")}'
						},
						marginRight: { expr: "{$page.add} ? '300px' : '0'" }
					}}
					onClick={(e, { store }) => {
						//if (e.target == e.currentTarget)
						store.set("$page.add", false);
					}}
				>
					<Repeater
						records:bind="$page.dashboard.widgets"
						recordAlias="$widget"
						keyField="id"
					>
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
