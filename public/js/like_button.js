'use strict';

const e = React.createElement;

class RTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false }; // change this state with json to alter table content
  }

  render() {
    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#r-table');
ReactDOM.render(e(RTable), domContainer);

function App() {
  return (
    <div className="App">
      <MyTable />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);