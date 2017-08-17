import Controller from './Controller';
import {enableCultureSensitiveFormatting} from 'cx/ui';
enableCultureSensitiveFormatting();

const defaultProps = {};

export default (props = defaultProps) => <cx>
    <div controller={Controller}>
        <div class="kpi-header">
            Time
        </div>
        <div class="kpi-main">
            <div
                class="kpi-value"
                text:tpl="{time:datetime;hhmma}"
            />
        </div>
        <div class="kpi-footer" ws>
            <span text:tpl="{time:datetime;DDDD}" />
            <span text:tpl="{time:date}" />
        </div>
    </div>
</cx>


