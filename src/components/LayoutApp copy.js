import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthInfo } from "../hooks/authContext";
const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;

function LayoutApp({ children }) {
  const { user, logout } = useAuthInfo();
  return (
    <Layout className="layout">
      <div className="header-container">
        <img src='./assets/default.png' className="logo" />
        <Header className="header">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/about">About Micro-schools</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/find-school">Find your school</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/team">Our Team</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/testimonials">Testimonials</Link>
            </Menu.Item>
          </Menu>
        </Header>
        {!user ? (
          <Header className="header">
            <Menu theme="dark" mode="horizontal">
              
                <Link className="login-profile-logout" to="/login">Login</Link>
              
              <Button shape="round" className="signup-button">
                <Link to="/signup">Signup</Link>
              </Button>
            </Menu>
          </Header>
        ) : (
          <Header className="header">
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="8">
                <Link to="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link onClick={() => logout()}>Logout</Link>
              </Menu.Item>
            </Menu>
          </Header>
        )}
      </div>
      <Layout>
        {user ? (
          <Sider
            width={200}
            className="site-layout-background"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        ) : null}
        <Layout className="content">
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>with 💙 by PT Ironhackers</Footer>
    </Layout>
  );
}

export default LayoutApp;
