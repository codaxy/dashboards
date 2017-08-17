import Controller from './Controller';
import {enableCultureSensitiveFormatting} from 'cx/ui';
enableCultureSensitiveFormatting();

import {Repeater} from 'cx/widgets';

const defaultProps = {
    repo: 'codaxy/cxjs'
};

export default ({repo} = defaultProps) => <cx>
    <div controller={{ type: Controller, repo }}>
        <div class="kpi-header">
            Stars: <strong text:bind="repo" />
        </div>
        <div class="kpi-main">
            <div
                class="kpi-value"
                text:tpl="{stars}"
            />
        </div>
        <div class="kpi-footer">
            <a href:tpl="https://github.com/{repo}/stargazers" target="_blank" rel="noopener">GitHub.com</a>
        </div>
    </div>
</cx>



