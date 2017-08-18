import {DragSource, DropZone, HtmlElement, Repeater, PureContainer, Button, FlexRow, Window} from 'cx/widgets';
import {Controller} from 'cx/ui';
import DashboardWidget from '../../components/DashboardWidget';
import {GridLayout} from '../../components/GridLayout';
import {getWidgetTypes} from '../../widgets';

class PageControlller extends Controller {
    onInit() {
        this.store.init('grid', Array.from({length: 5}, (_, i) => ({
            id: i,
            widgets: Array.from({length: 10}, (_, j) => ({
                row: i,
                column: j
            }))
        })));

        this.store.set('widgets', getWidgetTypes().map(type => ({type})));
    }

    onWidgetDropped(e, {store}) {
        store.set('dropped', true);
        store.update('$widget', w => ({
            ...w,
            ...e.source.data.widget
        }))
    }
}

const createOnWidgetDrop = (getIndex) => (e, {store}) => {
    let {index, rowIndex, widget} = e.source.data;
    let newEl = {...widget};
    if (index == -1)
        store.update('$record.widgets', insertElement, getIndex(store), newEl);
    else if (rowIndex == store.get('$rowIndex'))
        store.update('$record.widgets', reorder, index, getIndex(store));
    else {
        e.source.store.update('$record.widgets', items => items.filter(item => item != widget));
        store.update('$record.widgets', insertElement, getIndex(store), newEl);
    }
};


export default <cx>
    <h2 putInto="header">Grid Based Dashboard</h2>

    <div
        visible:bind="$page.add"
        style="overflox-x: auto"
    >
        <FlexRow padding spacing="large">
            <Repeater records:bind="widgets">
                <div class="gallery">
                    <DragSource
                        class="box"
                        data={{
                            type: 'widget',
                            widget: {bind: '$record'}
                        }}
                    >
                        <DashboardWidget type:bind="$record.type"/>
                    </DragSource>
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
        <GridLayout rows={5} columns={10}>
            <Repeater records:bind="grid">
                <Repeater records:bind="$record.widgets" recordAlias="$widget">
                    <DropZone
                        visible:expr="!{$widget.type}"
                        mod="cell"
                        onDropTest={e => e.source.data.type == 'widget'}
                        onDrop="onWidgetDropped"
                    />
                    <DragSource
                        class="widget-cell"
                        visible:expr="{$widget.type}"
                        data={{
                            type: 'widget',
                            widget: {bind: '$widget'}
                        }}
                        onDragStart={(e, {store}) => {
                            store.set('dropped', false)
                        }}
                        onDragEnd={(e, {store}) => {
                            if (store.get('dropped')) {
                                store.delete('$widget.type');
                                store.delete('$widget.props');
                            }
                        }}
                    >
                        <DashboardWidget
                            type:bind="$widget.type" props:bind="$widget.props"
                        />
                    </DragSource>
                </Repeater>
            </Repeater>
        </GridLayout>
    </PureContainer>
</cx>;

