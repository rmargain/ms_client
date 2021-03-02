import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header} = Layout;


function LeftMenu() {
  return (
    <Header className="header">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">
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
        <Menu.Item key="5">
          <Link to="/testimonials">
            Testimonials
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default LeftMenu;
