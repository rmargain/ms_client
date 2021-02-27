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
const {  Content, Footer } = Layout;


function LayoutApp({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [folded, setFolded] = useState(true)
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
      <Layout>
        <LeftSlider folded={folded} setFolded={setFolded} />
        {folded ? <MenuUnfoldOutlined onClick={() => setFolded(!folded)} /> : <MenuFoldOutlined onClick={() => setFolded(!folded)}/>}
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
