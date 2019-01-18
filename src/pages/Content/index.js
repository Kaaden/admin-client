import { Component } from "react"
import { connect } from "dva"
import { Card, Icon, Button, List, Spin, Popconfirm } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import styles from "./index.css"
import { routerRedux } from "dva/router"
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios"
import qs from "qs";
const { Meta } = Card;
class Page extends Component {
    state = { loading: false, hasMore: true, list: [], total: 0, pageindex: 0, hasLoad: false }
    componentDidMount() {
        this.handleInfiniteOnLoad()
    }
    handleInfiniteOnLoad = async () => {
        let { list, total, pageindex, hasLoad } = this.state
        await this.setState({ loading: true })
        if (hasLoad) {
            return
        }
        if (total && total === list.length) {
            this.setState({
                hasMore: false,
                loading: false,
                hasLoad: true,
            });
            return
        }
        pageindex = pageindex + 1
        let { data } = await axios.post("http://kaaden.orrzt.com/getContent", qs.stringify({ status: 1, pageindex }))
        if (data.isok) {
            await this.setState({
                list: [...list, ...data.list],
                pageindex,
                total: data.total,
                loading: false,
                hasLoad: false
            })
        } else {
            this.setState({ loading: false, hasLoad: true })
        }
    }
    handleShow = (id) => {

        this.props.dispatch(routerRedux.push({ pathname: '/Editor', query: { id } }));
    }
    confirm = async (id) => {
        const { dispatch } = this.props
        let { list } = this.state
        if (list.length) {
            let data = await dispatch({ type: "admin/delContent", payload: { id } })
            if (data) {
                let index = list.findIndex(f => f.id === id)
                if (index !== -1) {
                    list.splice(index, 1)
                    this.setState({ list })
                }
            }
        }
    }
    render() {
        const { loading, hasMore, list } = this.state
        return (
            <div className="main">
                <Button type="primary" onClick={() => this.handleShow("")} style={{ marginBottom: 20 }}>添加文章</Button>
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
                            gutter: 16, xs: 4, lg: 2, xl: 3, xxl: 4, sm: 2, md: 2
                        }}

                        renderItem={item => {
                            let content = ""
                            if (item.content) {
                                content = item.content.replace(/<[^>]+>/g, "").replace(/↵/g, "")
                            }
                            return (
                                <List.Item key={item.id}>
                                    <Card
                                        hoverable
                                        bordered
                                        cover={<div alt="example" style={{ height: 250, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: `url(${item.img})` }} />}
                                        actions={[<a onClick={() => this.handleShow(item.id)}><Icon type="edit" />编辑</a>, <Popconfirm title="确认删除这篇文章" onConfirm={() => this.confirm(item.id)} okText="删除" cancelText="取消">
                                            <a><Icon type="delete" />删除</a>
                                        </Popconfirm>]}
                                    >
                                        <Meta
                                            title={item.title}
                                            description={
                                                <div className="f fv">
                                                    <Ellipsis length={20}>{content}</Ellipsis>
                                                    <span style={{ marginTop: 10 }}>分类：<span className={styles.time} >{item.category}</span></span>
                                                    <span style={{ marginTop: 10 }}>发布时间：<span className={styles.time}>{item.time}</span></span>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </List.Item>
                            )
                        }}
                    >

                        {loading && hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>

            </div >
        )
    }
}

export default connect()(Page)
