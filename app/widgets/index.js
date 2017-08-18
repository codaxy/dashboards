const widgets = {};
const props = {};

export function registerWidget(type, defaultProps, factory) {
    widgets[type] = factory;
    props[type] = defaultProps;
}

export function createWidget(type, props) {
    return widgets[type](props);
}

export function getWidgetTypes() {
    return Object.keys(widgets);
}

export function getWidgetTypeProps() {
    return Object.keys(widgets).map(type=>({
        type,
        rect: props[type]
    }));
}

registerWidget('time', { width: 4, height: 4 }, (props) => System.import('./time').then(x=>x.default(props)));
registerWidget('btc-price-bchain-info', { width: 4, height: 4 }, (props) => System.import('./btc-price-bchain-info').then(x=>x.default(props)));
registerWidget('github-stars', { width: 4, height: 4 }, (props) => System.import('./github-stars').then(x=>x.default(props)));
registerWidget('github-issues', { width: 8, height: 4 }, (props) => System.import('./github-issues').then(x=>x.default(props)));

