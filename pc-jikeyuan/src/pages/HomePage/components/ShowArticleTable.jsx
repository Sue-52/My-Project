import { Card, Table, Space, Button, Tag } from "antd";
const { Column } = Table;

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const dataSource = [
  {
    key: "1",
    title: "wkwebview离线化加载h5资源解决方案",
    status: 2,
    pubdate: "2019-03-11 09:00:00",
    read_count: 0,
    comment_count: 0,
    like_count: 0,
  },
];

// 标签状态
const statusLabel = [
  { text: "草稿", color: "default" },
  { text: "待审核", color: "blue" },
  { text: "审核通过", color: "green" },
  { text: "审核拒绝", color: "red" },
];

const columns = [
  {
    title: "封面",
    dataIndex: "cover",
    key: "cover",
    render: () => (
      <img src="http://toutiao.itheima.net/resources/images/37.jpg" />
    ),
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const info = statusLabel[status];
      return <Tag color={info.color}>{info.text}</Tag>;
    },
  },
  {
    title: "发布时间",
    dataIndex: "pubdate",
    key: "pubdate",
  },
  {
    title: "阅读数",
    dataIndex: "read_count",
    key: "read_count",
  },
  {
    title: "评论数",
    dataIndex: "comment_count",
    key: "comment_count",
  },
  {
    title: "点赞数",
    dataIndex: "like_count",
    key: "like_count",
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    render: () => (
      <Space>
        <Button type="primary" shape="circle">
          <EditOutlined />
        </Button>
        <Button type="primary" danger shape="circle">
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];

function ShowArticleTable() {
  return (
    <>
      <Card title="根据筛选条件供查询到 xxx 条结果：" style={{ width: "100%" }}>
        <Table dataSource={dataSource} columns={columns} />;
      </Card>
    </>
  );
}

export default ShowArticleTable;
