import React, {Component} from 'react';

class Demo extends Component {

    constructor() {
        super();

        this.state= {
            username:'',
            password:''
        }
        this.onChange = this.onChange.bind(this);
    };

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value});
        console.log(this.state.username);

    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
        console.log(this.state.password);
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Cyberium</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Forum</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="divider-10"></div>
                <div className="divider-10"></div>
                <div className="divider-10">
                    <h1 align="center">Cyberium</h1>
                    <h5 align="center">Log in</h5>
                </div>
                <div className="divider-10">
                <div className="row justify-content-md-center">
                <div className="col-4">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input type="email"
                                   value={this.state.username}
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   placeholder="email"
                                   onChange={this.handleUsernameChange}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                    anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password"
                                   value={this.state.password}
                                   className="form-control"
                                   id="exampleInputPassword1"
                                   placeholder="Password"
                                   onChange={this.handlePasswordChange}/>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Agree with terms & conditions</label>
                        </div>
                        <button type="submit"
                                className="btn btn-primary"
                                onClick={this.handleSubmit}>
                            Submit</button>
                    </form>
                </div>
                </div>
                </div>
            </div>

        );
    }
}

export default Demo;