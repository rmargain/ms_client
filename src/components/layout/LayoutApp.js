import {useState} from 'react'
import { Layout, Button } from "antd";
import {
  MenuOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import LeftSlider from "./LeftSlider";
import RightSider from "./RightSider";
import { useAuthInfo } from "../../hooks/authContext";
const {  Content, Footer } = Layout;


function LayoutApp({ children }) {
  const [collapsed, setCollapsed] = useState(true)
  const [folded, setFolded] = useState(true)
  const {user} = useAuthInfo()
  return (
    <Layout className="layout">
      <div className="header-container">
        <img src="/assets/default.png" alt="logo" className="logo" />
        <div className="left-menu">
          <LeftMenu />
        </div>
        <div className="right-menu">
          <RightMenu />
        </div>
        <div className="menu-button">
          <Button
            shape="circle"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
      </div>
      <Layout className='middle-layout'>
        <div className='left-panel' >
        {user ? (
          <>
          {folded ? (
            <Button
              onClick={() => setFolded(!folded)}
              icon={<MenuUnfoldOutlined />}
              shape="circle"
              className="left-menu-button"
            ></Button>
          ) : (
            <Button
              onClick={() => setFolded(!folded)}
              icon={<MenuFoldOutlined />}
              shape="circle"
              className="left-menu-button"
            ></Button>
          )}
          </>
        )
          : null
        }
          <LeftSlider className='left-sider' folded={folded} setFolded={setFolded} />
        </div>
        <Layout className="content">
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              overflow: 'auto',
            }}
          >
            {children}
          </Content>
          <div className="vertical-nav">
            <RightSider collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>with 💙 by PT Ironhackers</Footer>
    </Layout>
  );
}

export default LayoutApp;
