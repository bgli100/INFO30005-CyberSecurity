class App extends React.Component {
  state = {
    userName: "",
    password: "",
    email: "",
    redirect : false
  };
  toast = ({ type = "success", message = "", duration = 1000 }) => {
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
    let modalToast = document.createElement("div");
    document.body.appendChild(modalToast);
    ReactDOM.render(caseMap[type]({ type, message }), modalToast);
    setTimeout(() => {
      modalToast.remove();
    }, duration);
  };

  
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      $.ajax({
        url: "/user/checkcookie",
        mehtod: "GET"
      }).then((res) => {
        history.pushState("", document.title, window.location.pathname);
        window.location.pathname = "/user/" + res._id + "/profile";
      });
    }
  }

  /**
   * @description signIn
   */
  signUp = () => {
    let { userName, password, email } = this.state;
    if (!userName) {
      this.toast({
        type: "error",
        message: "Please input correct username!",
      });
      return;
    }

    if (!password) {
      this.toast({
        type: "error",
        message: "Please input correct password!",
      });
      return;
    }
    
    const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!email || !emailReg.test(email)) {
      this.toast({
        type: "error",
        message: "Please input correct email!",
      });
      return;
    }

    $.ajax({
      url: "/user/signup",
      method: "PUT",
      data: {
        userName,
        password,
        email
      },
    }).then((res) => {
      if (res.error) {
        this.toast({
          type: "error",
          message: "used user name",
        });
      }
      else if(res) {
        this.setRedirect();
        this.toast({
          type: "success",
          message: "Sign Up Succeed!",
        });
      }
    });
  };

  // hide the sign in/ sign out bar or the home
  signInStatus() {
    $.ajax({
      url: "/user/checkcookie",
      mehtod: "GET"
    }).then((res) => {
      if (res && !res.error){
        $('#navbar-main-collapse>ul.d-none>li:nth-child(1)').hide();
        $('#navbar-main-collapse>ul.d-none>li:nth-child(2)').show();
        $('#navbar-main-collapse>ul.mx-auto>li:nth-child(2)').show();
      }
      else{
        $('#navbar-main-collapse>ul.d-none>li:nth-child(1)').show();
        $('#navbar-main-collapse>ul.d-none>li:nth-child(2)').hide();
        $('#navbar-main-collapse>ul.mx-auto>li:nth-child(2)').hide();
      }
    })
  }
  componentDidMount(){
    this.signInStatus();
  }
  render() {
    return (
      <div>
        {/* toast */}

        <div className="container d-flex flex-column">
          <div className="row align-items-center justify-content-center min-vh-100">
            <div className="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0">
              <div>
                <div className="mb-5 text-center">
                  <h6 className="h3 mb-1">SignUp</h6>
                  <p className="text-muted mb-0">
                    Sign up to your account to continue.
                  </p>
                </div>
                <span className="clearfix"></span>
                <form>
                  <div className="form-group">
                    <label className="form-control-label">Username</label>
                    <div className="input-group input-group-merge">
                      <input
                        className="form-control form-control-prepend"
                        id="input-email"
                        type="text"
                        placeholder="your username"
                        onChange={(e) => {
                          this.setState({
                            userName: e.target.value,
                          });
                        }}
                      />
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i data-feather="user"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-0">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <label className="form-control-label">Password</label>
                      </div>
                    </div>
                    <div className="input-group input-group-merge">
                      <input
                        className="form-control form-control-prepend"
                        id="input-password"
                        type="password"
                        placeholder="your password"
                        onChange={(e) => {
                          this.setState({
                            password: e.target.value,
                          });
                        }}
                      />
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i data-feather="key"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">Email address</label>
                    <div className="input-group input-group-merge">
                      <input
                        className="form-control form-control-prepend"
                        id="input-email"
                        type="email"
                        placeholder="your email"
                        onChange={(e) => {
                          this.setState({
                            email: e.target.value,
                          });
                        }}
                      />
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i data-feather="user"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    {this.renderRedirect()}
                    <button
                      className="btn btn-block btn-primary"
                      type="button"
                      onClick={() => this.signUp()}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
                <div className="py-3 text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));