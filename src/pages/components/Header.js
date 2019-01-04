import { Component } from "react"
import { connect } from "dva"
import styles from "./Header.css"
import { Icon, Button } from 'antd';
class Page extends Component {
    state = {}
    componentDidMount() {
    }
    toggleCollapsed = () => {
        this.props.dispatch({ type: "admin/changeColl", })
    }
    render() {
        const { collapsed } = this.props
        return (
            <div className={styles.Header} >
                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleCollapsed}  className={styles.close}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { collapsed } = state.admin
    return { collapsed }
}
export default connect(mapStateToProps)(Page)
