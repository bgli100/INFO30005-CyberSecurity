import React, { useState } from "react";
import { List, Button, Pagination, Tag } from "antd";

import { CardCom } from "@component";
import "./forum.less";

const extData = [
  {
    id: 1,
    name: "Post P",
    description: "This is testing description of Post p",
    date: "Topic P",
    count: 1,
  },
  {
    id: 2,
    name: "Post R",
    description: "This is testing description of Post R",
    date: "Topic R",
    count: 2,
  },
  {
    id: 3,
    name: "Post O",
    description: "This is testing description of Post O",
    date: "Topic O",
    count: 3,
  },
];

const Forum = (props) => {
  const { history } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = async (page) => {
    const current = 10 * (page - 1) === 5 ? page - 1 : page;
    let offset = 10 * (current === 0 ? 0 : current - 1);
    setCurrentPage(current);
  };

  return (
    <>
      <h1 style={{ marginLeft: 20 }}>Forum List</h1>

      <CardCom style={{ marginBottom: 20, marginTop: 20 }}>
        <List
          style={{ marginBottom: 20 }}
          dataSource={extData}
          renderItem={(item) => (
            <List.Item
              className='list_item'
              key={item.id}
              onClick={() =>
                history.push(`/forum-list/forum-detail/${item.id}`)
              }
            >
              <Tag style={{ marginRight: 20 }}>{item.count}</Tag>
              <List.Item.Meta
                title={<p>{item.name}</p>}
                description={item.description}
              />
              <p>{item.date}</p>
            </List.Item>
          )}
        />
        <Pagination
          style={{ float: "right" }}
          size='large'
          onChange={onPageChange}
          current={currentPage}
          total={10}
        />
      </CardCom>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type='primary'
          onClick={() => history.push(`/forum-list/post-create`)}
        >
          Create your new post
        </Button>
      </div>
    </>
  );
};

export { Forum };
