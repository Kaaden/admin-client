import { Component } from "react"
import { connect } from "dva"
import { Upload, Icon } from 'antd'
class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageUrl: ""
        }
    }
    state = {
        loading: false,
    }
    componentDidMount() {
        const { img } = this.props
        if (img) {
            this.setState({ imageUrl: img })
            this.triggerChange(img)
        } else {
            this.triggerChange("")
        }
    }

    handleChange = (info) => {
        let { file } = info
        if (file.status === "uploading") {
            this.setState({ loading: true })
        }
        if (file.status === "done") {
            let imageUrl = "http://127.0.0.1:80" + file.response.url
            this.setState({ loading: false, imageUrl })
            this.triggerChange(imageUrl)
        }
    }
    triggerChange = (imgs) => {
        const onChange = this.props.onChange
        if (onChange) {
            onChange(imgs)
        }
    }
    render() {
        const { imageUrl, loading } = this.state
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
