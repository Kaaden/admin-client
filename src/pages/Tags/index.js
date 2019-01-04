import { Component } from "react"
import { connect } from "dva"
import TagsForm from "./components/tagsForm"
import TagsModal from "./components/tagsModal"
import { Table, Button } from 'antd';
const columns = [
    {
        title: "id",
        dataIndex: "id",
    }, {
        title: "标签",
        dataIndex: "tag",
    },
    {
        title: "操作",
        width: 300,
        render: (id) => (
            <div className="f">
                <Button type="danger" style={{ marginRight: 20 }}>删除</Button>
                <TagsModal type={false} />
            </div>
        )
    }
]
class Tags extends Component {
    state = {}
    componentDidMount() {
        this.props.dispatch({ type: "admin/getTags" })
    }
    render() {
        const { Tags } = this.props
        return (
            <div className="main">
                <TagsForm />
                <Table rowKey="id" columns={columns} dataSource={Tags} bordered />
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { Tags } = state.admin
    return { Tags }
}
export default connect(mapStateToProps)(Tags)
