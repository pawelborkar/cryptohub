import { Layout } from "antd";
import React from "react";
import { Switch, Route } from "react-router-dom";
import {
    Navbar,
    Homepage,
    Cryptocurrencies,
    CryptoDetails,
    News,
} from "./components";
import "./App.css";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Switch>
                            <Route exact path="/" component={Homepage} />
                            <Route
                                path="/cryptocurrencies"
                                component={Cryptocurrencies}
                            />
                            <Route
                                exact
                                path="/crypto/:coinId"
                                component={CryptoDetails}
                            />
                            <Route path="/news" component={News} />
                        </Switch>
                    </div>
                </Layout>
            </div>
        </div>
    );
};

export default App;
