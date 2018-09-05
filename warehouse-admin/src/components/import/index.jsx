import React from "react";
import {Button, Icon, Modal, Upload, message, Timeline} from "antd";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {updateImportModal} from "../../redux/Import/importAction";

class ImportModalRdx extends React.Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;
    }

    handleOk = () => {
        let {updateImportModal} = this.actions;
        updateImportModal({
            visible: false
        });
    }

    handleCancel = () => {
        let {updateImportModal} = this.actions;
        updateImportModal({
            visible: false
        });
    }

    render() {
        let {title, visible, confirmLoading} = this.props.modal;

        const uploadProps = {
            name: 'file',
            action: '/api/product/upload',
            headers: {
                'x-access-token': sessionStorage.getItem('token'),
            },
            accept: '.xls, .xlsx',
            beforeUpload: file => {
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                    message.error('上传文件大小不能超过5M');
                }
                return isLt5M;
            },
            onChange(info) {
                if (info.file.status === 'done') {
                    // message.success(`${info.file.name} file uploaded successfully`);
                    let messages = info.file.response.data;
                    Modal.info({
                        title: '导入详细信息',
                        content: <div style={{whiteSpace: 'pre-line'}}>{messages.join('\n')}</div>
                    })
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <div>
                <Modal
                    width={400}
                    maskClosable={false}
                    title={title}
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Timeline>
                        <Timeline.Item>
                            <a href={`${process.env.REACT_APP_SERVER_HOST}/static/商品导入模板.xlsx`} target={'blank'}>点击下载模板</a>
                        </Timeline.Item>
                        <Timeline.Item>
                            <Upload {...uploadProps}>
                                <Button>
                                    <Icon type="download"/> 点击上传Excel文件
                                </Button>
                            </Upload>
                        </Timeline.Item>
                    </Timeline>


                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    modal: state.ImportReducer.modal
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({updateImportModal}, dispatch)
});
const ImportModal = connect(mapStateToProps, mapDispatchToProps)(ImportModalRdx);
export default ImportModal;
