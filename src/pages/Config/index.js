import { Component } from "react"
import { connect } from "dva"
import styles from "./index.css"
import Modals from "./components/Modals"
class Page extends Component {
    state = { visible: false, target: "", value: "" }
    componentDidMount() {
        this.props.dispatch({ type: "admin/getConfig" })
    }
    handle = (target, e) => {
        let { config } = this.props
        let value = ""
        switch (target) {
            case "home":
                value = {
                    title: e.hometitle,
                    titleLevel: e.homelevel,
                }
                break;
            case "about":
                value = {
                    title: e.aboutitle,
                    titleLevel: e.aboutlevel,
                    img: e.aboutImg
                }
                break;
            default:
                value = {
                    title: e.tagstitle,
                    titleLevel: e.tagslevel,
                    img: e.tagsImg
                }
                break;
        }
        value.id = config.id
        this.setState({ visible: true, target, value })
    }
    handleCancle = () => {
        this.setState({ visible: false, target: "", value: "" })
    }
    render() {
        const { visible, target, value } = this.state
        const { config, logoImg } = this.props
        return (
            <div className="main f fv fc">
                <div className={styles.cardItem} onClick={() => this.handle("home", config)}>
                    <div className={styles.cardImg}>
                        <img src={logoImg} alt=""></img>
                    </div>
                    <div className={styles.cardMain}>
                        <span className={styles.cardTitle}>{config.hometitle}</span>
                        <span className={styles.cardLevel}>{config.homelevel}</span>
                    </div>
                </div>

                <div className={styles.cardItem} onClick={() => this.handle("about", config)}>
                    <div className={styles.cardImg}>
                        <img src={config.aboutImg} alt=""></img>
                    </div>
                    <div className={styles.cardMain}>
                        <span className={styles.cardTitle}>{config.aboutitle}</span>
                        <span className={styles.cardLevel}>{config.aboutlevel}</span>
                    </div>
                </div>

                <div className={styles.cardItem} onClick={() => this.handle("tag", config)}>
                    <div className={styles.cardImg}>
                        <img src={config.tagsImg} alt=""></img>
                    </div>
                    <div className={styles.cardMain}>
                        <span className={styles.cardTitle}>{config.tagstitle}</span>
                        <span className={styles.cardLevel}>{config.tagslevel}</span>
                    </div>
                </div>
                <Modals visible={visible} value={value} target={target} handleCancle={this.handleCancle} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { config, logoImg } = state.admin
    return { config, logoImg }
}
export default connect(mapStateToProps)(Page)
