import React from "react";
import {Table, Input, Button, Popconfirm, Form, Icon, Select, InputNumber} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/actions/warehousingAction";

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
    }

    componentWillUnmount() {
    }

    openEdit = (e) => {
        console.log('openEdit', this.input, this.state);
        console.log(this.cell, e.target);
        const editing = this.state.editing;
        if (this.cell === e.target || this.cell.contains(e.target)) {
            this.setState({editing: true}, () => {
                if (this.input) {
                    this.input.focus();
                }
            });
        }

    }

    handleSave = () => {
        const {record, editorType, handleEdit} = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.setState({editing: false});
            handleEdit({...record, ...values});
        });
    }

    handleSelectProduct = (e) => {
        console.log('handleSelectProduct', e);
        e.stopPropagation();
        e.preventDefault();
    }

    getInput = (value, record, editorType) => {
        if (editorType === 'select') {
            return (
                <Input ref={node => (this.input = node)} onPressEnter={this.handleSave}
                       onBlur={(e) => {
                           e.stopPropagation();
                           e.preventDefault();
                       }}
                       addonAfter={<Icon type="plus" onClick={this.handleSelectProduct}/>}/>
            )
        } else if (editorType === 'number') {
            return <InputNumber ref={node => (this.input = node)} onPressEnter={this.handleSave}/>;
        }
        return <Input ref={node => (this.input = node)} onPressEnter={this.handleSave}/>;
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
            handleEdit,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps} onClick={editable ? this.openEdit : null}
                onBlur={this.handleSave}>
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


class WarehousingTableRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
        this.buildColumns();
    }

    buildColumns() {
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
            title: <span><span style={{color: 'red'}}>*</span>{'商品编码'}</span>,
            dataIndex: 'productCode',
            editable: true,
            editorType: 'select'
        }, {
            title: '供应商',
            dataIndex: 'supplierName',
        }, {
            title: '规格型号',
            dataIndex: 'specification',
        }, {
            title: '仓库',
            dataIndex: 'warehouseName',
        }, {
            title: <span><span style={{color: 'red'}}>*</span>{'数量'}</span>,
            dataIndex: 'quantity',
            editable: true,
            editorType: 'number'
        }, {
            title: '备注',
            dataIndex: 'remark',
            editable: true,
        }];
    }

    handleDelete = (key) => {
        console.log('handleDelete', key);
        let {delWarehousing} = this.actions;
        delWarehousing(key);
    }

    handleAdd = () => {
        console.log('handleAdd');
        let {addWarehousing} = this.actions;
        addWarehousing();
    }

    handleEdit = (record) => {
        console.log('handleEdit', record);
        let {editWarehousing} = this.actions;
        editWarehousing(record);
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
                    handleEdit: this.handleEdit,
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
    tableList: state.WarehousingReducer.tableList,
    pagination: state.WarehousingReducer.pagination,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
});
const WarehousingTable = connect(mapStateToProps, mapDispatchToProps)(WarehousingTableRdx);
export default WarehousingTable;