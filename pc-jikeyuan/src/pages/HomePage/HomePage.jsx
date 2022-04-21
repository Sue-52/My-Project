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
import { NavLink, Outlet, useParams } from "react-router-dom";
// 接口
const { Header, Content, Sider } = Layout;

function HomePage() {
  // 存储用户名
  const [userName, setUserName] = useState("");
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
      <Header style={{ padding: "0px" }}>
        <div className="logo"></div>
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <Popover />
        </div>
      </Header>
      <Layout>
        <Sider>
          <Menu defaultSelectedKeys={["1"]} mode="inline" theme="dark">
            <Menu.Item icon={<PieChartOutlined />} key="1">
              <NavLink to="/home">数据面板</NavLink>
            </Menu.Item>
            <Menu.Item icon={<SolutionOutlined />} key="2">
              <NavLink to="/article">内容管理</NavLink>
            </Menu.Item>
            <Menu.Item icon={<FileWordOutlined />} key="3">
              <NavLink to="/publish">发布文章</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: "20px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomePage;
