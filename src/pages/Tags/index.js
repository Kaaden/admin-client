import { Component } from "react"
import { connect } from "dva"
import TagsForm from "./components/tagsForm"
import TagsModal from "./components/tagsModal"
import { Table, Button } from 'antd';

class Tags extends Component {
    state = { current: 1, loading: false }
    componentDidMount() {
        this.getData(1)
    }
    getData = async (current, tag) => {
        await this.setState({ loading: true })
        await this.props.dispatch({ type: "admin/getTags", payload: { pageindex: current, tag: tag ? tag : "" } })
        await this.setState({ loading: false })
        this.setState({ current })
    }
    pageChange = async (e) => {
        this.getData(e)
    }
    Del = async (item) => {
        const { current } = this.state
        if (item) {
            await this.props.dispatch({ type: "admin/DelTags", payload: { id: item.id } })
            this.getData(current)
        }
    }
    render() {
        const { current, loading } = this.state
        const { Tags, Tagstotal } = this.props
        const paginationConfig = {
            current,
            total: Tagstotal,
            defaultPageSize: 10,
            hideOnSinglePage: true,
            onChange: this.pageChange
        }
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
                render: (item) => (
                    <div className="f">
                        <Button type="danger" style={{ marginRight: 20 }} onClick={() => this.Del(item)}>删除</Button>
                        <TagsModal type={false} item={item} />
                    </div>
                )
            }
        ]
        return (
            <div className="main">
                <TagsForm getData={this.getData} />
                <Table loading={loading} pagination={paginationConfig} rowKey="id" columns={columns} dataSource={Tags} bordered />
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { Tags, Tagstotal } = state.admin
    return { Tags, Tagstotal }
}
export default connect(mapStateToProps)(Tags)
