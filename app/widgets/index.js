const widgets = {};

export function registerWidget(type, factory) {
    widgets[type] = factory;
}

export function createWidget(type, props) {
    return widgets[type](props);
}

export function getWidgetTypes() {
    return Object.keys(widgets);
}

registerWidget('time', (props) => System.import('./time').then(x=>x.default(props)));
registerWidget('btc-price-bchain-info', (props) => System.import('./btc-price-bchain-info').then(x=>x.default(props)));
registerWidget('github-stars', (props) => System.import('./github-stars').then(x=>x.default(props)));
registerWidget('github-issues', (props) => System.import('./github-issues').then(x=>x.default(props)));

