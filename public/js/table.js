'use strict';

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      columns: [],
      maxData: 10,
      delay: 5,
    };

  }

  generateUsers = async () => {
    const response = await fetch('/get-connections');
    const json = await response.json();
    this.setState({ users: json });
    console.log(this.state.users)
  }

  generateColumns() {
    this.setState({
      columns: [
        { Header: "Username", accessor: "username" },
        { Header: "Role",  accessor: "role"},
        { Header: "Address", accessor: "address" },
      ]
    });
  }


  componentWillMount() {
    this.generateUsers();
  }


  async automateRefresh() {
    for (let i = 0; i < this.state.iteration; i++) {
      this.setState({ users: [] });
      this.generateUsers();
      await sleep(this.state.delay);
    }
  }


  render() {
    if (Object.entries(this.state.columns).length === 0) this.generateColumns();

    return (
      React.createElement("div",null,
        React.createElement("ReactTable",{
          columns: this.state.columns,
          data: this.state.users,
        })
      )
    );
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const e = React.createElement;

const domContainer = document.querySelector('#r-table');
ReactDOM.render(e(MyTable), domContainer);