import Controller from './Controller';
import {enableCultureSensitiveFormatting} from 'cx/ui';
enableCultureSensitiveFormatting();

const defaultProps = {
    repo: 'codaxy/cxjs'
};

export default ({repo} = defaultProps) => <cx>
    <div class="kpi-header" controller={{type: Controller, repo}}>
        Stars: <strong text:bind="repo"/>
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
</cx>



