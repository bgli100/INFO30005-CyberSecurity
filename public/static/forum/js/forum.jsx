const PostItem = ({ item, index }) => (
  <a href={"/forum/post/"+item._id+"/content"} class="list-group-item list-group-item-action active" style={{ display: 'flex' }}>
    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3%', minWidth: '4%', borderRadius: 5, border: '2px solid #ccc' }}>{item.commentCount}</span>
    <div style={{ marginLeft: 10 }}>
      <h6>{item.title}</h6>
    </div>
    <div class="h6 float-right" style={{position: 'absolute', right: 200}}>
      {item.userName}
    </div>
          
    <div class="h6 float-right" style={{position: 'absolute', right: 0}}>
      <small class="float-right text-muted">{new Date(item.time).toLocaleString()}</small>
    </div>
  </a>
);

class App extends React.Component {
  state = {
    posts: [
      {
        title: "title",
        _id: 1,
      },
    ],
    hideCreate : false,
  };

  componentDidMount() {
    this.getForum();
    this.signInStatus();
  }

  toast = ({ type = "success", message = "", duration = 2000 }) => {
    let caseMap = {
      error: ({ type, message }) => (
        <div className="alert alert-danger" role="alert">
          <strong>{message}</strong>
        </div>
      ),
      success: ({ type, message }) => (
        <div className="alert alert-success" role="alert">
          <strong>{message}</strong>
        </div>
      ),
    };
    let modalToast = document.createElement('div')
    document.body.appendChild(modalToast)
    ReactDOM.render(caseMap[type]({ type, message }), modalToast);
    setTimeout(() => {
      modalToast.remove()
    }, duration);
  };

  /**
 * @description getForum
 */
  getForum = () => {
    $.ajax({
      url: "/forum/all",
      method: "GET",
    }).then((res) => {
       for (let i = 0; i < res.length; i++){
        $.ajax({
          url: "/user/" + res[i].user,
          method: "GET"
        }).then((res2) => {
          res[i].userName = res2.userName;
          this.setState({ posts: res });
        });
        $.ajax({
          url: "/forum/post/" + res[i]._id,
          method: "GET"
        }).then((res2) => {
          res[i].commentCount = res2.comment.length;
          this.setState({ posts: res });
        });
      }
    });
  };
  // hide the sign in/ sign out bar and the home link
  signInStatus = () => {
    $.ajax({
      url: "/user/checkcookie",
      mehtod: "GET",
    }).then((res) => {
      if (res && !res.error) {
        this.setState({
          cookie_id: res._id,
        });
        $("#newpost").show();
      } else {
        $("#newpost").hide();
      }
    });
  };
  render() {
    return (
      <div>
        <section class="pt-5 bg-section-secondary" style={{ minHeight: 900 }}>
          <div class="container">
            <div class="card-header">
              <h3>Forum 1</h3>
            </div>
            <div class="list-group">
              {this.state.posts.map((item, index) => (
                <React.Fragment>
                  <PostItem item={item} index={index} />
                </React.Fragment>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <a href='/forum#create' >
                <button type="button" class="btn btn-primary btn-sm" id="newpost">
                  New Post
                </button>
                {}
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));