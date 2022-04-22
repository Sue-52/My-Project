import {
  Form,
  Button,
  Card,
  Breadcrumb,
  Radio,
  Select,
  DatePicker,
} from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllChannels, getListData } from "@/apis/list";

const EditArticle = () => {
  const [value, setValue] = useState("4");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // 发起请求获取下拉列表数据
  const [options, setOptions] = useState([]);
  const getChannels = async () => {
    const { data } = await getAllChannels();
    setOptions(data.channels);
  };

  useEffect(() => {
    getChannels();
  }, []);

  const handleSearchArticles = async (fieldsValue) => {
    const rangeValue = fieldsValue["pubDate"];
    const values = {
      ...fieldsValue,
      date: [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
    };
    console.log(values);
    await getListData(values);
  };
  return (
    <>
      {/* 顶部内容查询栏 */}
      <Card
        title={
          // 面包屑
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: "20px" }}
      >
        {/* 表单 */}
        <Form
          onFinish={handleSearchArticles}
          initialValues={{
            channel_id: "",
          }}
        >
          <Form.Item label="状态：" name="status">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={"4"}>全部</Radio>
              <Radio value={"0"}>草稿</Radio>
              <Radio value={"1"}>待审核</Radio>
              <Radio value={"2"}>审核通过</Radio>
              <Radio value={"3"}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          {/* 频道下拉列表 */}
          <Form.Item label="频道：" name="channel_id">
            <Select style={{ width: 270 }} placeholder="请选择文章频道">
              {options.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期：" name="pubDate">
            <RangePicker format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default EditArticle;
