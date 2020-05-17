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
        <i className="fab fa-facebook mr-2"></i>
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

const navItemList = ["Home", "Profile"];
const subPageMap = {
  Home: (context) => (
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
        <h6>Comments</h6>
      </div>
      {context.state.commentList.map((item, index) => (
        <React.Fragment>
          <CommentItem item={item} />
        </React.Fragment>
      ))}
    </div>
  ),
  Profile: (context) => (
    <div>
      {Object.keys(context.state.profile).map((item, index) => {
        return (
          <Form.Text
            label={item}
            placeholder={`Please input ${item}`}
            value={context.state.profile[item]}
            onChange={(value) => {
              context.setState({
                profile: {
                  ...context.state.profile,
                  [item]: value,
                },
              });
            }}
          />
        );
      })}
      <button
        type="button"
        class="btn btn-sm btn-primary"
        onClick={() => context.updateProfile()}
      >
        Update
      </button>
    </div>
  ),
};



/**
 * @description AppClass 
 */
class App extends React.Component {
  state = {
    activeIndex: 0,
    userName:"Jack",
    profile: {
      description: "",
      password: "",
      email: "",
    },
    description: {
      followers: 100,
      following: 20,
      rating: 39,
    },
    commentList: [
      {
        icon: "assets/img/theme/light/person-4.jpg",
        userName: "Alex Michael",
        createTime: "2020-01-10",
        content: "Some quick example text to build on the card title.",
      },
    ],
  };
  /**
   * @description getComments
   */
  getComments = (id) => {
    $.ajax({
      url: "/user?id=" + id,
      method: "GET",
      data: { id },
    }).then((res) => {
      //TODO
      // this.setState({
      // commentList:res.data
      // })
    });
  };
  /**
   * @description getProfile
   */
  getProfile = (id) => {
    $.ajax({
      url: "/user",
      method: "GET",
      data: { id },
    }).then((res) => {
      //TODO
      // this.setState({
      // profile:res.data,
      // description:rÎes.data
      // })
    });
  };
  /**
   * @description updateProfile
   */
  updateProfile = (id) => {
    let {
      userName = "",
      password = "",
      email = "",
      icon = "",
    } = this.state.profile;
    $.ajax({
      url: "/user?id=" + id,
      method: "POST",
      data: {
        userName,
        password,
        email,
        class: this.state.profile.class,
        icon,
      },
    }).then((res) => {
      //TODO
    });
  };
  componentDidMount() {
    // this.getProfile()
    // this.getComments()
  }
  render() {
    return (
      <div>
        <section class="pt-5 bg-section-secondary" style={{ minHeight: 900 }}>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-9">
                <div class="row align-items-center">
                  <div class="col-auto">
                    {/* <!-- Avatar --> */}
                    <img
                      alt="Image placeholder"
                      src="../../assets/img/theme/light/person-auth.jpg"
                      class="avatar avatar-xl rounded-circle"
                    />
                  </div>
                  <div class="col ml-n3 ml-md-n2">
                    {/* <!-- Title --> */}
                    <h2 class="mb-0">{this.state.userName}</h2>
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
                          // this.getProfile()
                        }}
                      />
                    ))}
                  </ul>
                  <div style={{ padding: "20px 0" }}>
                    {/* //sdd */}
                    {subPageMap[navItemList[this.state.activeIndex]](this)}
                    {/* //RTCSrtpSdesTransport */}
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

ReactDOM.render(<App />, document.getElementById("root"));
