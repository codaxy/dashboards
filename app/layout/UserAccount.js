import {PureContainer, Link, Text, FlexRow} from "cx/widgets";
import {Controller, bind, expr} from "cx/ui";

import {auth} from "../api/app";

//import database from '../api/database';

class AuthController extends Controller {
    onInit() {
        auth.onAuthStateChanged(user => {
            this.store.set(
                "user",
                user && {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    id: user.uid
                }
            );
        });
    }
}

export default (
    <cx>
        <div class="userinfo" controller={AuthController}>
            <FlexRow visible={expr("!!{user.id}")} spacing>
                <img
                    src={bind("user.photoURL")}
                    style="height: 60px; display: block;"
                />
                <div>
                    <p>
                        <strong text:bind="user.displayName"/>
                    </p>
                    <p>
                        <Link
                            href="~/sign-in"
                            url={bind("url")}
                            class="nav-user"
                        >
                            Sign Out
                        </Link>
                    </p>
                </div>
                <Link
                    href="~/sign-in"
                    url={bind("url")}
                    mod="top"
                    visible={expr("!{user.id} && !{user.loading}")}
                >
                    Sign In
                </Link>
            </FlexRow>
        </div>
    </cx>
);
