import { Popconfirm, Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Popover() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("@#@Token");
    message.success("登出成功");
    navigate("/login", { replace: true });
  };

  return (
    <Popconfirm
      placement="bottomRight"
      title="您确认退出极客园自媒体端吗？"
      okText="确认"
      cancelText="取消"
      onConfirm={handleLogout}
    >
      <Button type="link" style={{ color: "#fff" }} icon={<LogoutOutlined />}>
        退出
      </Button>
    </Popconfirm>
  );
}

export default Popover;
