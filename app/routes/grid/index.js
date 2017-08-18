import {DragSource, DropZone, HtmlElement, Repeater, PureContainer, Button, FlexRow, Window} from 'cx/widgets';
import {Controller} from 'cx/ui';
import DashboardWidget from '../../components/DashboardWidget';
import {GridLayout} from '../../components/GridLayout';
import {getWidgetTypeProps} from '../../widgets';

class PageControlller extends Controller {
    onInit() {
        this.store.init('grid', []);

        this.store.set('widgets', getWidgetTypeProps());
    }

    onWidgetDrop(e, {store}, size) {
        store.set('dropped', true);
        store.update('grid', grid => [
            ...grid,
            {
                ...e.source.data.widget,
                rect: size
            }
        ])
    }
}

export default <cx>
    <h2 putInto="header">Grid Based Dashboard</h2>

    <div
        visible:bind="$page.add"
        class="drawer"
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
        <GridLayout
            rows={20}
            columns={40}
            onDrop="onWidgetDrop"
        >
            <Repeater records:bind="grid" recordAlias="$widget">
                <DragSource
                    class="widget-cell"
                    style={{
                        gridArea: {tpl: '{[{$widget.rect.row} + 1]} / {[{$widget.rect.col} + 1]} / span {$widget.rect.height} / span {$widget.rect.width}'}
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
                    />
                </DragSource>
            </Repeater>
        </GridLayout>
    </PureContainer>
</cx>;

