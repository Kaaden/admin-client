import { Component } from "react"
import { connect } from "dva"
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

class Page extends Component {
    state = {}
    componentDidMount() {
        this.props.dispatch({ type: "admin/getConfig" })
    }
    render() {
        const { config } = this.props
        console.log(config)
        return (
            <div className="main">
                <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src={config.aboutImg || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"} />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta
                        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={config.aboutitle || "Card title"}
                        description={config.aboutlevel || "This is the description"}
                    />
                </Card>

            </div>
        )
    }
}
function mapStateToProps(state) {
    const { config } = state.admin
    return { config }
}
export default connect(mapStateToProps)(Page)
