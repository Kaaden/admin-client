import { Component } from "react"
import { connect } from "dva"
import styles from "./Header.css"
import { Menu, Icon, Dropdown, Button, Avatar } from 'antd';
import { routerRedux } from "dva/router"
class Page extends Component {
    state = {}
    componentDidMount() {
    }
    toggleCollapsed = () => {
        const { collapsed } = this.props
        this.props.dispatch({ type: "admin/changeColl", payload: { collapsed: !collapsed } })
    }
    quit = () => {
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
    handleCancle = () => {
        this.props.dispatch({ type: "admin/getSel", payload: true })
        this.props.dispatch(routerRedux.push({ pathname: '/content' }));
    }
    render() {
        const { collapsed, auth, navtive } = this.props
        let user
        let auther = window.sessionStorage.getItem("auth")
        if (auther) {
            user = auth || JSON.parse(auther)
        }
        return (
            <div className={styles.Header} >
                {navtive ? <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleCollapsed} className={styles.close} /> :
                    <Button style={{ backgroundColor: "#002140", borderColor: "#002140" }} icon="left" onClick={this.handleCancle} type="primary" >返回</Button>}
                {!navtive && <div className={styles.title}>KAADEN</div>}
                <Dropdown overlay={this.menu} trigger={['hover']}>
                    <div className={styles.menu + " f fc"} >
                        <Avatar icon="user" src={user.logo} size="large" />
                        <span style={{ marginLeft: 10 }}>{user.username}</span>
                    </div>
                </Dropdown>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { collapsed, auth, navtive } = state.admin
    return { collapsed, auth, navtive }
}
export default connect(mapStateToProps)(Page)
