import React from "react";
import {Table, Input,  Popconfirm, Form, Icon, InputNumber} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../redux/Warehousing/warehousingAction";
import ProductSelectableTable from "../../components/ProductSelectableTable";
import {updateProductSelectModal} from "../../redux/Product/productAction";
import {OUT} from "../../utils/constants";

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
        if(this.form) {
            this.form.validateFields((error, values) => {
                if (error) {
                    return;
                }
                this.setState({editing: false});
                handleEdit({...record, ...values});
            });
        }
    }

    handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let {record, handleSelectProduct} = this.props;
        handleSelectProduct(record);
        this.setState({editing: false});
    }

    getInput = (value, record, editorType, whAction) => {
        if (editorType === 'productSelect') {
            return (
                <Input ref={node => (this.input = node)} onPressEnter={this.handleSave} disabled={true}
                       onBlur={(e) => {
                           e.stopPropagation();
                           e.preventDefault();
                       }}
                       addonAfter={<Icon type="plus" onClick={this.handleClick}/>}/>
            )
        } else if (editorType === 'number') {
            return <InputNumber ref={node => (this.input = node)} min={1} onPressEnter={this.handleSave}
                                max={whAction === OUT ? record.maxQuantity : Infinity}/>;
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
            whAction,
            index,
            handleEdit,
            handleSelectProduct,
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
                                            this.getInput(record[dataIndex], record, editorType, whAction)
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
        this.whAction = this.props.whAction;
        this.state = {
            productTable: null
        }
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
            editorType: 'productSelect'
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
            title: '单位',
            dataIndex: 'unitName',
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
        let {delWarehousing} = this.actions;
        delWarehousing(key);
    }

    handleAdd = () => {
        let {addWarehousing} = this.actions;
        addWarehousing();
    }

    handleEdit = (record) => {
        let {editWarehousing} = this.actions;
        editWarehousing(record);
    }

    handleSelectProduct = (record) => {
        this.setState({
            productTable: <ProductSelectableTable/>
        })

        let {updateProductSelectModal, updateWarehousingEditKey: updateWarehousingEditKey} = this.actions;
        updateProductSelectModal({
            visible: true
        });
        updateWarehousingEditKey(record.key);
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
                    whAction: this.whAction,
                    handleEdit: this.handleEdit,
                    handleSelectProduct: this.handleSelectProduct
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
                <div>
                    {this.state.productTable}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    tableList: state.WarehousingReducer.tableList,
    pagination: state.WarehousingReducer.pagination,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({...actions, updateProductSelectModal}, dispatch)
});
const WarehousingTable = connect(mapStateToProps, mapDispatchToProps)(WarehousingTableRdx);
export default WarehousingTable;