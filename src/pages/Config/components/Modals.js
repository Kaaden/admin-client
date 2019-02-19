import { Modal } from "antd"

const Modals = ({ visible, onCancel }) => (
    <Modal visible={visible} closable={false} onCancel={onCancel}>
        <div>1</div>
    </Modal>
)
export default Modals

