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
        {/* <AppNavbar></AppNavbar> */}
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
          <Route path="/index" component={Index} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/view-users" component={ViewUsersComponent} />
          <Route path="/view-user/*" component={ViewUserComponent} />
          <Route path="/edit-user/*" component={EditUserComponent} />

          <Route path="/view-cars" component={ViewCarsComponent} />
          <Route path="/view-car/*" component={ViewCarComponent} />
          <Route path="/addCar" component={AddCarComponent} />
          <Route path="/edit-car/*" component={EditCarComponent} />

          <Route path="/statistics" component={StatisticsComponent} />

          <Route path="/logout" component={LogoutComponent} />
          <Route path="/register" component={RegisterComponent} />
          {/* <Redirect from="*" to="/login" /> */}
        </Switch>
      </div>
    );
  }
}

export default Routes;
