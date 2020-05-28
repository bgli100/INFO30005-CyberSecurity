const CommentItem = ({ item }) => (
  <div>
    <a class="list-group-item list-group-item-action">
      <div
        class="d-flex align-items-center"
        data-toggle="tooltip"
        data-placement="right"
        data-title="2 hrs ago"
        data-original-title=""
        title=""
      >
        <div>
          <img
            alt="Image placeholder"
            src={item.icon}
            class="avatar rounded-circle"
          />
        </div>
        <div class="flex-fill ml-3">
          <div class="h6 text-sm mb-0">
            {item.userName}
            <small class="float-right text-muted">{item.createTime}</small>
          </div>
          <p class="text-sm lh-140 mb-0">{item.content}</p>
        </div>
      </div>
    </a>
  </div>
);

class App extends React.Component {
  state = {
    forum_id: null,
    commentList: []
  };

  componentDidMount() {
    this.getForumById()
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
 * @description getForumById
 */
  getForumById = () => {
    const pathname = window.location.pathname;
    console.log('pathname', pathname)
    const id = pathname.split('/')[2];
    $.ajax({
      url: `/forum/post/${id}`,
      method: "GET",
    }).then((res) => {
      if (!res || res.error) {
        this.toast({
          type: 'error',
          message: 'Invalid user ID path'
        })
        return;
      }
      console.log('this is forum by id', res)
      this.setState({ forum_id: res })
    });
  };

  render() {
    console.log('state', this.state)
    return (
      <div>
        <section class="pt-5 bg-section-secondary" style={{ minHeight: 900 }}>
          <div class="container">
            <div class="card-header">
              <h3>Forum</h3>
            </div>
            <p>i have a question. I have to export a CSV files of Values. Below is my function. My problem is that i want that the all values within should be splitted with semicolons instead of commas. But there is no .split Methode to achieve this. Because when i read the csv file into arrays i have the problem that they are not splitted correctly.</p>
            <div class="card-header">
              <h6>Comments</h6>
            </div>
            {this.state.commentList.map((item, index) => (
              <React.Fragment>
                <CommentItem item={item} />
              </React.Fragment>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"))