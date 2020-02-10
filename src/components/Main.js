import React, { PureComponent } from "react";
import WebWorker from "../workers/WorkerSetup";
import worker from "../workers/worker";
import UsersList from "./UserList";

class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      worker: null,
      loading: false,
      percent: 0,
      users: []
    };
  }

  componentDidMount() {
    this.worker = new WebWorker(worker);
  }

  componentWillUnmount() {
    if (this.worker) {
      this.worker.terminate();
    }
  }

  fetchWebWorker = () => {
    //Trigger the worker
    this.worker.postMessage("Star file contents generation");

    this.setState({ loading: true, percent: 0 });

    //Setup the listener
    this.worker.addEventListener("message", event => {
      //Message received from the Worker

      if (
        event.data instanceof Object &&
        event.data.hasOwnProperty("percentValue")
      ) {
        return this.setState({ percent: event.data.percentValue });
      }
      if (
        event.data instanceof Object &&
        event.data.hasOwnProperty("userData")
      ) {
        console.log("users received");
        return this.setState({ users: event.data.userData });
      } else {
        return this.setState(
          {
            loading: false,
            percent: 100
          },
          () => downloadTxtFile(event.data)
        );
      }
    });

    const downloadTxtFile = text => {
      const element = document.createElement("a");
      const file = new Blob([text], { type: "text/csv" });
      element.href = URL.createObjectURL(file);
      element.download = "report.csv";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      document.body.removeChild(element);
    };
  };

  toggleRowSelection = index => {
    let newUsers = [...this.state.users];
    newUsers[index].selected = newUsers[index].selected ? false : true;
    this.setState({ users: newUsers });
  };

  render() {
    const { loading, percent, users } = this.state;
    return (
      <div>
        <div>
          <button
            className="btn-worker"
            onClick={this.fetchWebWorker}
            disabled={loading}
          >
            Download CSV
          </button>
        </div>
        {loading && <span>Generating data... {percent} %</span>}
        <div style={{ padding: 16 }}>
          <UsersList
            users={users}
            listHeight={250}
            handleRowClick={this.toggleRowSelection}
          />
        </div>
      </div>
    );
  }
}

export default Main;
