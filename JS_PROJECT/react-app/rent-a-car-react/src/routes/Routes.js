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
    const { user } = this.props;

    console.log(`user is`);
    console.log(user);
    return (
      <div>
        <Switch>
          <Redirect exact from="/" to="/index" />
          <NavRoute path="/index" component={Index} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/view-users" component={ViewUsersComponent} />
          <Route path="/view-cars" component={ViewCarsComponent} />
          <Route path="/addCar" component={AddCarComponent} />
          <Route path="/edit-car/*" component={EditCarComponent} />

          <Route path="/logout" component={LogoutComponent} />
          <Route path="/register" component={RegisterComponent} />
          {/* <Redirect from="*" to="/login" /> */}
        </Switch>
      </div>
    );
  }
}

export default Routes;
