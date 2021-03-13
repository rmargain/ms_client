import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { useAuthInfo } from "../../hooks/authContext";
const { Sider } = Layout;

function RightSider({collapsed, setCollapsed}) {
    const { user, logout } = useAuthInfo();
  return (
    <>
      <Sider collapsible collapsedWidth={0} collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} >
        <Menu>

        <Menu.Item key="1">
          <Link  to="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">
            About Micro-schools
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/find-school">
            Find your school
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/team">
            Our Team
          </Link>
        </Menu.Item>
        </Menu>
        
            {!user ? (
        
          <Menu>
          <Menu.Item key="5">

            <Link
              className="login-profile-logout"
              to="/login"
            >
              Login
            </Link>
          </Menu.Item>

            <Button shape="round" className="signup-button">
              <Link to="/signup">Signup</Link>
            </Button>
          </Menu>
        
      ) : (
          <Menu >
            <Menu.Item key="6">
              <Link onClick={() => logout()}>Logout</Link>
            </Menu.Item>
          </Menu>
    
      )}
        
      </Sider>
    </>
  );
}

export default RightSider;
