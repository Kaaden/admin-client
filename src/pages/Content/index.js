import { Component } from "react"
import { connect } from "dva"
import { Card, Icon, Row, Col } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import styles from "./index.css"
import Editor from "./components/Editor"
const { Meta } = Card;
class Page extends Component {
    state = { loading: false, }
    componentDidMount() {
        this.getData()
        this.props.dispatch({ type: "admin/getTags" })
    }
    getData = async () => {
        await this.setState({ loading: true })
        await this.props.dispatch({ type: "admin/getContent", payload: { status: 1, pageindex: 1 } })
        await this.setState({ loading: false })
    }
    render() {
        const { loading } = this.state
        const { Content, Contentotal, Tags } = this.props
        return (
            <div className="main">
                <Editor Tags={Tags} type={false} />
                <Row type="flex">
                    {Content.length > 0 && Content.map((item) => (
                        <Col xs={24} lg={12} xl={8} xxl={6} key={item.id} style={{ padding: 10 }}>
                            <Card
                                hoverable
                                bordered
                                loading={loading}
                                cover={!loading && <img alt="example" src={item.img} style={{ height: 250 }} />}
                                actions={!loading && [<Editor Tags={Tags} ct={item} type={true} />, <a><Icon type="delete" />删除</a>]}
                            >
                                <Meta
                                    title={item.title}
                                    description={
                                        <div className="f fv">
                                            <Ellipsis length={40}>{item.content}</Ellipsis>
                                            <span style={{ marginTop: 10 }}>分类：<span className={styles.time} >{item.category}</span></span>
                                            <span style={{ marginTop: 10 }}>发布时间：<span className={styles.time}>{item.time}</span></span>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div >
        )
    }
}
function mapStateToProps(state) {
    const { Content, Contentotal, Tags } = state.admin
    return { Content, Contentotal, Tags }
}
export default connect(mapStateToProps)(Page)
