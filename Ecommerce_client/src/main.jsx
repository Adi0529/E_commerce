
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
        <App />
        <ToastContainer
                position="top-right"
                autoClose={2000}
                theme="colored"
            />

    </Provider>
)
