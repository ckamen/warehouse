import React from "react";
import {Table, Input, Button, Popconfirm, Form, Icon, Select} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/Contact/contactAction";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({editing}, () => {
            if (editing && this.input) {
                this.input.focus();
            }
        });
    }

    handleClickOutside = (e) => {
        const {editing} = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    save = (value) => {
        const {record, handleSave, editorType} = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            if (editorType === 'select') {
                values = {...values, primaryInd: value}
            } else {
                this.toggleEdit();
            }
            handleSave({...record, ...values});
        });
    }
    getInput = (value, record, editorType) => {
        if (editorType === 'select') {
            return (
                <Select style={{width: 80}} onSelect={this.save}>
                    <Select.Option value="1">是</Select.Option>
                    <Select.Option value="0">否</Select.Option>
                </Select>
            )
        }
        return <Input ref={node => (this.input = node)} onPressEnter={this.save}/>;
    };

    render() {
        const {editing} = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            editorType,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps} onClick={this.toggleEdit}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{margin: 0}}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: false,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            this.getInput(record[dataIndex], record, editorType)
                                        )}
                                    </FormItem>
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{paddingRight: 5}}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}



class ContactTableRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.buildColumns();
    }

    buildColumns () {
        this.columns = [{
            title: '操作',
            key: 'action',
            align: 'center',
            width: '80px',
            render: (value, record) => {
                return (
                    <span>
                        <a href="javascript:void(0);" title={'添加'} onClick={() => this.handleAdd()}
                           style={{marginRight: 10}}> <Icon type="plus-circle-o"/></a>

                        {
                            this.props.tableList.length > 1
                                ? (
                                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
                                        <a href="javascript:void(0);" title={'删除'}><Icon type={'delete'}/></a>
                                    </Popconfirm>
                                ) : null
                        }
                    </span>

                );
            },
        }, {
            title: '联系人',
            dataIndex: 'name',
            editable: true,
        }, {
            title: '手机',
            dataIndex: 'phone',
            editable: true,
        }, {
            title: '座机',
            dataIndex: 'tel',
            editable: true,
        }, {
            title: 'QQ/微信/Email',
            dataIndex: 'snsContact',
            editable: true,
        }, {
            title: '联系地址',
            dataIndex: 'address',
            editable: true,
        }, {
            title: '首要联系人',
            dataIndex: 'primaryInd',
            editable: true,
            render: (value) => (value != null ? (value > 0 ? '是' : '否') : ''),
            editorType: 'select'
        }];
    }
    handleDelete = (key) => {
        console.log('handleDelete', key);
        let {delContact} = this.actions;
        delContact(key);
        // const dataSource = [...this.state.dataSource];
        // this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    }

    handleAdd = () => {
        console.log('handleAdd');
        let {addContact} = this.actions;
        addContact();
    }

    handleSave = (record) => {
        console.log('handleSave', record);
        let {saveContact} = this.actions;
        saveContact(record);
    }

    render() {
        const {tableList} = this.props;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editorType: col.editorType,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    pagination={false}
                    dataSource={tableList}
                    columns={columns}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tableList: state.ContactReducer.tableList,
    pagination: state.ContactReducer.pagination,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
});
const ContactTable = connect(mapStateToProps, mapDispatchToProps)(ContactTableRdx);
export default ContactTable;