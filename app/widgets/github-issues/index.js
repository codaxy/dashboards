import Controller from './Controller';
import {enableCultureSensitiveFormatting} from 'cx/ui';

enableCultureSensitiveFormatting();

import {Repeater} from 'cx/widgets';

const defaultProps = {
    repo: 'codaxy/cxjs'
};

export default ({repo} = defaultProps) => <cx>
    <div class="kpi-header">
        Recent Issues: <strong text:bind="repo" controller={{type: Controller, repo}}/>
    </div>
    <div class="kpi-main" style="justify-content: start">
        <ul>
            <Repeater records:bind="issues">
                <li>
                    <a href:bind="$record.html_url" target="_blank" rel="noopener" text:bind="$record.title"/>
                </li>
            </Repeater>
        </ul>
    </div>
    <div class="kpi-footer">
        <a href:tpl="https://github.com/{repo}/issues" target="_blank" rel="noopener">GitHub.com</a>
    </div>
</cx>



