import "braft-editor/dist/index.css"
import { Component } from "react"
import { connect } from "dva"
import BraftEditor from "braft-editor"
import { ContentUtils } from "braft-utils"
import { Form, Input, Button, Select, Spin, Upload, Icon, message } from "antd"
import UploadComponents from "../components/Upload"
import { routerRedux } from "dva/router"
import { formClick } from "../../utils/helper"
import axios from "axios"
import qs from "qs";
const Option = Select.Option;
const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
    colon: false,
}
const excludeControls = ['emoji', 'media']
class Editor extends Component {
    state = { imgSrc: "", loading: false, btnloading: false }
    async componentDidMount() {
        const { Tags, dispatch, history, form } = this.props
        const { id } = history.location.query
        if (Tags.length === 0) {
            dispatch({ type: "admin/getTags" })
        }
        await dispatch({ type: "admin/getSel", payload: false })
        await this.setState({ loading: true })
        if (id) {
            let { data } = await axios.post("http://127.0.0.1:80/getEditor", qs.stringify({ id }))
            if (data.isok) {
                await this.setState({ imgSrc: data.data.img })
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
    handleSubmit = async (event) => {
        const { dispatch, history, form } = this.props
        const { id } = history.location.query
        event.preventDefault()
        await this.setState({ btnloading: true })
        let data = await formClick(form)
        if (data) {
            data.content = data.content.toHTML()
            if (id) {
                data.id = id
            }
            let isok = await dispatch({ type: "admin/addContent", payload: data })
            isok ? message.success("success") : message.error("faile")
            this.handleCancle()
        }
        await this.setState({ btnloading: false })
    }
    handleCancle = async () => {
        const { dispatch } = this.props
        await dispatch({ type: "admin/getSel", payload: true })
        dispatch(routerRedux.push({ pathname: '/content' }));
    }
    handleChange = (info) => {
        const { file } = info
        if (file.status === "done") {
            this.props.form.setFieldsValue({
                content: ContentUtils.insertMedias(this.props.form.getFieldValue("content"), [{
                    type: "IMAGE",
                    url: "http://127.0.0.1:80" + file.response.url,
                }]),
            })
        }
    }
    render() {
        const { loading, imgSrc, btnloading } = this.state
        const { Tags, form } = this.props
        const { getFieldDecorator } = form
        const extendControls = [
            {
                key: "antd-uploader",
                type: "component",
                component: (

                    <Upload
                        action="http://127.0.0.1:80/upload"
                        onChange={this.handleChange}
                        showUploadList={false}
                    >
                        <button
                            type="button"
                            className="control-item button upload-button"
                            data-title="插入图片"
                        >
                            <Icon type="picture" />
                        </button>
                    </Upload>
                ),
            },
        ]
        return (
            <div className="main" style={{ padding: "30px 0 0 0" }}>
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
                            {getFieldDecorator("img")(
                                <UploadComponents img={imgSrc} />
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
                                    excludeControls={excludeControls}
                                    extendControls={extendControls}
                                />
                            )}
                        </FormItem>
                        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
                            <Button loading={btnloading} type="primary" htmlType="submit" style={{ marginRight: 16, width: 100 }}>完成</Button>
                            <Button style={{ backgroundColor: "#002140", borderColor: "#002140", width: 100, color: "#fff" }} onClick={this.handleCancle} >返回</Button>
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
