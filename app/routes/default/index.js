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
    Window,
    Toast,
    Slider
} from "cx/widgets";
import {Controller, LabelsTopLayout, History} from "cx/ui";
import {getSearchQueryPredicate, isNonEmptyArray} from "cx/util";
import DashboardWidget from "../../components/DashboardWidget";
import {GridLayout} from "../../components/GridLayout";
import {OnScreenLoader} from "../../components/OnScreenLoader";
import {getWidgetTypeProps} from "../../widgets";
import uid from "uid";

import {database} from "../../api/app";
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

        this.unsubscribe = watch(dashboardPath, (w, error) => {
            if (error) {
                Toast.create({
                    children:
                    "Error occurred while loading dashboard: " + error.toString(),
                    timeout: 10000,
                    mod: "error"
                }).open();
                console.log(error);
                History.pushState({}, null, "~/");
            } else {
                this.store.set("$page.dashboard", {
                    width: 80,
                    height: 40,
                    ...w
                });
                if (!isNonEmptyArray(w.widgets))
                    this.store.set('$page.add', true);
            }
        });

        this.addTrigger("autoSave", ["$page.dashboard"], w => {
            database.ref(dashboardPath).set(w);
        });

        this.addTrigger(
            "updateTitle",
            ["$page.dashboard.title", "user.id"],
            (title, userId) => {
                if (title !== undefined) {
                    if (userId)
                        database.ref(`user/${userId}/dashboards/${id}/title`).set(title);
                    else {
                        let dashboards = JSON.parse(
                            localStorage.getItem("dashboards") || "{}"
                        );
                        if (dashboards[id]) {
                            dashboards[id].title = title;
                            localStorage.setItem("dashboards", JSON.stringify(dashboards));
                            this.store.set("localStorageTimestamp", Date.now());
                        }
                    }
                }
            }
        );
    }

    onDestroy() {
        this.unsubscribe();
    }

    onWidgetDrop(e, {store}, size) {
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
        <h2 putInto="header" text:bind="$page.dashboard.title"/>

        <FlexRow style="height: 100%">
            <FlexCol visible:bind="$page.add" class="drawer">
                <TextField
                    value:bind="$page.search"
                    style="margin: 15px 10px; width: auto"
                    inputStyle="border-color: transparent"
                    placeholder="Search..."
                />
                <div style="overflow-x: hidden; overflow-y: auto; padding: 10px">
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
                            <Sandbox
                                key:bind="$widget.id"
                                storage:bind="galleryData"
                                recordAlias="$data"
                            >
                                <IsolatedScope bind={["$widget", "$data"]}>
                                    <OnScreenLoader
                                        style={{
                                            width: {expr: "{$widget.box.width} * 16"},
                                            height: {expr: "{$widget.box.height} * 16"}
                                        }}
                                    >
                                        <DragSource
                                            class:tpl="widget-cell {$widget.box.class}"
                                            style="height: 100%"
                                            data={{
                                                type: "widget",
                                                widget: {bind: "$widget"}
                                            }}
                                        >
                                            <DashboardWidget
                                                type:bind="$widget.type"
                                                data:bind="$data"
                                            />
                                        </DragSource>
                                    </OnScreenLoader>
                                </IsolatedScope>
                            </Sandbox>
                        </Repeater>
                    </FlexRow>
                </div>
            </FlexCol>

            <PureContainer putInto="tools">
                <Button
                    mod="hollow"
                    onClick={(e, {store}) => {
                        store.toggle("$page.edit");
                    }}
                >
                    Edit
                </Button>
                <Button
                    mod="hollow"
                    onClick={(e, {store}) => {
                        store.toggle("$page.add");
                    }}
                >
                    Add Widget
                </Button>
            </PureContainer>

            <Window
                visible:bind="$page.edit"
                title="Dashboard Properties"
                bodyStyle="padding: 0 20px 20px"
                backdrop
            >
                <FlexRow spacing="large">
                    <PureContainer layout={{type: LabelsTopLayout, vertical: true}}>
                        <TextField value:bind="$page.dashboard.title" label="Title"/>
                        <ColorField
                            value:bind="$page.dashboard.backgroundColor"
                            label="Background"
                        />
                        <TextField
                            value:bind="$page.dashboard.backgroundImgUrl"
                            label="Image URL"
                        />
                    </PureContainer>
                    <PureContainer layout={{type: LabelsTopLayout, vertical: true}}>
                        <Slider
                            value:bind="$page.dashboard.width"
                            label="Width"
                            step={1}
                            help={<cx>
                                <span text:tpl="{$page.dashboard.width}"/>
                            </cx>}
                            minValue={10}
                            maxValue={100}
                        />
                        <Slider
                            value:bind="$page.dashboard.height"
                            label="Height"
                            step={1}
                            help={<cx>
                                <span text:tpl="{$page.dashboard.height}"/>
                            </cx>}
                            minValue={10}
                            maxValue={100}
                        />
                    </PureContainer>
                </FlexRow>
            </Window>

            <PureContainer controller={PageControlller}>
                <GridLayout
                    rows:bind="$page.dashboard.height"
                    columns:bind="$page.dashboard.width"
                    minScale:expr="{$page.add} ? 0.5 : 0.75"
                    onDrop="onWidgetDrop"
                    style={{
                        flex: "1 1 0%",
                        backgroundColor: {bind: "$page.dashboard.backgroundColor"},
                        backgroundImage: {
                            tpl: '{$page.dashboard.backgroundImgUrl:wrap;url(";")}'
                        }
                    }}
                    onClick={(e, {store}) => {
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
                                        widget: {bind: "$widget"}
                                    }}
                                    onDragStart={(e, {store}) => {
                                        store.set("dropped", false);
                                    }}
                                    onDragEnd={(e, {store}) => {
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
                                            onClick={(e, {store}) => {
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
