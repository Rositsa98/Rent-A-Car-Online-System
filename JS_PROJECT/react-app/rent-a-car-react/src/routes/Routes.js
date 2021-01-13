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

const NavRoute = ({ exact, path, component: Component, isPrivate }) =>
  //config.isUserAuthorized(path)
  true ? (
    <AppRoute
      exact={exact}
      path={path}
      isPrivate={isPrivate}
      component={Component}
    />
  ) : (
    <Redirect to="/index" />
  );

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
          <AppRoute path="/view-users" component={ViewUsersComponent} />
          <AppRoute path="/view-user/*" component={ViewUserComponent} />
          <AppRoute path="/edit-user/*" component={EditUserComponent} />

          <AppRoute path="/view-cars" component={ViewCarsComponent} />
          <AppRoute path="/view-car/*" component={ViewCarComponent} />
          <AppRoute path="/addCar" component={AddCarComponent} />
          <AppRoute path="/edit-car/*" component={EditCarComponent} />

          <AppRoute path="/statistics" component={StatisticsComponent} />

          <AppRoute path="/my-cars" component={MyCarsComponent} />

          <AppRoute path="/logout" component={LogoutComponent} />
          <AppRoute path="/register" component={RegisterComponent} />
          {/* <Redirect from="*" to="/login" /> */}
        </Switch>
      </div>
    );
  }
}

export default Routes;
