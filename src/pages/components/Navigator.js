import { Component } from "react"
import { connect } from "dva"
import { Menu, Icon, Layout } from 'antd';
import styles from "./Navigator.css"
import NavigaList from "./NavigaList"
import withRouter from "umi/withRouter"
import Link from "umi/link"
const SubMenu = Menu.SubMenu;
const { Sider } = Layout
class Page extends Component {
    state = {}
    componentDidMount() {
        window.addEventListener("resize", this.resize)
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize)
    }
    resize = (e) => {
        if (document.body.offsetWidth < 1100) {
            this.props.dispatch({ type: "admin/changeColl", payload: { collapsed: true } })
        } else {
            this.props.dispatch({ type: "admin/changeColl", payload: { collapsed: false } })
        }

    }
    render() {
        let selNav = []
        const { collapsed, location } = this.props
        if (location.pathname) {
            let index = NavigaList.findIndex(f => f.path === location.pathname)
            if (index !== -1) {
                selNav.push(NavigaList[index].key)
            } else {
                selNav = []
            }
        }
        return (
            <Layout style={{ height: "100%", flex: "none" }}>
                <Sider collapsed={collapsed} collapsible trigger={null}>
                    <div className={styles.title}>{collapsed ? "A" : "ADMIN"}</div>
                    <Menu
                        selectedKeys={selNav}
                        mode="inline"
                        theme="dark"
                    >
                        {NavigaList.map((item) => {
                            if (!item.show) {

                                if (item.childrenNav.length) {
                                    return (
                                        <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                                            {item.childrenNav.map((cn) => (
                                                <Menu.Item key={cn.key}>{cn.title}</Menu.Item>
                                            ))}
                                        </SubMenu>
                                    )
                                } else {
                                    return (
                                        <Menu.Item key={item.key}>
                                            <Link to={item.path}>
                                                <Icon type={item.icon} />
                                                <span>{item.title}</span>
                                            </Link>
                                        </Menu.Item>
                                    )
                                }
                            }
                        })}

                    </Menu>
                </Sider>
            </Layout>
        )
    }
}
function mapStateToProps(state) {
    const { collapsed } = state.admin
    return { collapsed }
}
export default withRouter(connect(mapStateToProps)(Page))
