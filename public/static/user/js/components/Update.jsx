({ context }) => {
  return (
    <div>
      {Object.keys(context.state.update_val).map((item, index) => {
        return (
          <Form.Text
            label={item}
            placeholder={`Please input ${item}`}
            value={context.state.update_val[item]}
            onChange={(value) => {
              context.setState({
                update_val: Object.assign({}, context.state.update_val, {
                  [item]: value,
                }),
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
  );
};