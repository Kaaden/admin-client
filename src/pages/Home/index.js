import { Component } from "react"
import { connect } from "dva"
import Header from "../components/Header"
import Navigator from "../components/Navigator"
class Page extends Component {
  state = {}
  componentDidMount() {

  }
  render() {
    return (
      <div className="contain f" >
        <Navigator />
        <div className="containMain f1">
          <Header />
        </div>
      </div>
    )
  }
}
// function mapStateToProps(state) {
//   const { logoImg, auth } = state.admin
//   return { logoImg, auth }
// }
export default connect()(Page)
