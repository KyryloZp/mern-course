import React from "react"
import {Redirect, Route, Switch} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreactePage} from "./pages/CreatePage";
import {DetailsPage} from "./pages/DetailsPage";
import {AuthPage} from "./pages/AuthPage";

export const useRouters = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/create" exact>
                    <CreactePage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailsPage/>
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
