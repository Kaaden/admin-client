import { Component } from "react"
import { connect } from "dva"
import styles from "./index.css"
class Home extends Component {
  state = {}
  componentDidMount() {
  }
  render() {
    const { logoImg } = this.props
    return (
      <div className="main" style={{ backgroundImage: `url(${logoImg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
        <div className={styles.bg}></div>
        <div className={styles.tip}>Welcome come to Use</div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { logoImg, auth } = state.admin
  return { logoImg, auth }
}
export default connect(mapStateToProps)(Home)
