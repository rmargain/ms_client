import { Layout, Menu, Typography } from "antd";
import {
  MailOutlined,
  TeamOutlined,
  FormOutlined,
  PlusSquareOutlined,
  BankOutlined,
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
              <Menu.Item key="1">
                <Link to="/user-inbox">Inbox</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/user-unread">Unread</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/user-sent">Sent</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/user-deleted">Deleted</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="sub3" icon={<TeamOutlined />} title="My Kids">
              <Link to="/my-kids">My Kids</Link>
            </Menu.Item>
            <Menu.Item
              key="sub4"
              icon={<FormOutlined />}
              title="My Applications"
            >
              <Link to="/my-applications">My Applications</Link>
            </Menu.Item>
            {!user.isSchool ? (
              <Menu.Item
                key="sub6"
                icon={<PlusSquareOutlined />}
                title="BecomeSchool"
              >
                <Link to="/add-school">Become a School</Link>
              </Menu.Item>
            ) : (
              <Menu.Item
                key="sub6"
                icon={<PlusSquareOutlined />}
                title="BecomeSchool"
              >
                <Link to="/add-school">Add New School</Link>
              </Menu.Item>
            )}
            {user.isSchool ? (
              <>
                <Menu.Item key="sub7">
                  <Typography>My Schools</Typography>
                </Menu.Item>
                <SubMenu key="sub8" icon={<MailOutlined />} title="Messages">
                  <Menu.Item key="1">
                    <Link to="/school-inbox">Inbox</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/school-unread">Unread</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/school-sent">Sent</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/school-deleted">Deleted</Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item
                  key="sub9"
                  icon={<BankOutlined />}
                  title="My Schools"
                >
                  <Link to="/my-schools">Schools</Link>
                </Menu.Item>

                <SubMenu
                  key="sub10"
                  icon={<FormOutlined />}
                  title="Applications"
                >
                  <Menu.Item key="9">
                    <Link to="/school-applications/all">All</Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Link to="/school-applications/under-review">
                      Under Review
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="11">
                    <Link to="/school-applications/accepted">Accepted</Link>
                  </Menu.Item>
                  <Menu.Item key="12">
                    <Link to="/school-applications/rejected">Rejected</Link>
                  </Menu.Item>
                  <Menu.Item key="13">
                    <Link to="/school-applications/cancelled">Cancelled</Link>
                  </Menu.Item>
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
