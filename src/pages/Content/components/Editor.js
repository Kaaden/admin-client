import "braft-editor/dist/index.css"
import { Component } from "react"
import BraftEditor from "braft-editor"
import { Form, Input, Modal, Icon, Button, Select } from "antd"
import Upload from "../../components/Upload"
const Option = Select.Option;
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
    colon: false,
}
const controls = ["bold", "italic", "underline", "text-color", "separator", "link", "separator", "font-family", "font-size", "line-height", "media"]

class Editor extends Component {

    state = { visible: false, selItem: "", editorState: BraftEditor.createEditorState(null) }
    handleCancle = () => {
        this.setState({ visible: false, selItem: "" })
    }
    handleShow = (item) => {
        this.setState({ visible: true, selItem: item })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields((error, values) => {
            if (!error) {
                console.log(values)
            }
        })
    }

    render() {
        const { visible, selItem, editorState } = this.state
        const { Tags, form, ct, type } = this.props
        const { getFieldDecorator } = form
        return (
            <div>
                {!type && <Button type="primary" onClick={() => this.handleShow("")} style={{ margin: 10 }}>添加文章</Button>}
                {type && <a onClick={() => this.handleShow(ct)}><Icon type="edit" />编辑</a>}
                <Modal footer={null} title="文章" visible={visible} onCancel={this.handleCancle} width="800px">
                    <Form onSubmit={this.handleSubmit} >
                        <FormItem {...formItemLayout} label="文章标题">
                            {getFieldDecorator("title", {
                                rules: [{ required: true, message: "请输入标题" }],
                                initialValue: selItem.title
                            })(
                                <Input
                                    placeholder="请输入标题"
                                    ref={this.titleIpt = (titleIpt) => titleIpt && titleIpt.focus()}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="文章作者">
                            {getFieldDecorator("authors", {
                                rules: [{ required: true, message: "请输入作者" }],
                                initialValue: selItem.authors
                            })(
                                <Input
                                    placeholder="请输入作者"
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="封面图片">
                            {getFieldDecorator("thumb")(
                                <Upload img={selItem.img} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="选择分类">
                            {getFieldDecorator("category", {
                                rules: [{ required: true, message: "请选择分类" }],
                                initialValue: selItem.category
                            })(
                                <Select>
                                    {Tags && Tags.length > 0 && Tags.map((item) => (
                                        <Option key={item.id} value={item.tag}>{item.tag}</Option>
                                    ))}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="文章内容">
                            {getFieldDecorator("content", {
                                rules: [{ required: true, message: "请输入文章内容" }],
                                // initialValue: selItem.category
                            })(
                                <BraftEditor
                                    style={{ border: '1px solid #d9d9d9', borderRadius: "4px" }}
                                    controls={controls}
                                    // value={editorState}
                                    onChange={this.handleEditorChange}
                                    onSave={this.submitContent}
                                />
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>完成</Button>
                            <Button onClick={this.handleCancle} >取消</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(Editor)
