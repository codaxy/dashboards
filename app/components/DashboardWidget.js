import {createFunctionalComponent} from 'cx/ui';
import { createWidget } from '../widgets';
import {ContentResolver} from "cx/widgets";

export default ({ type, props }) => <cx>
    <ContentResolver params={{ type, props }} onResolve={({type, props }) => createWidget(type, props)} />
</cx>
