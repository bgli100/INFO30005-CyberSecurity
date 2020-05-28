class App extends React.Component {
    state = {
        title: '',
        content: ''
    };

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
        $("#navbar-main-collapse>ul.d-none>li:nth-child(1)").hide();
        $("#navbar-main-collapse>ul.d-none>li:nth-child(2)").show();
        $("#navbar-main-collapse>ul.mx-auto>li:nth-child(2)").show();
        $("#navbar-main-collapse>ul.mx-auto>li:nth-child(2)").show();
      } else {
        $("#navbar-main-collapse>ul.d-none>li:nth-child(1)").show();
        $("#navbar-main-collapse>ul.d-none>li:nth-child(2)").hide();
        $("#navbar-main-collapse>ul.mx-auto>li:nth-child(2)").hide();
        this.toast({
            type: 'error',
            message: 'You have not logged in!'
        });
        setTimeout(()=>{
            history.pushState("", document.title, window.location.pathname);
            window.location.href = "/user#login";
        },800);
      }
        });
    };

    handleSubmit = () => {
        console.log('this.state', this.state)
        let title = this.state.title;
        let content = this.state.content;
        $.ajax({
            url: "/forum/post",
            method: "PUT",
            data: {
                title,
                content
            },
        }).then((res) => {
            if (!res || res.error) {
                console.log(res);
                this.toast({
                    type: 'error',
                    message: 'Post Error! Please re-log in and try again'
                });
                setTimeout(()=>{
                    window.location.reload();
                },1000);
            }
            else {
                this.toast({
                    type: 'success',
                    message: 'You have successfully submit a new post'
                });
                setTimeout(()=>{
                    window.location.hash = "#all";
                },1000);
            }
        });
    }

    componentDidMount(){
        this.signInStatus();
    }
    render() {
        return (
            <div>
                <section class="pt-5 bg-section-secondary" style={{ minHeight: 900 }}>
                    <div class="container">
                        <div class="card-header">
                            <h1>New Post</h1>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">Title</label>
                            <input class="form-control" type="text" placeholder="Please enter your title" 
                            onChange={(e) => {
                                this.setState({title: e.target.value});}} />
                            <label class="form-control-label">Content</label>
                            <textarea class="form-control" placeholder="Please enter your content" rows="3"
                            onChange={(e) => {
                                this.setState({content: e.target.value});}} />
                        </div>
                        <button type="button" class="btn btn-primary btn-sm" onClick={()=>this.handleSubmit()}>
                            Submit
                        </button>
                    </div>
                </section>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));  