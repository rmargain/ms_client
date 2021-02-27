import { BrowserRouter, Switch, Route } from "react-router-dom";
import LayoutApp from "./components/LayoutApp";
import PrivateRoute from "./components/PrivateRoute";
import LoggedOutRoute from "./components/LoggedOutRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AccountConfirmation from "./pages/AccountConfirmation";

const Home = () => <h1>Home</h1>;
// const Signup = () => <h1>Signup</h1>
// const Login = () => <h1>Login</h1>
const Profile = () => <h1>Profile</h1>;

function Router() {
  return (
    <BrowserRouter>
      <LayoutApp>
        <Switch>
          <Route component={Home} path="/" exact />
          <LoggedOutRoute component={Signup} path="/signup" />
          <LoggedOutRoute component={Login} path="/login" />
          <PrivateRoute component={Profile} path="/profile" />
          <Route
            component={AccountConfirmation}
            path="/confirm/:confirmationCode"
            
          />
        </Switch>
      </LayoutApp>
    </BrowserRouter>
  );
}

export default Router;
