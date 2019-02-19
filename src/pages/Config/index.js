import { Component } from "react"
import { connect } from "dva"
import styles from "./index.css"
import Modals from "./components/Modals"
class Page extends Component {
    state = { visible: true }
    componentDidMount() {
        this.props.dispatch({ type: "admin/getConfig" })
    }
    render() {
        const { visible } = this.state
        const { config, logoImg } = this.props
        return (
            <div className="main f fv fc">
                <div className={styles.cardItem}>
                    <div className={styles.cardImg}>
                        <img src={logoImg} alt=""></img>
                    </div>
                    <div className={styles.cardMain}>
                        <span className={styles.cardTitle}>{config.hometitle}</span>
                        <span className={styles.cardLevel}>{config.homelevel}</span>
                    </div>
                </div>

                <div className={styles.cardItem}>
                    <div className={styles.cardImg}>
                        <img src={config.aboutImg} alt=""></img>
                    </div>
                    <div className={styles.cardMain}>
                        <span className={styles.cardTitle}>{config.aboutitle}</span>
                        <span className={styles.cardLevel}>{config.aboutlevel}</span>
                    </div>
                </div>

                <div className={styles.cardItem}>
                    <div className={styles.cardImg}>
                        <img src={config.tagsImg} alt=""></img>
                    </div>
                    <div className={styles.cardMain}>
                        <span className={styles.cardTitle}>{config.tagstitle}</span>
                        <span className={styles.cardLevel}>{config.tagslevel}</span>
                    </div>
                </div>
                <Modals visible={visible} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { config, logoImg } = state.admin
    return { config, logoImg }
}
export default connect(mapStateToProps)(Page)
