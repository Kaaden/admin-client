import { Component } from "react"
import { connect } from "dva"
import styles from "./index.css"
import Login from "./components/Login"
class Page extends Component {
  state = {}
  componentDidMount() {
    const { history } = this.props
    let auth = window.sessionStorage.getItem("auth")
    if (auth) {
      history.push("/home")
    }
    this.props.dispatch({ type: "admin/featchImg" })
  }
  render() {
    const { logoImg } = this.props
    return (
      <div className="contain" style={{ backgroundImage:`url(${logoImg})`,backgroundSize:"cover",backgroundRepeat:"no-repeat" }}>
        <div className={styles.containbg}></div>
        <Login />
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { logoImg, auth } = state.admin
  return { logoImg, auth }
}
export default connect(mapStateToProps)(Page)
