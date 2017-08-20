import {DragSource, Repeater, PureContainer, Button, FlexRow, FlexCol} from 'cx/widgets';
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
                box: size
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
                <Repeater records:bind="widgets">
                    <div class="gallery">
                        <DragSource
                            class:tpl="widget-cell {$record.box.class}"
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
                style="flex: 1 0 0%"
            >
                <Repeater records:bind="grid" recordAlias="$widget">
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
                        />
                    </DragSource>
                </Repeater>
            </GridLayout>
        </PureContainer>
    </FlexCol>
</cx>;

