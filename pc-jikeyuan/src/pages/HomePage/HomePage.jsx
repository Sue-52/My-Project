import { Layout } from "antd";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../apis/userInfo";
import Popover from "@/components/popover";
// 引入样式
import "./style/index.scss";
// 接口
const { Header, Content, Sider } = Layout;

function HomePage() {
  const [userName, setUserName] = useState("");

  const handleGetUserInfo = async () => {
    const result = await getUserInfo();
    console.log(result);
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
        <Sider>left sidebar</Sider>
        <Content style={{ padding: "20px" }}>
          <div className="content-img"></div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomePage;
