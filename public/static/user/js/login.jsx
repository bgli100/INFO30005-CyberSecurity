class App extends React.Component {
  state = {
    account: "",
    password: "",
    redirect: false
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
    let modalToast = document.createElement('div')
    document.body.appendChild(modalToast)
    ReactDOM.render(caseMap[type]({type, message}),modalToast);
    setTimeout(() => {
        modalToast.remove()
    }, duration);
  };


  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      window.location.hash = 'profile';
    }
  }

  /**
   * @description signIn
   */
  signIn = () => {
    let { account, password } = this.state;
    if(!account ){
        this.toast({
            type:'error',
            message:'Please input correct account!'
        })
        return
    }

    if(!password ){
        this.toast({
            type:'error',
            message:'Please input correct password!'
        })
        return
    }

    $.ajax({
      url: "/user",
      method: "PUT",
      data: {
        account,
        password,
      },
    }).then((res) => {
      // console.log(res && !res.error);
      if (res.error) {
        this.toast({
          type: "error",
          message: "unmatched user name or password",
        });
      }
      else {
        this.setRedirect();
        $('#navbar-main-collapse>ul.d-none>li:nth-child(1)').hide();
        $('#navbar-main-collapse>ul.d-none>li:nth-child(2)').show();
        this.toast({
          type: "success",
          message: "Sign In Succeed!",
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
      console.log(res);
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
      <div id="userLogin">
        {/* toast */}
        <div className="container d-flex flex-column">
          <div className="row align-items-center justify-content-center min-vh-100">
            <div className="col-md-6 col-lg-5 col-xl-4 py-6 py-md-0">
              <div>
                <div className="mb-5 text-center">
                  <h6 className="h3 mb-1">Login</h6>
                  <p className="text-muted mb-0">
                    Sign in to your account to continue.
                  </p>
                </div>
                <span className="clearfix"></span>
                <form>
                  <div className="form-group">
                    <label className="form-control-label">Account</label>
                    <div className="input-group input-group-merge">
                      <input
                        className="form-control form-control-prepend"
                        id="input-email"
                        type="text"
                        placeholder="your account"
                        onChange={(e) => {
                          this.setState({
                            account: e.target.value,
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
                  <div className="mt-4">
                    {this.renderRedirect()}
                    <button
                      className="btn btn-block btn-primary"
                      type="button"
                      onClick={() => {
                        this.signIn();
                      }}
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <div className="py-3 text-center"></div>
                <div className="mt-4 text-center">
                  <small>Not registered?</small>
                  <a className="small font-weight-bold" href="#signup">
                    Create account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
