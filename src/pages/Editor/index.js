import "braft-editor/dist/index.css"
import { Component } from "react"
import { connect } from "dva"
import BraftEditor from "braft-editor"
import { Form, Input, Button, Select, Spin } from "antd"
import Upload from "../components/Upload"
import { routerRedux } from "dva/router"
import axios from "axios"
import qs from "qs";
const Option = Select.Option;
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
    colon: false,
}
const controls = ["bold", "italic", "underline", "text-color", "separator", "link", "separator", "font-family", "font-size", "line-height", "media"]

class Editor extends Component {
    state = { imgSrc: "", loading: false }
    async componentDidMount() {
        const { Tags, dispatch, history, form } = this.props
        const { id } = history.location.query
        if (Tags.length === 0) {
            dispatch({ type: "admin/getTags" })
        }
        this.props.dispatch({ type: "admin/featchImg" })
        await dispatch({ type: "admin/getSel", payload: false })
        await this.setState({ loading: true })
        if (id) {
            let { data } = await axios.post("http://127.0.0.1:80/getEditor", qs.stringify({ id }))
            if (data.isok) {
                await this.setState({imgSrc: data.data.img})
                let value = {
                    title: data.data.title,
                    content: BraftEditor.createEditorState(data.data.content),
                    authors: data.data.authors,
                    category: data.data.category
                }
                form.setFieldsValue({ ...value })
            }
        }
        await this.setState({ loading: false })
    }
    componentWillUnmount() {
        this.props.dispatch({ type: "admin/getSel", payload: true })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields((error, values) => {
            if (!error) {
                let value = values.content.toHTML()
                console.log(value)
            }
        })
    }
    handleCancle = async () => {
        this.props.dispatch(routerRedux.push({ pathname: '/content' }));
    }
    render() {
        const { loading,imgSrc } = this.state
        const { Tags, form } = this.props
        const { getFieldDecorator } = form
        return (
            <div className="main" style={{padding:"30px 0 0 0"}}>
                <Spin spinning={loading}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout} label="文章标题">
                            {getFieldDecorator("title", {
                                rules: [{ required: true, message: "请输入标题" }],
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
                            })(
                                <Input placeholder="请输入作者" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="封面图片">
                            {getFieldDecorator("thumb")(
                                <Upload img={imgSrc} />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="选择分类">
                            {getFieldDecorator("category", {
                                rules: [{ required: true, message: "请选择分类" }],
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
                            })(
                                <BraftEditor
                                    style={{ border: '1px solid #d9d9d9', borderRadius: "4px" }}
                                    controls={controls}
                                    onChange={this.handleEditorChange}
                                    onSave={this.submitContent}
                                />
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: 16 }}>完成</Button>
                            <Button onClick={this.handleCancle} >返回</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { Tags } = state.admin
    return { Tags }
}
let EditorPage = Form.create()(Editor)
export default connect(mapStateToProps)(EditorPage)
