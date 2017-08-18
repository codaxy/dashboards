import { Route, PureContainer, Section, Sandbox } from 'cx/widgets';
import { FirstVisibleChildLayout } from 'cx/ui'

import AppLayout from '../layout';

import Default from './default';
import About from './about';
import Dashboard from './dashboard';
import Grid from './grid';



export default <cx>
    <Sandbox
       key:bind="url"
       storage:bind="pages"
       outerLayout={AppLayout}
       layout={FirstVisibleChildLayout}
    >
        <Route route="~/" url:bind="url">
            <Default/>
        </Route>
        <Route route="~/grid" url:bind="url">
            <Grid />
        </Route>
        <Route route="~/about" url:bind="url">
            <About/>
        </Route>
       <Route route="~/dashboard" url:bind="url">
          <Dashboard/>
       </Route>
       <Section title="Page Not Found" mod="card">
          This page doesn't exists. Please check your URL.
       </Section>
    </Sandbox>
</cx>

