import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Headers from "./layout/header";
import About from "./pages/about";
import forumList from "./components/forumList";
import replyForm from "./components/replyForm";
import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
  post = [
    {
      id: 1,
      title: "Title 1",
      content: "content for Title 1",
      user: "Tom",
      time: "17/05/2020",
      lastEdit: "17/05/2020",
      readState: false,
    },
    {
      id: 2,
      title: "Title 2",
      content: "content for Title 2",
      user: "John",
      time: "15/02/2020",
      lastEdit: "17/04/2020",
      readState: false,
    },
    {
      id: 3,
      title: "Title 3",
      content: "content for Title 3",
      user: "Alice",
      time: "01/01/2019",
      lastEdit: "17/05/2019",
      readState: false,
    },
  ];
  markReaded = (id) => {
    setPost((prevItems) => {
      return prevItems.map((item) => {
        return item.id === id
          ? { ...item, completed: !item.completed }
          : { ...item };
      });
    });
  };

  deleteItem = (id) => {
    setPost((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  addItem = (text) => {
    setPost((prevItems) => {
      return [...prevItems, { title: text, readState: false, id: uuidv4() }];
    });
  };
  render() {
    return (
      <Router>
        <div className='App'>
          <Headers />
          <Route exact path='/about' component={About} />
          <Route
            exact
            path='/forum'
            render={(props) => (
              <Fragment>
                <forumList
                  post={post}
                  markReaded={markReaded}
                  deleteItem={deleteItem}
                />
              </Fragment>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
