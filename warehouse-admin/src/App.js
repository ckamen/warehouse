import {Layout} from 'antd';
import React from "react";
import './App.css'
import SideNavMenu from "./components/SideNavMenu";
import ContentHeader from "./components/ContentHeader";
import ContentBody from "./components/ContentBody";


class App extends React.Component {

    state = {
        collapsed: false,
    };

    constructor(props) {
        super(props);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout className="app">
                <SideNavMenu collapsed={this.state.collapsed}/>
                <Layout>
                    <ContentHeader collapsed={this.state.collapsed} toggle={this.toggle}/>
                    <ContentBody {...this.props} />
                </Layout>
            </Layout>
        );
    }
}

export default App;