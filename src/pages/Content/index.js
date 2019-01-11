import { Component } from "react"
import { connect } from "dva"
import { Card, Icon, Row, Col, Button } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import styles from "./index.css"
import { routerRedux } from "dva/router"
// import Editor from "./components/Editor"
// import Link from "umi/link"
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
    handleShow = async (id) => {
        // await this.props.dispatch({ type: "admin/getSel", payload: item })
        this.props.dispatch(routerRedux.push({ pathname: '/Editor', query: { id } }));
    }
    render() {
        const { loading } = this.state
        const { Content, Contentotal } = this.props
        return (
            <div className="main">
                <Button type="primary" onClick={() => this.handleShow("")} style={{ margin: 10 }}>添加文章</Button>
                <Row type="flex">
                    {Content.length > 0 && Content.map((item) => (
                        <Col xs={24} lg={12} xl={8} xxl={6} key={item.id} style={{ padding: 10 }}>
                            <Card
                                hoverable
                                bordered
                                loading={loading}
                                cover={!loading && <img alt="example" src={item.img} style={{ height: 250 }} />}
                                actions={!loading && [<a onClick={() => this.handleShow(item.id)}><Icon type="edit" />编辑</a>, <a><Icon type="delete" />删除</a>]}
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
    const { Content, Contentotal } = state.admin
    return { Content, Contentotal }
}
export default connect(mapStateToProps)(Page)
