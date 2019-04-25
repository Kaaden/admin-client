import { Component } from "react"
import { connect } from "dva"
import LazyLoad from 'react-lazyload';
import styles from "./index.css"
import { Icon, Modal, Upload, message, Popconfirm } from "antd"
import axios from "axios"
import qs from "qs";
class Page extends Component {
    state = { visible: false, img: "", loading: false, imgId: "" }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({ type: "admin/findImg" })
    }
    openModal = (item = "") => {
        let { visible } = this.state
        this.setState({ visible: !visible, img: item ? item.img : "", imgId: item ? item.id : "" })
    }
    handleChange = (info) => {
        const { file } = info
        if (file.status === "done") {
            this.setState({ img: "http://kaaden.orrzt.com" + file.response.url })
        }
        const that = this
        setTimeout(() => {
            that.setState({ loading: false })
        }, 1000);
    }
    beforeUpload = () => {
        this.setState({ loading: true })
    }
    onDel = async (id) => {
        const { dispatch } = this.props
        const { data } = await axios.post("http://127.0.0.1:4000/imgChange", qs.stringify({ id, type: "del" }))
        if (data.isok) {
            dispatch({ type: "admin/findImg" })
        }
    }

    render() {
        const { visible, img, loading, imgId } = this.state
        const { imgList } = this.props
        return (
            <div className="main f fv fc">
                <div className={styles.wrap}>
                    {imgList.length > 0 && imgList.map((item) => (
                        <div key={item.id} className={styles.wrapItem}>
                            <LazyLoad height={200} offset={100}>
                                <img className={styles.imgItem} src={item.img} alt="" onClick={() => this.openModal(item)} />
                            </LazyLoad>
                            <div className={styles.tools}>
                                <Icon type="edit" onClick={() => this.openModal(item)} />
                                <Popconfirm title="确认删除吗?" onConfirm={() => this.onDel(item.id)} okText="确定" cancelText="取消">
                                    <Icon type="delete" />
                                </Popconfirm>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.addNew} onClick={() => this.openModal()}>
                    <Icon type="plus" />
                </div>
                <UpLoadImg
                    change={this.handleChange}
                    onOpen={this.openModal}
                    before={this.beforeUpload}
                    id={imgId}
                    visible={visible}
                    img={img}
                    loading={loading}
                    dispatch={this.props.dispatch}
                />
            </div>
        )
    }
}

class UpLoadImg extends Component {
    state = { btnloading: false }
    handleUp = async () => {
        this.setState({ btnloading: true })
        const { img, id, onOpen, dispatch } = this.props
        const { data } = await axios.post("http://127.0.0.1:4000/imgChange", qs.stringify({ id, img }))

        dispatch({ type: "admin/findImg" })
        const that = this
        setTimeout(() => {
            if (data.isok) {
                message.success(data.msg)
            } else {
                message.error(data.msg)
            }
            that.setState({ btnloading: false })
            onOpen()
        }, 1000);
    }
    render() {
        const { btnloading } = this.state
        const { visible, onOpen, img, loading, change, before } = this.props
        const UpBtn = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <Modal
                title="上传照片"
                visible={visible}
                okText="确定"
                cancelText="取消"
                onOk={this.handleUp}
                onCancel={() => onOpen()}
                destroyOnClose={true}
                confirmLoading={btnloading}
            >
                <Upload
                    beforeUpload={before}
                    accept="image/*"
                    action="http://kaaden.orrzt.com/upload"
                    onChange={change}
                    showUploadList={false}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                >
                    {img && !loading ? <img src={img} alt="avatar" style={{ width: "100%" }} /> : UpBtn}
                </Upload>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    const { imgList } = state.admin
    return { imgList }
}
export default connect(mapStateToProps)(Page)
