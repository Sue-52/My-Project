import React, { useEffect, useState } from "react";
// antd
import {
  Card,
  Breadcrumb,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Upload,
} from "antd";
const { Option } = Select;
import { PlusOutlined } from "@ant-design/icons";
// router
import { Link } from "react-router-dom";
// axios
import { getAllChannels } from "@/apis/list";

function PubArticle() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //#region 频道栏数据获取
  const [options, setOptions] = useState([]);
  const getChannels = async () => {
    const { data } = await getAllChannels();
    setOptions(data.channels);
  };
  useEffect(() => {
    getChannels();
  }, []);
  //#endregion

  //#region 封面栏数据
  const [type, setType] = useState(1);
  const onTypeChange = (e) => {
    setType(e.target.value);
  };
  //#endregion

  //#region 图片上传栏
  const [fileList, setFileList] = useState([]);
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  //#endregion

  return (
    <div>
      <Card
        title={
          // 面包屑
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: "20px" }}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input
              style={{ border: "1px solid #d9d9d9", padding: "5 10" }}
              size="large"
            />
          </Form.Item>

          {/* 频道栏 */}
          <Form.Item
            label="频道："
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道">
              {options.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* 封面栏 */}
          <Form.Item label="文章封面：">
            {/* 一个FormItem只能有一个元素 */}
            <Form.Item style={{ marginBottom: 0 }}>
              <Radio.Group value={type} onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
              {type > 0 ? (
                <div style={{ marginTop: 16 }}>
                  <Upload
                    name="image"
                    listType="picture-card"
                    action="http://geek.itheima.net/v1_0/upload"
                    fileList={fileList}
                    onPreview={() => {}}
                    onChange={onUploadChange}
                  >
                    {fileList.length < type ? (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    ) : null}
                  </Upload>
                </div>
              ) : null}
            </Form.Item>
            {/* 这个位置放Upload组件 */}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default PubArticle;
