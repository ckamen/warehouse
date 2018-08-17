import React from 'react';
import {Table, Icon, Divider, Button} from 'antd';
import axiosUtil from "../../utils/axiosUtil";

import './index.css';
import utils from "../../utils/utils";
import UnitForm from "../../components/UnitForm";

class Unit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            data: []
        }
    }

    componentWillMount() {
        this.setState({
            data: [{
                key: '1',
                name: '个'
            }, {
                key: '2',
                name: '件'
            }]
        });
    }

    handleAdd = () => {
        console.log('add', this);
        this.setState({
            visible: true
        })
    }

    handleDelete = (record) => {
        console.log('delete', this, record);
        let that = this;
        utils.showConfirm({
            title: '确认删除',
            content: '确认要删除计量单位吗？',
            onOk() {
                return new Promise((resolve, reject) => {
                    axiosUtil.delete(`/api/unit/delete/${record.key}`)
                        .then(response => {
                            console.log(that.state);
                            let data = that.state.data.filter(d => d.key !== record.key);
                            that.setState({
                                data: data
                            })
                            resolve();
                        })
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {
            }
        });

    }

    handleEdit = (record) => {
        console.log('edit', this, record);
    }

    render() {
        const columns = [{
            title: '操作',
            key: 'action',
            align: 'center',
            width: '100px',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" title={'编辑'} onClick={() => this.handleEdit(record)}><Icon
                        type={'edit'}/></a>
                    <Divider type="vertical"/>
                    <a href="javascript:;" title={'删除'} onClick={() => this.handleDelete(record)}><Icon
                        type={'delete'}/></a>
                </span>
            ),
        }, {
            title: '名称',
            dataIndex: 'name'
        }];

        return (
            <div className={'grid-wrapper'}>
                <h3>
                    <Button type="primary" onClick={this.handleAdd}>新增计量单位</Button>
                </h3>
                <div>
                    <div style={{width: '300px'}}>
                        <Table columns={columns} dataSource={this.state.data} pagination={false} bordered={true}/>
                    </div>
                </div>
                {/*<UnitForm visible={this.state.visible}/>*/}
            </div>
        )
    }
}

export default Unit;