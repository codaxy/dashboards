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
        box: props[type]
    }));
}

registerWidget('text', { width: 4, height: 2, class: 'text' }, (props) => System.import('./text').then(x=>x.default(props)));
registerWidget('time', { width: 12, height: 8, class: 'kpi' }, (props) => System.import('./time').then(x=>x.default(props)));
registerWidget('btc-price-bchain-info', { width: 8, height: 8, class: 'kpi' }, (props) => System.import('./btc-price-bchain-info').then(x=>x.default(props)));
registerWidget('github-stars', { width: 8, height: 8, class: 'kpi' }, (props) => System.import('./github-stars').then(x=>x.default(props)));
registerWidget('github-issues', { width: 20, height: 12, class: 'kpi' }, (props) => System.import('./github-issues').then(x=>x.default(props)));

