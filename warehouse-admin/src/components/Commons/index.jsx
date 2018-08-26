import React from "react";
import {Button, Form, Input, Select} from "antd";

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

class ISearch extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearch = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.props.handleSearch(values);
        });
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        let placeholder = this.props.placeholder || '请输入编码或者名称';
        return (
            <Form layout={'inline'}>
                <Form.Item label="">
                    {getFieldDecorator('queryValue', {
                        rules: [{max: 30, message: '输入不能超过30个字符'}],
                    })(
                        <Input placeholder={placeholder} onPressEnter={this.handleSearch} />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type={'search'} onClick={this.handleSearch}>查询</Button>
                </Form.Item>
            </Form>
        )
    }
}

const ISearchForm = Form.create()(ISearch);

export {ISelect, ISearchForm}