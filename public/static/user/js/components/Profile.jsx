({ context }) => {
  return (
    <div className="container">
      <div class="card-header">
        <h6>About Me</h6>
      </div>
      <div className="card card-fluid">
        <div className="card-body">
          {Object.keys(context.state.description).map((item, index) => (
            <React.Fragment>
              <HomeInfoItem
                item={{ name: item, value: context.state.description[item] }}
              />
              {index == Object.keys(context.state.description).length - 1 ? (
                ""
              ) : (
                <hr className="my-3" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div class="card-header">
        <h6>Activity</h6>
      </div>
      {context.state.commentList.map((item, index) => (
        <React.Fragment>
          <CommentItem item={item} />
        </React.Fragment>
      ))}
      {context.state.postList.map((item, index) => (
        <React.Fragment>
          <CommentItem item={item} />
        </React.Fragment>
      ))}
    </div>
  );
};
