import React, { PureComponent } from "react";
import WebWorker from "./WorkerSetup";
import worker from "./worker";

class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { worker: null, loading: false, percent: 0 };
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
        this.setState({ percent: event.data.percentValue });
      } else {
        downloadTxtFile(event.data);

        this.setState({
          loading: false,
          percent: 100
        });
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

  render() {
    const { loading, percent } = this.state;
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
      </div>
    );
  }
}

export default Main;
