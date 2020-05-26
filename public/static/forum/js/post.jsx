import React, { useState, createElement } from "react";
import { Avatar, Button, Pagination, Comment, Tooltip } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const comData = [
  {
    id: 1,
    author: {
      avatar: "person-2.jpg",
      name: "Person 2",
      link: "https://minhtetkyaw.now.sh/",
    },
    body: "123456777789",
    like: [],
    top: 0,
    replyAuthor: undefined,
    createdAt: new Date(),
  },
  {
    id: 2,
    author: {
      avatar: "person-3.jpg",
      name: "Person 3",
      link: "https://minhtetkyaw.now.sh/",
    },
    body: "123456777789",
    like: [],
    top: 0,
    replyAuthor: undefined,
    createdAt: new Date(),
  },
  {
    id: 3,
    author: {
      avatar: "person-4.jpg",
      name: "Person 4",
      link: "https://minhtetkyaw.now.sh/",
    },
    body: "123456777789",
    like: [],
    top: 0,
    replyAuthor: {
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/SJMVsfeiXXnvxvEwgHjy.gif",
      name: "Person RP",
      link: "https://minhtetkyaw.now.sh/",
    },
    createdAt: new Date("2017-06-23"),
  },
];

const postdetail = (props) => {
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [reply, setReply] = useState(null);
  const [isReply, setIsReply] = useState(false);

  const onPageChange = async (page) => {
    const current = 10 * (page - 1) === 5 ? page - 1 : page;
    let offset = 10 * (current === 0 ? 0 : current - 1);
    setCurrentPage(current);
  };

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const onHandleReply = (id) => () => {
    setReply(id);
    setIsReply(!isReply);
  };

  const actions = (item) => {
    return [
      <span key='comment-basic-like'>
        <Tooltip title='Like'>
          {createElement(action === "liked" ? LikeFilled : LikeOutlined, {
            onClick: like,
          })}
        </Tooltip>
        <span className='comment-action'>{likes}</span>
      </span>,
      <span key='comment-basic-dislike'>
        <Tooltip title='Dislike'>
          {React.createElement(
            action === "disliked" ? DislikeFilled : DislikeOutlined,
            {
              onClick: dislike,
            }
          )}
        </Tooltip>
        <span className='comment-action'>{dislikes}</span>
      </span>,
      <span key='comment-basic-reply-to' onClick={onHandleReply(item.id)}>
        Reply
      </span>,
    ];
  };

  return (
    <div style={{ marginRight: 20, marginLeft: 20 }}>
      <h3 style={{ marginLeft: 20 }}>Post P</h3>
      <p style={{ marginBottom: 20 }}>
        i have a question. I have to export a CSV files of Values. Below is my
        function. My problem is that i want that the all values within should be
        splitted with semicolons instead of commas. But there is no .split
        Methode to achieve this. Because when i read the csv file into arrays i
        have the problem that they are not splitted correctly.
      </p>
      <h3 style={{ marginLeft: 20 }}>Comments</h3>
      <div style={{ marginBottom: 90 }}>
        {comData.map((x, i) => (
          <Comment
            key={i}
            actions={actions(x)}
            author={<h3>{x.author.name}</h3>}
            avatar={
              <Avatar
                src={require(`@asset/img/theme/light/${x.author.avatar}`)}
                alt='person'
              />
            }
            content={<p>{x.body}</p>}
            datetime={
              <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          >
            {reply === x.id && isReply && (
              <div>
                <ReactQuill
                  style={{ marginTop: 20 }}
                  theme='snow'
                  placeholder='Write something...'
                  value={value}
                  onChange={setValue}
                />
                <Button type='primary' style={{ marginTop: 20 }}>
                  Submit
                </Button>
              </div>
            )}
          </Comment>
        ))}
        <Pagination
          style={{ float: "right" }}
          size='large'
          onChange={onPageChange}
          current={currentPage}
          total={10}
        />
      </div>

      <ReactQuill
        style={{ marginTop: 20 }}
        theme='snow'
        placeholder='Write something...'
        value={value}
        onChange={setValue}
      />
      <Button type='primary' style={{ marginTop: 20 }}>
        Submit
      </Button>
    </div>
  );
};

export { postdetail };
