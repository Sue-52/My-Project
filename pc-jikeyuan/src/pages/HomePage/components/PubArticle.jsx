import React from "react";
import { Card, Breadcrumb } from "antd";

import { Link } from "react-router-dom";

function PubArticle() {
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
      ></Card>
    </div>
  );
}

export default PubArticle;
