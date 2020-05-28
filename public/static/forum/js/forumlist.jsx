class App extends React.Component {
  state = {
    forum: null
  };

  componentDidMount() {
    this.getForum()
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
    ReactDOM.render(caseMap[type]({type, message}),modalToast);
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
      if (!res || res.error) {
        this.toast({
          type: 'error',
          message: 'Invalid user ID path'
        })
        return;
      }
      console.log('this is forum', res)
      this.setState({ forum: res })
    });
  };

  render() {
    console.log('this is state forum', this.state.forum)
    return (
      <div>
        <section class="pt-5 bg-section-secondary" style={{ minHeight: 900 }}>
          <div class="container">
            <div class="card-header">
              <h3>Forum List</h3>
            </div>
            <div class="list-group">
              <a href={`/forum#one/${2}`} class="list-group-item list-group-item-action active" style={{ display: 'flex' }}>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3%', minWidth: '4%', borderRadius: 5, border: '2px solid #ccc' }}>1</span>
                <div style={{ marginLeft: 10 }}>
                  <h6>Cras justo odio</h6>
                  <span>this is content</span>
                </div>
              </a>
              <a href="/forum#one" class="list-group-item list-group-item-action" style={{ display: 'flex' }}>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3%', minWidth: '4%', borderRadius: 5, border: '2px solid #ccc' }}>2</span>
                <div style={{ marginLeft: 10 }}>
                  <h6>Dapibus ac facilisis in</h6>
                  <span>this is content of Dapibus ac facilisis</span>
                </div>
              </a>
              <a href="/forum#one" class="list-group-item list-group-item-action" style={{ display: 'flex' }}>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3%', minWidth: '4%', borderRadius: 5, border: '2px solid #ccc' }}>3</span>
                <div style={{ marginLeft: 10 }}>
                  <h6>Morbi leo risus</h6>
                  <span>this is content of Morbi leo risus</span>
                </div>
              </a>
              <a href="/forum#one" class="list-group-item list-group-item-action" style={{ display: 'flex' }}>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3%', minWidth: '4%', borderRadius: 5, border: '2px solid #ccc' }}>4</span>
                <div style={{ marginLeft: 10 }}>
                  <h6>Porta ac consectetur ac</h6>
                  <span>this is content Porta ac consectetur</span>
                </div>
              </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <a href='/forum#create' >
                <button type="button" class="btn btn-primary btn-sm">
                  Create
                  </button>
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));