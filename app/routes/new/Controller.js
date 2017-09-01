import { Controller, History } from 'cx/ui';
import { database } from '../../api/app';
import uid from 'uid';

export default class extends Controller {
    onInit() {
        let id = uid();
        let userId = this.store.get('user.id');
        let title = 'New dashboard';

        let create, associate;

        create = database
            .ref(`dashboards/${id}`)
            .set({
                title: 'New dashboard',
                owner: userId || 'public',
                widgets: []
            })
            .then(() => {
                if (userId)
                    return associate = database.ref(`user/${userId}/dashboards/${id}`).set({
                        title
                    });
            })
            .then(() => {
                History.replaceState({}, null, `~/${id}`)
            });
    }
}