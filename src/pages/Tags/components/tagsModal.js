


import { Component } from "react"
import { connect } from "dva"

import { Button, Modal, Input } from "antd"
class tagsModal extends Component {
    state = { visible: false, value: "" }
    handleOk = () => {
        console.log(1)
    }
    handleShow = () => {
        const { visible } = this.state
        this.setState({ visible: !visible })
    }
    valueChange(e) {
        console.log(e)
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
                    onCancel={this.handleShow}
                    okText="确定"
                    cancelText="取消"
                >
                    <div className="f fc">
                        <span className="fk" style={{ marginRight: 10 }}>标签</span>
                        <Input onChange={this.valueChange} />
                    </div>
                </Modal>
            </div>
        )
    }
}
export default connect()(tagsModal)
