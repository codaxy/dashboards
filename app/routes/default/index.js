import {DragSource, DropZone, HtmlElement, Repeater, Button, FlexCol, FlexRow, DragHandle, Window} from 'cx/widgets';
import {Controller} from 'cx/ui';
import {reorder} from './reorder';
import {insertElement} from './insertElement';
import DashboardWidget from '../../components/DashboardWidget';
import { getWidgetTypes } from '../../widgets';

class PageControlller extends Controller {
    onInit() {
        this.store.init('rows', Array.from({length: 5}, (_, i) => ({
            id: i,
            widgets: []
        })));

        this.store.set('widgets', getWidgetTypes().map(type =>({ type })));
    }

    addRow() {
        this.store.update('rows', rows => [...rows, {
            id: rows.length,
            widgets: []
        }]);
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

const Row = <cx>
    <DragSource
        class="row"
        data={{type: 'row', index: {bind: "$rowIndex"}}}
        hideOnDrag
    >
        <FlexRow style="min-height: 150px">
            <Repeater
                records:bind="$record.widgets"
                recordAlias="$widget"
            >
                <DropZone mod="box"
                    class="drop"
                    onDropTest={e => e.source.data.type == 'widget'}
                    onDrop={createOnWidgetDrop(store => store.get('$index'))}
                    matchWidth
                    matchHeight
                    matchMargin
                    hinflate={100}
                />
                <DragSource
                    data={{
                        type: 'widget',
                        rowIndex: {bind: '$rowIndex'},
                        widget: {bind: '$widget'},
                        index: {bind: "$index"}
                    }}
                    hideOnDrag
                    class="box"
                >
                    <DashboardWidget type:bind="$widget.type" props:bind="$widget.props" />
                </DragSource>
            </Repeater>

            <DropZone
                mod="box"
                class="drop last"
                onDropTest={e => e.source.data.type == 'widget'}
                onDrop={createOnWidgetDrop(store => -1)}
                matchWidth
                //matchHeight
                //matchMargin
                hinflate={100}
            />

            <DragHandle style="background:rgba(255, 255, 255, 0.5);width: 20px; cursor: move"/>

        </FlexRow>
    </DragSource>
</cx>

export default <cx>
    <div putInto="aside">

    </div>

    <h2 putInto="header">Dashboard</h2>

    <Button mod="hollow" putInto="tools" onClick={(e, {store}) => { store.toggle('$page.add')}}>
        Add
    </Button>

    <Window
        title="Add Widget"
        visible:bind="$page.add"
        style="width: 90vw; height: 80vh"
        center
        modal
    >
        <FlexRow padding spacing="large" wrap>
            <Repeater records:bind="widgets">
                <div class="gallery">
                <DragSource
                    class="box"
                    data={{
                        type: 'widget',
                        widget: {bind: '$record'},
                        index: -1,
                        rowIndex: -1
                    }}
                    onDragStart={(e, {store}) => {
                        store.set('$page.add', false);
                    }}
                    onDragEnd={(e, {store}) => {
                        store.set('$page.add', true);
                    }}
                >
                    <DashboardWidget type:bind="$record.type" />

                </DragSource>
                </div>
            </Repeater>
        </FlexRow>
    </Window>

    <div controller={PageControlller}>
        <DropZone
            mod="block"
            onDropTest={e => e.source.data.type == 'row'}
            onDrop={(e, {store}) => {
                store.update('rows', reorder, e.source.data.index, 0);
            }}
            matchHeight
            matchMargin
            inflate={300}
        >
        </DropZone>
        <Repeater
            records:bind="rows"
            keyField="id"
            indexAlias="$rowIndex"
        >
            {Row}
            <DropZone mod="block"
                onDropTest={e => e.source.data.type == 'row'}
                onDrop={(e, {store}) => {
                    store.update('rows', reorder, e.source.data.index, store.get('$rowIndex') + 1);
                }}
                matchHeight
                //matchMargin
                inflate={300}
            >
            </DropZone>
        </Repeater>
        <br/>
        <Button onClick="addRow">Add Row</Button>
    </div>

</cx>;

