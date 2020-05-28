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

    textChange = value => e => {
        this.setState({
            [value]: e.target.value
        })
    }

    handleSubmit = () => () => {
        console.log('this.state', this.state)
        let { title, content } = this.state
        $.ajax({
            url: "`/forum/post",
            method: "PUT",
            data: {
                title,
                content
            },
        })
            .then((res) => {
                if (!res || res.error) {
                    console.log(res);
                    this.toast({
                        type: 'error',
                        message: 'Update Error! Please re-log in and try again'
                    });
                }
                else {
                    this.toast({
                        type: 'success',
                        message: 'You have successfully update your profile'
                    });
                    window.location.reload(true);
                }
            });
    }

    render() {
        let { title, content } = this.state
        return (
            <div>
                <section class="pt-5 bg-section-secondary" style={{ minHeight: 900 }}>
                    <div class="container">
                        <div class="card-header">
                            <h1>Forum Create</h1>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label">Title</label>
                            <input class="form-control" type="text" placeholder="Please enter your title" value={title} onChange={this.textChange('title')} />
                            <label class="form-control-label">Content</label>
                            <textarea class="form-control" placeholder="Please enter your content" rows="3" value={content} onChange={this.textChange('content')} />
                        </div>
                        <button type="button" class="btn btn-primary btn-sm" onClick={this.handleSubmit()}>
                            Submit
                        </button>
                    </div>
                </section>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));  