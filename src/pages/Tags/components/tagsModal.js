


import { Component } from "react"
import { connect } from "dva"

import { Button, Modal } from "antd"
class tagsModal extends Component {
    state = { visible: false }
    handleOk = () => {
        console.log(1)
    }
    handleShow = () => {
        const { visible } = this.state
        this.setState({ visible: !visible })
    }
    render() {
        const { visible } = this.state
        const { type } = this.props
        console.log(type)
        return (
            <div>
                <Button type="primary" icon={type ? "plus" : ""} onClick={this.handleShow}>{type ? "增加标签" : "修改"}</Button>
                <Modal
                    title={type ? "增加标签" : "修改标签"}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleShow}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}

export default connect()(tagsModal)
