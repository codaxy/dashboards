import {HtmlElement, LinkButton, Link, Section, FlexRow, Icon} from "cx/widgets";

import Controller from "./Controller";
import {Repeater, VDOM} from "cx/ui";

Icon.register('dashboard', (props) =>
    <svg
        viewBox="0 0 16 16"
        {...props}
    >
        <path
            fill="currentColor"
            d="M1 1h4v4H1V1zM6 1h4v4H6V1zM11 1h4v4h-4V1zM1 6h9v4H1V6zM11 6h4v9h-4V6zM1 11h9v4H1v-4z"
        />
    </svg>
);

export default (
    <cx>
        <LinkButton href="~/new" mod="primary" putInto="tools">
            New Dashboard
        </LinkButton>

        <h2 putInto="header">Home</h2>

        <FlexRow
            controller={Controller}
            align="center"
            justify="center"
            style="height: 100%"
        >
            <Section mod="card" class="home">
                <h3>My Dashboards</h3>

                <FlexRow spacing wrap>
                    <Repeater records:bind="dashboards">
                        <LinkButton
                            mod="hollow"
                            icon="dashboard"
                            href:tpl="~/{$record.id}"
                            text:tpl="{$record.title}"
                            style="min-width: 200px"
                        />
                    </Repeater>
                    <div visible:expr="!{dashboards.length}">
                        <p ws>
                            <i>No dashboards in your inventory.</i>
                        </p>
                        <LinkButton>Create new Dashboard</LinkButton>
                    </div>
                </FlexRow>
                <br/>

                <h3>Samples</h3>

                <FlexRow controller={Controller} spacing wrap>
                    <LinkButton
                        mod="hollow"
                        icon="dashboard"
                        href="~/lao6cfj"
                        text="Crypto"
                        style="min-width: 200px"
                    />
                </FlexRow>
            </Section>
        </FlexRow>
    </cx>
);
