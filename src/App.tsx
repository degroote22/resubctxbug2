import * as React from "react";
import { ComponentBase } from "resub";
import * as PropTypes from "prop-types";

class NotWorking extends ComponentBase<{}, {}> {
  render() {
    return <div>{this.props.children}</div>;
  }
}

class Working extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

class RenderFromContext extends React.Component {
  static contextTypes = { text: PropTypes.string };
  render() {
    return this.context.text;
  }
}

class MakeContext extends React.Component<
  {},
  { text: string }
> {
  state = {
    text: "",
  };
  static childContextTypes = { text: PropTypes.string };

  getChildContext() {
    return { text: this.state.text };
  }

  componentDidMount() {
    this.setState({ text: "Works" });
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

class App extends React.Component {
  render() {
    return (
      <MakeContext>
        Working:
        <Working>
          <RenderFromContext />
        </Working>
        Not working:
        <NotWorking>
          <RenderFromContext />
        </NotWorking>
      </MakeContext>
    );
  }
}

export default App;
