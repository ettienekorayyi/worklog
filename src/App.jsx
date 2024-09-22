import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth";
import NewInventory from "./components/inventory/NewInventory";

import CreateJob from "./components/Jobs/CreateJob/CreateJob";
import JobDetails from "./components/Jobs/JobDetails/JobDetails";
import JobDiary from "./components/Jobs/JobDiary/JobDiary";
import GenericMessage from "./components/GenericMessage/GenericMessage";
import Dashboard from "./components/Dashboard/Dashboard";
import ViewJobs from "./components/Jobs/ViewJobs/ViewJobs";
import InventoryList from "./components/inventory/InventoryList";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navigation from "./components/Navigation/Navigation";
import TradieProfileForm from "./components/Trader/TradieProfileForm";
import InventoryDetail from "./components/inventory/InventoryDetail";
import * as Pages from "./pages/Pages";
import * as History from "history";

export const history = History.createBrowserHistory();

function App () {
    const matches = useMediaQuery("(max-width:1200px)");
    let url = matches === true ? "/mobile-login" : "/login";
    let loginRenderer = matches === true ? Pages.LoginIndex : GenericMessage;

    return (
        
            <div className='App'>
                <Switch>
                    <Route exact path={"/login"} component={loginRenderer} />
                    <Route exact path={url} component={Pages.Login} />
                    <Route
                        exact
                        path='/signup'
                        history={history}
                        component={Pages.SignUp}
                    />

                    <Auth history={history} matches={matches}>
                        <Navigation />

                        {/* Inventory Routes */}
                        <Route
                            exact={true}
                            path='/dashboard'
                            component={Dashboard}
                        />
                        <Route
                            exact={true}
                            path='/create/inventory'
                            component={NewInventory}
                        />
                        <Route
                            exact={true}
                            path='/list/inventory'
                            component={InventoryList}
                        />
                        <Route
                            exact={true}
                            path='/detail/inventory/:id'
                            component={InventoryDetail}
                        />

                        {/* Trader Routes */}
                        <Route
                            exact
                            path='/tradie/profile'
                            component={TradieProfileForm}
                        />

                        {/* Customer Routes */}
                        <Route
                            exact
                            path='/create/customer'
                            component={Pages.CustomerRegistration}
                        />
                        <Route
                            exact
                            path='/view/customers'
                            component={Pages.CustomerListPage}
                        />
                        <Route
                            exact={true}
                            path='/detail/customer/:id'
                            component={Pages.CustomerProfileUpdate}
                        />

                        {/* Job Routes */}
                        <Route exact path='/create/job' component={CreateJob} />
                        <Route exact path='/view/jobs' component={ViewJobs} />
                        <Route
                            exact
                            path='/view/jobs/diary'
                            component={JobDiary}
                        />
                        <Route
                            exact
                            path='/view/jobs/details/:id'
                            component={JobDetails}
                        />
                    </Auth>
                </Switch>
            </div>
    );
}

export default App;
