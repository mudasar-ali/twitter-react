import "./App.css";
import Router from "./Router";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "./app/store";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router />
      </Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
