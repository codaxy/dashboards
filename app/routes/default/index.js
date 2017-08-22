import {DragSource, Repeater, PureContainer, Button, FlexRow, FlexCol, IsolatedScope, Sandbox} from 'cx/widgets';
import {Controller} from 'cx/ui';
import DashboardWidget from '../../components/DashboardWidget';
import {GridLayout} from '../../components/GridLayout';
import {getWidgetTypeProps} from '../../widgets';
import uid from 'uid';

class PageControlller extends Controller {
    onInit() {
        this.store.init('grid', []);

        this.store.set('widgets', getWidgetTypeProps().map(w => ({
            id: w.type,
            ...w
        })));
    }

    onWidgetDrop(e, {store}, size) {
        store.set('dropped', true);
        store.update('grid', grid => [
            ...grid,
            {
                ...e.source.data.widget,
                box: size,
                id: uid()
            }
        ])
    }
}

export default <cx>
    <h2 putInto="header">Grid Based Dashboard</h2>

    <FlexCol style="height: 100%">

        <div
            visible:bind="$page.add"
            class="drawer"
        >
            <FlexRow padding spacing="large">
                <Repeater records:bind="widgets" recordAlias="$widget">
                    <div
                        class="gallery"
                    >
                        <Sandbox key:bind="$widget.id" storage:bind="galleryData" recordAlias="$data">
                            <IsolatedScope bind={["$widget", "$data"]}>
                                <DragSource
                                    class:tpl="widget-cell {$widget.box.class}"
                                    style={{
                                        width: {expr: '{$widget.box.width} * 16'},
                                        height: {expr: '{$widget.box.height} * 16'},
                                    }}
                                    data={{
                                        type: 'widget',
                                        widget: {bind: '$widget'}
                                    }}
                                >
                                    <DashboardWidget type:bind="$widget.type" data:bind="$data"/>
                                </DragSource>
                            </IsolatedScope>
                        </Sandbox>
                    </div>
                </Repeater>
            </FlexRow>
        </div>

        <Button mod="hollow" putInto="tools" onClick={(e, {store}) => {
            store.toggle('$page.add')
        }}>
            Add
        </Button>


        <PureContainer controller={PageControlller}>
            <GridLayout
                rows={40}
                columns={80}
                onDrop="onWidgetDrop"
                style={{
                    flex: "1 1 0%",
                    marginTop: {expr: "{$page.add} ? '230px' : '0'"}
                }}
            >
                <Repeater records:bind="grid" recordAlias="$widget" keyField="id">
                    <Sandbox key:bind="$widget.id" storage:bind="widgetData" recordAlias="$data">
                        <IsolatedScope bind={["$widget", "$data"]}>
                            <DragSource
                                class:tpl="widget-cell {$widget.box.class}"
                                style={{
                                    gridArea: {tpl: '{[{$widget.box.row} + 1]} / {[{$widget.box.col} + 1]} / span {$widget.box.height} / span {$widget.box.width}'}
                                }}
                                visible:expr="{$widget.type}"
                                data={{
                                    type: 'widget',
                                    widget: {bind: '$widget'}
                                }}
                                onDragStart={(e, {store}) => {
                                    store.set('dropped', false)
                                }}
                                onDragEnd={(e, {store}) => {
                                    if (store.get('dropped'))
                                        store.delete('$widget');
                                }}
                            >
                                <DashboardWidget
                                    type:bind="$widget.type"
                                    props:bind="$widget.props"
                                    data:bind="$data"
                                />
                            </DragSource>
                        </IsolatedScope>
                    </Sandbox>
                </Repeater>
            </GridLayout>
        </PureContainer>
    </FlexCol>
</cx>;

