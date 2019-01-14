

import { Component } from "react"
import { connect } from "dva"
import Upload from "../../components/Upload"
import { Form, Input, Button, Modal } from "antd"
import { formClick } from "../../../utils/helper"
const FormItem = Form.Item
const { TextArea } = Input;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
    colon: false,
}

class UserModal extends Component {
    state = { visible: false, imgSrc: "" }
    handleShow = () => {
        const { user, form } = this.props
        if (user) {
            let value = {
                user: user.user,
                description: user.description,
                content: user.content
            }
            form.setFieldsValue({ ...value })
        }
        this.setState({ visible: true })
    }
    handleCancle = () => {
        this.setState({ visible: false })
        this.props.form.resetFields()
    }
    handleSubmit = async (event) => {
        const { form, dispatch } = this.props
        event.preventDefault()
        let data = await formClick(form)
        if (data) {
            dispatch({ type: "admin/updateUSER", payload: data })
            this.handleCancle()
        }
    }
    render() {
        const { visible } = this.state
        const { user, form } = this.props
        const { getFieldDecorator } = form
        return (
            <div>
                <Button type="primary" style={{ width: 300, height: 44 }} icon="edit" onClick={this.handleShow}>编辑</Button>
                <Modal visible={visible} onCancel={this.handleCancle} footer={null} closable={false}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="名称">
                            {getFieldDecorator("user", {
                                rules: [{ required: true, message: "请输入名称" }],
                            })(
                                <Input
                                    placeholder="请输入名称"
                                    ref={this.titleIpt = (titleIpt) => titleIpt && titleIpt.focus()}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="头像">
                            <div style={{ width: 100 }}>
                                {getFieldDecorator("logo")(
                                    <Upload img={user && user.logo} />
                                )}
                            </div>
                        </FormItem>
                        <FormItem {...formItemLayout} label="个人描述">
                            {getFieldDecorator("description", {
                                rules: [{ required: true, message: "请输入个人描述" }],
                            })(
                                <Input placeholder="请输入个人描述" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="个人介绍">
                            {getFieldDecorator("content", {
                                rules: [{ required: true, message: "请输入个人介绍" }],
                            })(
                                <TextArea placeholder="请输入个人介绍" style={{ resize: "none", height: 300 }} />
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
                            <Button type="primary" htmlType="submit">确定</Button>
                            <Button style={{ marginLeft: 10 }} onClick={this.handleCancle}>取消</Button>
                        </FormItem>
                    </Form>
                </Modal>


            </div >
        )
    }
}

let User = Form.create()(UserModal)
export default connect()(User)
