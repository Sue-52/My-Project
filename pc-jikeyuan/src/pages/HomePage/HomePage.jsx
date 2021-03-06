import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../apis/userInfo";
import Popover from "@/components/popover";
// 引入样式
import "./style/index.scss";
import {
  PieChartOutlined,
  SolutionOutlined,
  FileWordOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet, useLocation } from "react-router-dom";

// 接口
const { Header, Content, Sider } = Layout;

function HomePage() {
  // 存储用户名
  const [userName, setUserName] = useState("");
  // 获取当前路由
  const location = useLocation();
  // console.log(location.pathname);
  // 发起请求获取用户名
  const handleGetUserInfo = async () => {
    const result = await getUserInfo();
    const { data } = result;
    setUserName(data.name);
  };
  useEffect(() => {
    handleGetUserInfo();
  }, []);

  return (
    <Layout style={{ height: "100%" }}>
      {/* 顶部导航栏 */}
      <Header
        style={{ padding: "0px", position: "fixed", zIndex: 1, width: "100%" }}
      >
        <div className="logo"></div>
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <Popover />
        </div>
      </Header>
      <Layout style={{ height: "100%" }}>
        {/* 侧边栏 */}
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            paddingTop: 64,
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu
            selectedKeys={[
              location.pathname === "/home"
                ? "1"
                : location.pathname === "/home/article"
                ? "2"
                : "3",
            ]}
            mode="inline"
            theme="dark"
          >
            <Menu.Item icon={<PieChartOutlined />} key="1">
              <NavLink to="/home">数据面板</NavLink>
            </Menu.Item>
            <Menu.Item icon={<SolutionOutlined />} key="2">
              <NavLink to="/home/article">内容管理</NavLink>
            </Menu.Item>
            <Menu.Item icon={<FileWordOutlined />} key="3">
              <NavLink to="/home/publish">发布文章</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          style={{
            padding: "20px",
            marginLeft: 200,
            marginTop: 74,
            height: "100%",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomePage;
