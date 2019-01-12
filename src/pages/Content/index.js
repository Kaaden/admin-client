import { Component } from "react"
import { connect } from "dva"
import { Card, Icon, Row, Col, Button, List, Spin } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import styles from "./index.css"
import { routerRedux } from "dva/router"
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios"
import qs from "qs";
const { Meta } = Card;
class Page extends Component {
    state = { loading: false, hasMore: true, list: [], total: 0 }
    componentDidMount() {
        this.handleInfiniteOnLoad()
        this.props.dispatch({ type: "admin/getTags" })
    }
    getData = async () => {
        await this.setState({ loading: true })
        await this.props.dispatch({ type: "admin/getContent", payload: { status: 1, pageindex: 1 } })
        await this.setState({ loading: false })
    }
    handleInfiniteOnLoad = async () => {
        let { list, total } = this.state
        let payload = { status: 1, pageindex: 1 }
        await this.setState({ loading: true })

        if (total && total === list.length) {
            this.setState({
                hasMore: false,
                loading: false,
            });
            return
        }
        let { data } = await axios.post("http://127.0.0.1:80/getContent", qs.stringify({ ...payload }))
        if (data.isok) {
            list = list.concat(data.list)
            await this.setState({
                list,
                total: data.total,
                loading: false,
            });
        }
    }
    handleShow = (id) => {
        this.props.dispatch(routerRedux.push({ pathname: '/Editor', query: { id } }));
    }
    render() {
        const { loading, hasMore, list } = this.state
        const { Content, Contentotal } = this.props
        return (
            <div className="main">
                <Button type="primary" onClick={() => this.handleShow("")} style={{ margin: 10 }}>添加文章</Button>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!loading && hasMore}
                    useWindow={false}
                >
                    <List
                        dataSource={list}
                        grid={{
                            gutter: 16,column:4
                        }}
                        renderItem={item => (
                            <List.Item key={item.id}>
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
                            </List.Item>
                        )}
                    >
                        {loading && hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
                {/* <Row type="flex">
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
                </Row> */}
            </div >
        )
    }
}
function mapStateToProps(state) {
    const { Content, Contentotal } = state.admin
    return { Content, Contentotal }
}
export default connect(mapStateToProps)(Page)
