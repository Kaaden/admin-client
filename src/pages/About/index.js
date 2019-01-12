import { Component } from "react"
import { connect } from "dva"
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import styles from "./index.css"
import { Button, Avatar } from "antd";
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
        console.log(user)
        return (
            <div className="main">
                <div className={styles.bannerContain} style={{ backgroundImage: `url(${logoImg})` }}>
                    <div className={styles.bannerBg} />
                    <div className={styles.title}>{user.username}</div>
                </div>
                <div className={styles.mainContain + " f fc"}>
                    <Avatar size={84} icon="user" src={user.logo} className={styles.mainlogo} />
                    <div className={styles.mainbox + " f1"}>
                        <DescriptionList size="large" col="1" id="desc">
                            <Description term="个人简述" >{user.desc}</Description>
                            <Description term="个人介绍">{user.content}</Description>

                        </DescriptionList>
                    </div>
                </div>
                <div className="f fc-h">

                    {/* <Button type="primary" style={{ width: 300, height: 44 }} icon="edit">编辑</Button> */}
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
