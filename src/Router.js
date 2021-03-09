import { BrowserRouter, Switch, Route } from "react-router-dom";
import LayoutApp from "./components/layout/LayoutApp";
import PrivateRoute from "./components/PrivateRoute";
import LoggedOutRoute from "./components/LoggedOutRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AccountConfirmation from "./pages/AccountConfirmation";
import Kids from "./pages/MyStudents"
// import BecomeSchool from "./pages/BecomeSchool";
import BecomeSchool from "./pages/BecomeSchool"
import SchoolMap from './pages/SchoolMap'
import MySchools from './pages/MySchools'
import EditSchool from './pages/EditSchool'
import UserApplications from './pages/UserApplications'


const Home = () => <h1>Home</h1>;
const MyApplications = () => <h1>Signup</h1>
const UserMessages = () => <h1>Login</h1>
const Profile = () => <h1>Profile</h1>;

function Router() {
  return (
    <BrowserRouter>
      <LayoutApp>
        <Switch>
          {/* Home */}
          <Route component={Home} path="/" exact />
          {/* Auth */}
          <LoggedOutRoute component={Signup} path="/signup" />
          <LoggedOutRoute component={Login} path="/login" />
          {/* Profile */}
          <PrivateRoute component={Profile} path="/profile" />
          {/* Account Confirmation */}
          <Route component={AccountConfirmation} path="/confirm/:confirmationCode"/>
          {/* User Routes  */}
          <PrivateRoute component={Kids} path="/my-kids" />
          <PrivateRoute component={BecomeSchool} path="/add-school" />
          <PrivateRoute component={MySchools} path='/my-schools' />
          <PrivateRoute component={EditSchool} path='/edit-school/:schoolId'/>
          <PrivateRoute component={UserApplications} path='/my-applications' />
          <PrivateRoute component={UserMessages} path='/messages' />
          {/* Search Schools */}
          <Route component={SchoolMap} path='/find-school' />
        </Switch>
      </LayoutApp>
    </BrowserRouter>
  );
}

export default Router;
