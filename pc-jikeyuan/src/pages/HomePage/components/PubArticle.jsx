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
  message,
} from "antd";
const { Option } = Select;
import { PlusOutlined } from "@ant-design/icons";
// react-router
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
// axios
import {
  getAllChannels,
  sendArticle,
  getArticle,
  editArticle,
} from "@/apis/list";
// bytemd
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PubArticle() {
  const navigate = useNavigate();
  const param = useParams();

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
    setFileList([]);
  };
  //#endregion

  //#region 图片上传栏
  const [fileList, setFileList] = useState([]);
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  //#endregion

  //#region 富文本
  const [value, setValue] = useState("");
  //#endregion

  //#region  发布文章
  const onFinish = async (values, draft = false) => {
    if (type !== fileList.length) {
      return message.warning("请按照选择的封面类型上传图片");
    }
    // console.log("Success:", values);
    const data = {
      ...values,
      cover: {
        type,
        // 后台需要[string]类型
        images: fileList.map((item) => item?.response?.data?.url || item.url),
      },
    };

    if (param.id) {
      // 编辑
      await editArticle(param.id, draft, data);
      message.success("文章修改成功");
      navigate("/home/article");
    } else {
      const reuslt = await sendArticle(data, draft);
      if (reuslt.message === "OK") {
        message.success("发布成功");
        navigate("/home/article");
      }
    }
  };
  //#endregion

  //#region 存入草稿
  const handleSaveDraft = async () => {
    try {
      const values = await form.validateFields();
      onFinish(values, true);
    } catch (e) {}
  };
  //#endregion

  //#region  回显文章
  const [form] = Form.useForm();
  // console.log(form.getFieldValue("title"));
  const setFormData = async () => {
    if (param.id) {
      const { data } = await getArticle(param.id);
      console.log(data);
      const { title, cover, content, channel_id } = data;
      form.setFieldsValue({ title, content, channel_id });
      // 内容
      setValue(content);
      // 图片类别
      setType(cover.type);
      //  图片
      setFileList(cover.images.map((item) => ({ url: item })));
    } else {
      setType(1);
      setFileList([]);
      form.resetFields();
    }
  };
  useEffect(() => {
    setFormData();
  }, [param]);
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
          onFinish={onFinish}
          form={form}
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
          {/* 一个FormItem只能有一个元素 */}
          <Form.Item label="文章封面：">
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
          </Form.Item>

          {/* 富文本区域 */}
          <Form.Item label="内容：" name="content" wrapperCol={{ span: 16 }}>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </Form.Item>

          {/* 发布按钮 */}
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {param.id ? "修改文章" : "发布文章"}
            </Button>
            <Button style={{ marginLeft: 20 }} onClick={handleSaveDraft}>
              存入草稿
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default PubArticle;
