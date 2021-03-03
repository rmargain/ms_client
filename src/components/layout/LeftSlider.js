import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  FormOutlined,
  PlusSquareOutlined,
  BankOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthInfo } from "../../hooks/authContext";
const { Sider } = Layout;
const { SubMenu } = Menu;

function LeftSlider({ folded, setFolded }) {
  const { user } = useAuthInfo();
  return (
    <div className="aver">
      {user ? (
        <Sider
          width={200}
          className="left-sider"
          collapsedWidth="0"
          onCollapse={() => {
            setFolded(!folded);
          }}
          collapsed={folded}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item disabled={true} key="sub1">
              <Typography>{user.name}</Typography>
            </Menu.Item>
            <SubMenu key="sub2" icon={<MailOutlined />} title="Messages">
              <Menu.Item key="1">Inbox</Menu.Item>
              <Menu.Item key="2">Unread</Menu.Item>
              <Menu.Item key="3">Sent</Menu.Item>
              <Menu.Item key="4">Trash</Menu.Item>
            </SubMenu>
            <Menu.Item key="sub3" icon={<TeamOutlined />} title="My Kids">
              <Link to="/my-kids">My Kids</Link>
            </Menu.Item>
            <Menu.Item
              key="sub4"
              icon={<FormOutlined />}
              title="My Applications"
            >
              My Applications
            </Menu.Item>
            <Menu.Item key="sub5" icon={<UserOutlined />} title="Profile">
              Profile
            </Menu.Item>
            {!user.isSchool ? (
              <Menu.Item
                key="sub6"
                icon={<PlusSquareOutlined />}
                title="BecomeSchool"
              >
                Become a School
              </Menu.Item>
            ) : (
              <Menu.Item
                key="sub6"
                icon={<PlusSquareOutlined />}
                title="BecomeSchool"
              >
                Add New School
              </Menu.Item>
            )}
            {user.isSchool ? (
              <>
                <Menu.Item key="sub7">
                  <Typography>My Schools</Typography>
                </Menu.Item>
                <SubMenu key="sub8" icon={<MailOutlined />} title="Messages">
                  <Menu.Item key="5">Inbox</Menu.Item>
                  <Menu.Item key="6">Unread</Menu.Item>
                  <Menu.Item key="7">Sent</Menu.Item>
                  <Menu.Item key="8">Trash</Menu.Item>
                </SubMenu>
                <Menu.Item
                  key="sub9"
                  icon={<BankOutlined />}
                  title="My Schools"
                >
                  Schools
                </Menu.Item>
                <SubMenu
                  key="sub10"
                  icon={<FormOutlined />}
                  title="Applications"
                >
                  <Menu.Item key="9">Under Review</Menu.Item>
                  <Menu.Item key="10">Accepted</Menu.Item>
                  <Menu.Item key="11">Rejected</Menu.Item>
                </SubMenu>
              </>
            ) : null}
          </Menu>
        </Sider>
      ) : null}
    </div>
  );
}

export default LeftSlider;
