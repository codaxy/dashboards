import Controller from "./Controller";
import {enableCultureSensitiveFormatting} from "cx/ui";
import {ContentResolver} from "cx/ui";

enableCultureSensitiveFormatting();

export default ({repo}) => (
    <cx>
        <div class="kpi-header" ws controller={{type: Controller, repo}}>
            Stars:
            <a
                href="#"
                onClick={(e, {store}) => {
                    e.preventDefault();
                    store.toggle("$data.settings.visible");
                }}
            >
                <strong text:bind="$data.repo"/>
            </a>
        </div>
        <div class="kpi-main">
            <div class="kpi-value" text:tpl="{$data.stars}"/>
        </div>
        <div class="kpi-footer">
            <a
                href:tpl="https://github.com/{$data.repo}/stargazers"
                target="_blank"
                rel="noopener"
            >
                GitHub.com
            </a>
        </div>

        <ContentResolver
            visible:bind="$data.settings.visible"
            onResolve={() => System.import("../github-issues/settings").then(x => x.default)}
        />
    </cx>
);
