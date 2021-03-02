import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { useAuthInfo } from "../../hooks/authContext";
const { Header } = Layout;


function RightMenu() {
  const { user, logout } = useAuthInfo();
  return (
    <>
      {!user ? (
        <Header className="header">
          <Menu theme="dark" mode="horizontal">
            <Link className="login-profile-logout" to="/login">
              Login
            </Link>

            <Button shape="round" className="signup-button">
              <Link to="/signup">Signup</Link>
            </Button>
          </Menu>
        </Header>
      ) : (
        <Header className="header">
          <Menu theme="dark" mode="horizontal">
            <Link className="login-profile-logout" to="/profile">
              Profile
            </Link>
            <Button shape="round" className="signup-button">
            <Link className="login-profile-logout" onClick={() => logout()}>
              Logout
            </Link>
            </Button>
          </Menu>
        </Header>
      )}
    </>
  );
}
export default RightMenu;
