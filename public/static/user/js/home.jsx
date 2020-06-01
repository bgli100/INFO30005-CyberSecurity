let Profile;
let Update;
let subPageMap = {};

//module loader
window.loadJSX(
  [
    "/static/user/js/components/Profile.jsx",
    "/static/user/js/components/Update.jsx",
  ],
  ([ProfileCode, UpdateCode]) => {
    Profile = eval(ProfileCode);
    Update = eval(UpdateCode);
    subPageMap = {
      Profile: (context) => Profile({ context }),
      Update: (context) => Update({ context }),
    };
    ReactDOM.render(<App />, document.getElementById("root"));
  }
);

/**
 * @description Components
 */
const NavItem = ({ name, index, curIndex, onClick }) => (
  <li class="nav-item">
    <a
      onClick={onClick}
      class={`nav-link ${index === curIndex ? "active" : ""}`}
    >
      {name}
    </a>
  </li>
);

const HomeInfoItem = ({ item }) => (
  <div className="row align-items-center">
    <div className="col">
      <h6 className="text-sm mb-0">
        {item.name}
      </h6>
    </div>
    <div className="col-auto">
      <span className="text-sm">{item.value}</span>
    </div>
  </div>
);

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
        <div class="flex-fill ml-3">
          <div class="h6 text-sm mb-0">
            {item.userName}
            <small class="float-right text-muted">{new Date(item.createTime).toLocaleString()}</small>
          </div>
          <p class="text-sm lh-140 mb-0">{item.content}</p>
        </div>
      </div>
    </a>
  </div>
);

/**
 * Text
 * Select
 */
const Form = {
  Text: ({ label = "", value = "", placeholder = "", onChange = () => {} }) => (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label className="form-control-label">{label}</label>
          <input
            className="form-control"
            type="text"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            value={value}
          />
        </div>
      </div>
    </div>
  ),
  Select: ({
    value = -1,
    placeholder = "",
    options = [],
    onChange = () => {},
  }) => (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label className="form-control-label">Gender</label>
          <select className="custom-select" onChange={onChange}>
            <option disabled="" selected={value == -1}>
              {placeholder}
            </option>
            {options.map((item) => {
              <option value={item.value} selected={value == item.value}>
                {item.label}
              </option>;
            })}
          </select>
        </div>
      </div>
    </div>
  ),
};

var navItemList = ["Profile", "Update"];

/**
 * @description AppClass
 */
class App extends React.Component {
  state = {
    activeIndex: 0,
    profile: {
      userName: "",
      description: "",
      password: "",
      email: "",
    },
    update_val: {
      description: "",
      email: "",
    },
    description: {
      comments: 0,
      rating: 0,
    },
    commentList: [],
    postList: [],
    redirect: false,
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
    let modalToast = document.createElement("div");
    document.body.appendChild(modalToast);
    ReactDOM.render(caseMap[type]({ type, message }), modalToast);
    setTimeout(() => {
      modalToast.remove();
    }, duration);
  };
  /**
   * @description getComments
   */
  getComments = () => {
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    $.ajax({
      url: "/user/" + id + "/comments",
      method: "GET",
    }).then((res) => {
      if (!res || res.error) {
        return;
      }
      let commentList = [];
      let totalRating = 0;
      let comment = {
        time: '',
        content: '',
        rating: 0
      };
      for (comment of res) {
        commentList.push({
          createTime: comment.time,
          content: comment.content,
        });
        totalRating += comment.rating;
      }
      this.setState({
        commentList: commentList,
        description: {
          comments: commentList.length,
          rating: totalRating,
        }
      });
    });
  };
  /**
   * @description getPosts
   */
  getPosts = () => {
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    $.ajax({
      url: "/user/" + id + "/posts",
      method: "GET",
    }).then((res) => {
      if (!res || res.error) {
        return;
      }
      let postList = [];
      let post = {
        icon: "/assets/img/theme/light/person-4.jpg",
        createTime: "",
        content: "",
      };
      for (post of res) {
        postList.push({
          icon: "/assets/img/theme/light/person-4.jpg",
          createTime: post.time,
          content: post.content,
        });
      }
      this.setState({
        postList
      });
    });
  };

  /**
   * @description getProfile
   */
  getProfile = () => {
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    $.ajax({
      url: "/user/" + id,
      method: "GET",
    }).then((res) => {
      if (!res || res.error) {
        this.setRedirect();
        this.renderRedirect();
        return;
      }
      let des = res.description
        ? res.description
        : "This user has not set up any description";
      this.setState({
        profile: {
          userName: res.userName,
          description: des,
          email: res.email,
        },
      });
    });
  };

  /**
   * @description updateProfile
   */
  updateProfile = () => {
    const pathname = window.location.pathname;
    const id = pathname.split('/')[2];
    let { description, email } = this.state.update_val;
    if (!description && !email){
      this.toast({
        type:'error',
        message:'Please enter at least one entry'
      });
      return;
    }
    if (email){
      const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!emailReg.test(email)) {
        this.toast({
          type: "error",
          message: "Please input correct email!",
        });
        return;
      }
    }

    $.ajax({
      url: "/user/" + id,
      method: "PUT",
      data: {
        description,
        email
      },
    })
    .then((res) => {
      if (!res || res.error){
        console.log(res);
        this.toast({
          type:'error',
          message:'Update Error! Please re-log in and try again'
        });
      }
      else{
        this.toast({
          type:'success',
          message:'You have successfully update your profile'
        });
        window.location.reload(true);
      }
    });
  };


  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  renderRedirect = () => {
    // redirect to an error page, now go to the home page
    if (this.state.redirect) {
      window.location.pathname = "/404";
    }
  };
  setNavItemList = () => {
    const pathname = window.location.pathname;
    const id = pathname.split("/")[2];
    $.ajax({
      url: "/user/checkcookie",
      mehtod: "GET",
    }).then((res) => {
      if (!res || res.error) {
        navItemList = ["Profile"];
      } else if (res._id != id) {
        navItemList = ["Profile"];
      }
    });
  };

  componentDidMount() {
    this.setNavItemList();
    this.getProfile();
    this.getComments();
  }
  render() {
    return (
      <div>
        <section class="pt-5 bg-section-secondary" style={{ minHeight: 900 }}>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-9">
                <div class="row align-items-center">
                  <div class="col ml-n3 ml-md-n2">
                    {/* <!-- Title --> */}
                    <h2 class="mb-0">{this.state.profile.userName}</h2>
                    {/* <!-- Subtitle --> */}
                    <span class="text-muted d-block">
                      {this.state.profile.description}
                    </span>
                  </div>
                </div>
                <div class="mt-4">
                  <ul class="nav nav-tabs overflow-x">
                    {navItemList.map((item, index) => (
                      <NavItem
                        name={item}
                        curIndex={this.state.activeIndex}
                        index={index}
                        onClick={() => {
                          this.setState({ activeIndex: index });
                        }}
                      />
                    ))}
                  </ul>
                  <div style={{ padding: "20px 0" }}>
                    {subPageMap[navItemList[this.state.activeIndex]](this)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}