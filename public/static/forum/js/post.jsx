class CommentItem extends React.Component {
  state = {
    rating: 0
  };

  deleteComment(item, parent) {
    return () => {
      $.ajax({
        url: "/forum/post/" + item.post + "/comment/" + this.props.item._id,
        method: "DELETE",
      }).then((res) => {
        if(res && !res.error) window.location.reload();
      });
    };
  }

  constructor(arg) {
    super();
    this.state.rating = arg.item.rating;
  }

  componentDidMount = () => {
    this.getRating();
  };

  getRating = () => {
    $.ajax({
      url: "/forum/post/" + this.props.item.post + "/comment/" + this.props.item._id + "/rating",
      method: "GET"
    }).then((res) => {
      this.setState({rating: res.total});
    });
  };

  render() {
    return (
      <div>
      <a class="list-group-item list-group-item-action" style={{minHeight: 100}}>
        <div
          class="d-flex align-items-center"
          data-toggle="tooltip"
          data-placement="right"
          data-title="2 hrs ago"
          data-original-title=""
          title=""
        >
          <div class="flex-fill ml-3">
            <div class="h6 text-sm mb-0">
              <a href = {"/user/"+this.props.item.user+"/profile"} id = "userName">
                {this.props.item.userName}
              </a>
              <small class="float-right text-muted">{new Date(this.props.item.time).toLocaleString()}</small>
                <br/>
                <button class="btn btn-primary btn-sm" style={{position: 'absolute', right: this.props.isAdmin ? 110 : 10}} onClick={() => this.likeComment(this.props.item._id)}> like</button>
                { this.props.isAdmin ?
                  <button type="button" class="btn btn-primary btn-sm" style={{position: 'absolute', right: 10}} onClick={this.deleteComment(this.props.item, this.props.parent)}>
                    Delete
                  </button>
                  : ''
                }
                <p class="text-sm lh-140 mb-0" style={{position: 'absolute', right: this.props.isAdmin ? 210 : 110}}>rating: {this.state.rating}</p>
              
            </div>
            <p class="text-sm lh-140 mb-0">{this.props.item.content}</p>
          </div>
        </div>
      </a>
    </div>
    );
  }
  
  likeComment = (cid) => {
    const pathname = window.location.pathname;
    const pid = pathname.split('/')[3];
    $.ajax({
      url: "/forum/post/" + pid + "/comment/" + cid + "/rating",
      method: "PUT",
      data : {
        rating: 1
      }
    }).then((res) => {
      if (res && !res.error && res.updated) {
        this.setState({rating: this.state.rating + 1});
      }
    });
  }
} 

class App extends React.Component {
  state = {
    post: {
      title: "",
      content: "",
      _id: 1,
      comment: []
    },
    userClass: ''
  };

  componentDidMount() {
    this.getPostById();
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


  submitComment = () => {
    const pathname = window.location.pathname;
    const id = pathname.split('/')[3];
    const content = this.state.comment_enter;

    if (!content){
      this.toast({
        type: 'error',
        message: 'Please enter something!'
      });
      return;
    }
    $.ajax({
      url: "/forum/post/" + id + "/comment",
      method: "PUT",
      data : {
        content : content
      }
    }).then((res) => {
      if (!res || res.error) {
        this.toast({
          type: 'error',
          message: 'error occurs when posting comment'
        });
        return;
      }
      this.toast({
        type: 'success',
        message: 'You have successfully entered a comment!'
      });
      window.location.reload();
    });
  };
  /**
 * @description getPostById
 */
  getPostById = () => {
    const pathname = window.location.pathname;

    const id = pathname.split('/')[3];

    $.ajax({
      url: "/forum/post/" + id,
      method: "GET",
    }).then((res) => {
      if (!res || res.error) {
        this.toast({
          type: 'error',
          message: 'Invalid post ID path'
        });
        setTimeout(() => {
          this.window.href = '/404';
        }, 800);
        return;
      }
      $.ajax({
        url: "/user/" + res.user,
        method: "GET"
      }).then((res3)=>{
        res.userName = res3.userName;
      })
      if(res.comment.length == 0) {
        this.setState({ post: res });
      }
      for (let i = 0; i < res.comment.length; i++){
        $.ajax({
          url: "/user/" + res.comment[i].user,
          method: "GET"
        }).then((res2) => {
          res.comment[i].userName = res2.userName;
          this.setState({ post: res });
        });
      }
    });
  };

  signInStatus = () => {
    $.ajax({
      url: "/user/checkcookie",
      mehtod: "GET",
    }).then((res) => {
      if (res && !res.error) {
        this.setState({
          cookie_id: res._id,
          userClass: res.class
        });
        $("#comment").show();
      } else {
        $("#comment").hide();
      }
    });
  };

  render() {
    return (
      <div>
        <section class="pt-5 bg-section-secondary">
          <div class="container">
            <div class="card-header">
              <h3>{this.state.post.title}</h3>
              <a href={"/user/"+this.state.post.user+"/profile"}>{"By " + this.state.post.userName}</a>
              <p>{this.state.post.content}</p>
            </div>
            
            <div class="card-header">
              <h6>Comments</h6>
            </div>
            {this.state.post.comment.map((item, index) => (
              <React.Fragment>
                <CommentItem parent={this} item={item} isAdmin={this.state.userClass ? (this.state.userClass == 'admin') : false} />
              </React.Fragment>
            ))}
          </div>
        </section>
        <section class="pt-5 bg-section-secondary form-group" style={{ display: 'none'}} id="comment">
          <div class="container">
            <div class="card-header">
              <label class="form-control-label">Your Comment</label>
              <textarea class="form-control" placeholder="Please enter your comment" rows="3"
                onChange={(e) => {
                  this.setState({ comment_enter: e.target.value });
                }} />
            </div>
            <div class="card-header">
              <button type="button" class="btn btn-primary btn-sm" onClick={() => this.submitComment()}>
                Submit
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"))