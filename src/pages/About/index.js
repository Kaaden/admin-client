import { Component } from "react"
import { connect } from "dva"
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import styles from "./index.css"
import { Avatar } from "antd";
import UserModal from "./components/UserModal"
const { Description } = DescriptionList;
class Page extends Component {
    state = {}
    componentDidMount() {
    }
    render() {
        const { auth, logoImg } = this.props
        let user
        let auther = window.sessionStorage.getItem("auth")
        if (auther) {
            user = auth || JSON.parse(auther)
        }
        return (
            <div className="main" style={{ overflowY: "hidden" }}>
                <div className={styles.bannerContain} style={{ backgroundImage: `url(${logoImg})` }}>
                    <div className={styles.bannerBg} />
                    <div className={styles.title}>{user.user}</div>
                </div>
                <div className={styles.mainContain + " f fc"}>
                    <Avatar size={84} icon="user" src={user.logo} className={styles.mainlogo} />
                    <div className={styles.mainbox + " f1"}>
                        <DescriptionList size="large" col="1" id="desc">

                            <Description term="个人简述" >{user.description}</Description>
                            <Description term="个人介绍">{user.content}</Description>
                        </DescriptionList>
                    </div>
                </div>
                <div className="f fc-h">
                    <UserModal user={user} />
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { auth, logoImg } = state.admin
    return { auth, logoImg }
}

export default connect(mapStateToProps)(Page)
