import { Component } from "react"
import { connect } from "dva"
import styles from "./Header.css"
import { Menu, Icon, Badge, Dropdown } from 'antd';
class Page extends Component {
    state = {}
    componentDidMount() {
    }
    toggleCollapsed = () => {
        this.props.dispatch({ type: "admin/changeColl", })
    }
    quit=()=>{
        window.location.href = ""
        window.sessionStorage.clear()
    }
    menu = (
        <Menu>
            <Menu.Item key="0">
                <a onClick={this.quit}>退出</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="http://www.taobao.com/">修改密码</a>
            </Menu.Item>
        </Menu>
    );

    render() {
        const { collapsed, auth } = this.props
        let auther = window.sessionStorage.getItem("auth")
        let user
        if (auther) {
            user = auth || JSON.parse(auther)
        }
        return (
            <div className={styles.Header} >
                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleCollapsed} className={styles.close} />
                <Dropdown overlay={this.menu} trigger={['hover']}>
                    <div className={styles.menu} >
                        <Badge status="success" text={user.username} />
                    </div>
                </Dropdown>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { collapsed, auth } = state.admin
    return { collapsed, auth }
}
export default connect(mapStateToProps)(Page)
