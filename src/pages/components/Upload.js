import { Component } from "react"
import { connect } from "dva"
import { Upload, Icon } from 'antd'
class Page extends Component {
    state = {
        loading: false,
        imageUrl: ""
    }
    handleChange = (info) => {
        let { file } = info
        if (file.status === "uploading") {
            this.setState({ loading: true })
        }
        if (file.status === "done") {
            this.setState({ loading: false, imageUrl: "http://127.0.0.1:80" + file.response.url })
        }
    }
    render() {
        const { img } = this.props
        let { imageUrl, loading } = this.state

        if (img && !imageUrl) {
            imageUrl = img
        }
        return (
            <Upload
                accept="image/*"
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://127.0.0.1:80/upload"
                onChange={this.handleChange}
            >
                {imageUrl ? <img style={{ width: "100%" }} src={imageUrl} alt="avatar" /> : <Icon type={loading ? 'loading' : 'plus'} />}
            </Upload>
        )
    }
}


export default connect()(Page)
