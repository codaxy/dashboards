import {Controller} from 'cx/ui';

export default class extends Controller {
    onInit() {
        this.timer = setInterval(::this.updateTime, 1000);
        this.updateTime();
    }

    onDestroy() {
        clearInterval(this.timer);
    }

    updateTime() {
        this.store.set('time', Date.now());
    }
}