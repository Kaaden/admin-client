


import { Component } from "react"
import { connect } from "dva"

import { Button, Modal, Input } from "antd"
class tagsModal extends Component {
    state = { visible: false, value: "", item: "" }
    handleOk = async () => {
        const {dispatch,getData}=this.props
        const { value, item } = this.state
        if (value) {
            await dispatch({ type: "admin/changeTags", payload: { tag: value, id: item ? item.id : "", tagName: item ? item.tag : "" } })
            getData(1)
        }
        this.setState({ value: "", visible: false })
    }
    handleShow = () => {
        const { item } = this.props
        this.setState({ visible: true, item: item ? item : "", value: item ? item.tag : "" })
    }
    handleCancle = () => {
        this.setState({ visible: false, value: "", item: "" })
    }
    valueChange = (e) => {
        this.setState({ value: e.target.value })
    }
    render() {
        const { visible, value } = this.state
        const { type } = this.props
        return (
            <div>
                <Button type="primary" icon={type ? "plus" : ""} onClick={this.handleShow}>{type ? "增加标签" : "修改"}</Button>
                <Modal
                    title={type ? "增加标签" : "修改标签"}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancle}
                    okText="确定"
                    cancelText="取消"
                >
                    <div className="f fc">
                        <span className="fk" style={{ marginRight: 10 }}>标签</span>
                        <Input onChange={this.valueChange} value={value} />
                    </div>
                </Modal>
            </div>
        )
    }
}
export default connect()(tagsModal)
