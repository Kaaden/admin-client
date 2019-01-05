import { Component } from "react"
import { connect } from "dva"
import { Input, } from 'antd';
import styles from "../index.css"
import TagsModal from "./tagsModal"
const Search = Input.Search
class tagsForm extends Component {
    state = {}
    searchTags = (e) => {
        this.props.getData(1, e)
    }
    render() {
        const { getData } = this.props
        return (
            <div className={styles.topTags}>
                <Search
                    placeholder="搜索标签"
                    onSearch={this.searchTags}
                    enterButton
                    style={{ width: 300, marginRight: 30 }}
                />
                <TagsModal type={true} getData={getData} />
            </div>
        )
    }
}

export default connect()(tagsForm)
