import { Component } from "react"
import { connect } from "dva"
import styles from "./index.css"
class Page extends Component {
  state = {}
  componentDidMount() {
    this.props.dispatch({ type: "admin/featchImg" })
  }
  render() {
    const { logoImg } = this.props
    return (
      <div className={styles.contain}>
        <img src={logoImg} alt=""></img>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { logoImg } = state.admin
  return { logoImg }
}
export default connect(mapStateToProps)(Page)
