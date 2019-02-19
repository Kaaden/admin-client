
import { Component } from "react"
import { connect } from "dva"
import Upload from "../../components/Upload"
import { Form, Input, Button, Modal } from "antd"
import { formClick } from "../../../utils/helper"
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
    colon: false,
}

class Modals extends Component {
    state = { imgSrc: "" }

    handleSubmit = async (event) => {
        const { form, dispatch, target, handleCancle, value } = this.props
        event.preventDefault()
        let data = await formClick(form)
        if (data) {
            data.id = value.id
            data.target = target
            dispatch({ type: "admin/updateConfig", payload: data })
            handleCancle()
        }
    }
    render() {
        const { visible, form, handleCancle, target, value } = this.props
        const { getFieldDecorator } = form
        return (
            <div>
                <Modal visible={visible} footer={null} closable={false} destroyOnClose={true}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="标题">
                            {getFieldDecorator("title", {
                                rules: [{ required: true, message: "请输入标题" }],
                                initialValue: value.title
                            })(
                                <Input
                                    placeholder="请输入标题"
                                    ref={this.titleIpt = (titleIpt) => titleIpt && titleIpt.focus()}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="二级标题">
                            {getFieldDecorator("titleLevel", {
                                rules: [{ required: true, message: "请输入二级标题" }],
                                initialValue: value.titleLevel
                            })(
                                <Input
                                    placeholder="请输入二级标题"
                                />
                            )}
                        </FormItem>
                        {visible && target !== "home" && <FormItem {...formItemLayout} label="背景">
                            <div style={{ width: 100 }}>
                                {getFieldDecorator("img")(
                                    <Upload img={value.img} visible={visible} />
                                )}
                            </div>
                        </FormItem>}

                        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
                            <Button type="primary" htmlType="submit">确定</Button>
                            <Button style={{ marginLeft: 10 }} onClick={handleCancle}>取消</Button>
                        </FormItem>
                    </Form>
                </Modal>


            </div >
        )
    }
}

let User = Form.create()(Modals)
export default connect()(User)
