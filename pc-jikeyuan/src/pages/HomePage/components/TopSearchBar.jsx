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

import { useState } from "react";
import { Link } from "react-router-dom";
// import styles from "./index.module.scss";

const EditArticle = () => {
  const [value, setValue] = useState(4);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
        <Form>
          <Form.Item label="状态：">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={4}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道：">
            <Select
              defaultValue="lucy"
              style={{ width: 270 }}
              onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
          <Form.Item label="日期：">
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary">筛选</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default EditArticle;
