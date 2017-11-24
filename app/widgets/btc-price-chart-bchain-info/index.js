import {Rescope} from "cx/widgets";

import Controller from "./Controller";
import {enableCultureSensitiveFormatting} from "cx/ui";
import {LoadingOverlay} from "../../components/LoadingOverlay";
import {Chart, LineGraph, Gridlines, NumericAxis, TimeAxis} from "cx/charts";
import {Svg} from "cx/svg";

enableCultureSensitiveFormatting();

const defaultProps = {};

export default (props = defaultProps) => (
    <cx>
        <Rescope bind="$data">
            <div class="kpi-header" controller={Controller}>
                BTC price (last 30 days)
            </div>
            <div class="kpi-main">
                <LoadingOverlay
                    status:bind="status"
                    error:bind="error"
                    onRetry="fetchPrice"
                >
                    <Svg style="width:100%; height:100%;">
                        <Chart
                            margin="5 0 5 0"
                            axes={{
                                x: {type: TimeAxis, hidden: true},
                                y: {
                                    type: NumericAxis,
                                    vertical: true,
                                    secondary: true,
                                    labelAnchor: 'end',
                                    labelOffset: -5,
                                    format: 'currency'
                                }
                            }}
                        >
                            <Gridlines/>
                            <LineGraph data:bind="data.values" lineStyle="stroke: black; stroke-width: 2px"/>
                        </Chart>
                    </Svg>
                </LoadingOverlay>
            </div>
            <div class="kpi-footer">
                <a href="https://blockchain.info/charts/market-price?timespan=30days" target="_blank" rel="noopener">
                    blockchain.info
                </a>
            </div>
        </Rescope>
    </cx>
);
