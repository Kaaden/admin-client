import { Component } from "react"
import { connect } from "dva"
import { Menu, Icon, Layout } from 'antd';
import styles from "./Navigator.css"
const SubMenu = Menu.SubMenu;
const { Sider } = Layout
class Page extends Component {

    componentDidMount() {

    }

    render() {
        const { collapsed } = this.props
        return (
            <Layout style={{ height: "100%",flex: "none" }}>
                <Sider collapsed={collapsed}>
                    <div className={styles.title}>{collapsed ? "A" : "ADMIN"}</div>
                    <Menu
                        style={{ height: "100%" }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                    // inlineCollapsed={collapsed}
                    >
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Option 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="inbox" />
                            <span>Option 3</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </SubMenu>
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
export default connect(mapStateToProps)(Page)
