import React, { Component } from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "./Route";

import Index from "../components/index";
import LoginComponent from "../components/login/LoginComponent";
import LogoutComponent from "../components/logout/LogoutComponent";
import RegisterComponent from "../components/registration/RegisterComponent";
import ViewUsersComponent from "../components/view-users/ViewUsersComponent";
import ViewCarsComponent from "../components/view-cars/ViewCarsComponent";
import AddCarComponent from "../components/add-car/AddCarComponent";
import EditCarComponent from "../components/edit-car/EditCarComponent";
import EditUserComponent from "../components/edit-user/EditUserComponent";
import ViewCarComponent from "../components/view-car/ViewCarComponent";
import ViewUserComponent from "../components/view-user/ViewUserComponent";
import StatisticsComponent from "../components/statistics/StatisticsComponent";
import AppNavbar from "../components/navbar/AppNavbar";
import MyCarsComponent from "../components/my-cars/MyCarsComponent";

const AppRoute = ({ exact, path, component: Component, isPrivate }) => (
  <Route
    exact={exact}
    path={path}
    isPrivate={isPrivate}
    render={(props) => (
      <div>
        <AppNavbar></AppNavbar>
        <Component {...props} />
      </div>
    )}
  />
);

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Redirect exact from="/" to="/index" />
          <AppRoute path="/index" component={Index} />
          <Route path="/login" component={LoginComponent} />
          <AppRoute
            path="/view-users"
            component={ViewUsersComponent}
            isPrivate
          />
          <AppRoute
            path="/view-user/*"
            component={ViewUserComponent}
            isPrivate
          />
          <AppRoute
            path="/edit-user/*"
            component={EditUserComponent}
            isPrivate
          />

          <AppRoute path="/view-cars" component={ViewCarsComponent} isPrivate />
          <AppRoute path="/view-car/*" component={ViewCarComponent} isPrivate />
          <AppRoute path="/addCar" component={AddCarComponent} isPrivate />
          <AppRoute path="/edit-car/*" component={EditCarComponent} isPrivate />

          <AppRoute
            path="/statistics"
            component={StatisticsComponent}
            isPrivate
          />

          <AppRoute path="/my-cars" component={MyCarsComponent} isPrivate />

          <AppRoute path="/logout" component={LogoutComponent} />
          <AppRoute path="/register" component={RegisterComponent} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
