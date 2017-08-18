import {PureContainer, VDOM, ResizeManager} from 'cx/ui';

import { registerDropZone } from 'cx/widgets';

export class GridLayout extends PureContainer {
    declareData() {
        return super.declareData(...arguments, {
            rows: undefined,
            columns: undefined
        })
    }

    render(context, instance, key) {
        let {data} = instance;
        return <Grid key={key} data={data} instance={instance}>
            {this.renderChildren(context, instance)}
        </Grid>
    }
}

GridLayout.prototype.baseClass = "gridlayout";
GridLayout.prototype.styled = true;

function createRef(scope, name) {
    return scope[`${name}Ref`] ||
        (scope[`${name}Ref`] = function (el) {
            scope[name] = el;
        });
}

class Grid extends VDOM.Component {
    render() {
        let {data, instance, children} = this.props;
        let {CSS, baseClass} = instance.widget;

        return <div className={data.classNames} ref={createRef(this, "el")}>
            <div
                className={CSS.element(baseClass, "grid")}
                style={{
                    gridTemplateColumns: `repeat(${data.columns}, 1fr)`,
                    gridTemplateRows: `repeat(${data.rows}, 1fr)`,
                }}
                ref={createRef(this, "gridEl")}
            >
                {
                    this.state && this.state.dd == 'hover' &&
                        <div
                            className={CSS.element(baseClass, "drop-marker")}
                            style={{
                                gridArea: `${this.state.dropRow + 1} / ${this.state.dropCol + 1} / span ${this.state.dropHeight} / span ${this.state.dropWidth}`
                            }}
                        />
                }
                {children}
            </div>
        </div>
    }

    componentDidMount() {
        this.unResize = ResizeManager.subscribe(::this.componentDidUpdate);
        this.unDropZone = registerDropZone(this);
        this.componentDidUpdate();
    }

    onDragMeasure(e) {
        let bounds = this.gridEl.getBoundingClientRect();
        let cx = e.cursor.clientX - e.source.deltaX + e.source.width / 2;
        let cy = e.cursor.clientY - e.source.deltaY + e.source.height / 2;

        let size = e.source.data.widget.rect || { width: 4, height: 4 };

        let row = Math.round((cy - bounds.top) / this.unitSize - size.height / 2);
        let col = Math.round((cx - bounds.left) / this.unitSize - size.width / 2);
        let {data} = this.props;



        if (0 <= row && row < data.rows && 0 <= col && col < data.columns) {
            this.setState({
                dd: 'hover',
                dropRow: row,
                dropCol: col,
                dropWidth: size.width,
                dropHeight: size.height
            });
            return {
                over: 1
            }
        }

        return false;
    }

    onDragLeave() {
        this.setState({
            dd: false
        })
    }

    onDragEnd() {
        this.setState({
            dd: false
        })
    }

    onDrop(e, source) {
        let {instance} = this.props;
        let {widget} = instance;

        if (widget.onDrop) {
            instance.invoke("onDrop", e, instance, {
                row: this.state.dropRow,
                col: this.state.dropCol,
                width: this.state.dropWidth,
                height: this.state.dropHeight
            });
        }
    }

    componentDidUpdate() {
        let width = this.el.offsetWidth;
        let height = this.el.offsetHeight;
        let {data} = this.props;

        let unitWidth = width / data.columns;
        let unitHeight = height / data.rows;

        let unitSize = this.unitSize = Math.floor(Math.min(unitWidth, unitHeight, 175));

        this.gridEl.style.width = `${data.columns * unitSize}px`;
        this.gridEl.style.height = `${data.rows * unitSize}px`;
    }

    componentWillUnmount() {
        this.unResize();
        this.unDropZone();
    }
}