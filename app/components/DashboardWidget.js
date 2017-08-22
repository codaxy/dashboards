import {createWidget} from '../widgets';
import {ContentResolver, Rescope} from "cx/widgets";

export default ({type, data, props}) => <cx>
    <ContentResolver
        params={{type, props}}
        onResolve={
            ({type, props}) => createWidget(type, props)
                .then(w => <cx>
                    <Rescope bind={data.bind}>
                        {w}
                    </Rescope>
                </cx>)
        }
    />
</cx>
