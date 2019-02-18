import React, { Component } from "react"
import { connect } from "dva"
import withRouter from "umi/withRouter"
import Header from "../pages/components/Header"
import NavigaList from "../pages/components/NavigaList"
import Navigator from "../pages/components/Navigator"
import Login from "../pages/components/Login"
import Error from "../pages/components/Error"
import styles from "./index.css"
class Layout extends Component {
    componentDidMount() {
        document.title = "Kaaden Admin"
        const { history } = this.props
        let link = document.querySelector("link[rel*='icon']") || document.createElement("link")
        link.type = "image/x-icon"
        link.rel = "shortcut icon"
        link.href = "http://kaaden.orrzt.com/public/logo.jpg"
        document.getElementsByTagName("head")[0].appendChild(link)
        if (history.location.pathname === "/about" || history.location.pathname === "/home") {
            this.props.dispatch({ type: "admin/featchImg" })
        }
    }
    render() {
        let showClient = true
        let auth = window.sessionStorage.getItem("auth")
        let { logoImg, children, navtive } = this.props
        if (NavigaList.length) {
            let index = NavigaList.findIndex(f => f.path === children.props.location.pathname)
            if (index === -1) {
                showClient = false
            }
        }
        if (auth) {
            return (
                <div className="contain f" >
                    {navtive && <Navigator children={children} />}
                    <div className="containMain  f fv f1">
                        <Header />
                        <div className="containf f1">
                            {showClient ? children : <Error />}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="contain" style={{ backgroundImage: `url(${logoImg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                    <div className={styles.containbg}></div>
                    <Login />
                </div>
            )
        }

    }
}

function mapStateToProps(state) {
    const { auth, logoImg, navtive } = state.admin
    return { auth, logoImg, navtive }
}
const mapState = connect(mapStateToProps)(Layout)
export default withRouter(mapState)
