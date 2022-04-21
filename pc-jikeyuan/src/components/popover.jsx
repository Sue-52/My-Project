import { Popconfirm, Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { removeToken } from "@/store/user.splice";
import { useDispatch } from "react-redux";

function Popover() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeToken());
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
