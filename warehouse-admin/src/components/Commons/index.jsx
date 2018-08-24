import React from "react";
import {Select} from "antd";

const {Option} = Select;

class ISelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Select {...this.props} dropdownStyle={{maxHeight: 400, overflow: 'auto'}}>
            {
                this.props.data.map(d => <Option key={d.id} record={d}>{d.name}</Option>)
            }
        </Select>
    }
}

export {ISelect}