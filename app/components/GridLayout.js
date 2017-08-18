import {PureContainer, VDOM, ResizeManager} from 'cx/ui'

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
                {children}
            </div>
        </div>
    }

    componentDidMount() {
        this.componentDidUpdate();
        this.unResize = ResizeManager.subscribe(::this.componentDidUpdate)
    }

    componentDidUpdate() {
        let width = this.el.offsetWidth;
        let height = this.el.offsetHeight;
        let {data} = this.props;

        let unitWidth = width / data.columns;
        let unitHeight = height / data.rows;

        let unitSize = Math.floor(Math.min(unitWidth, unitHeight, 175));

        this.gridEl.style.width = `${data.columns * unitSize}px`;
        this.gridEl.style.height = `${data.rows * unitSize}px`;
        this.gridEl.style.fontSize = `${unitSize/14}px`;
    }

    componentWillUnmount() {
        this.unResize();
    }
}