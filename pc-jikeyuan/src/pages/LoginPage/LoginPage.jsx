import { Button, Card, Checkbox, Form, Input, message } from "antd";
import "./style/index.scss";

import { login } from "@/apis/login";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleFinshForm = async (values) => {
    // 路由跳转
    let result = await login(values);
    const { data } = result;
    const token = data.token;

    if (result.message === "OK") {
      // 本地持久化
      localStorage.setItem("@#@Token", token);
      message.success("登录成功");
      navigate("/home", { replace: true });
    }
  };

  return (
    <div id="login">
      <Card className="login-wrapper">
        <img
          src="http://geek-pc.itheima.net/static/media/logo.536c5d80.png"
          alt=""
          className="logo"
        />
        <Form
          onFinish={handleFinshForm}
          initialValues={{
            mobile: "13911111111",
            code: "246810",
          }}
        >
          {/* 用户名/账号 */}
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: "请输入手机号" }]}
          >
            <Input
              bordered="true"
              maxLength="11"
              size="large"
              className="ant-input-lg"
            />
          </Form.Item>
          {/* 验证码 */}
          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input bordered="true" maxLength="6" className="ant-input-lg" />
          </Form.Item>
          {/* checkbox */}
          <Form.Item>
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>
          {/* 登录按钮 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登 录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
