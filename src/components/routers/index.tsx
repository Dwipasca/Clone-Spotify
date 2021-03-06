// ? lib third party
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// ? redux
import { useAppSelector } from "store/index";

// ?components
import Login from "pages/login";
import PrivateRoute from "./privateRouter";
import { Routers } from "./root.routers";

const ListRouter = () => {
  const isLogin = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              isLogin ? <Redirect to="/create-playlist" /> : <Login />
            }
          />
          {Routers.map((route) => (
            <PrivateRoute
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
};

export default ListRouter;
