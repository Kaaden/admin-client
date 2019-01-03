import { Component } from "react"
import { connect } from "dva"
import { Form, Icon, Input, Button } from 'antd';
import styles from "./index.css"
class Page extends Component {
  state = {}
  componentDidMount() {
    this.props.dispatch({ type: "admin/featchImg" })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { logoImg } = this.props
    return (
      <div className={styles.contain}>
        <div className={styles.containbg}></div>
        <img src={logoImg} alt=""></img>
        <div className={styles.login}>
          <Form className={styles.loginMain}>
            <span className={styles.loginTitle}>Kaaden Blog</span>
            <Form.Item style={{width:"100%"}}>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item style={{width:"100%"}}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'  }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>Log in</Button>
          </Form>
        </div>
      </div>
    )
  }
}
const LogForm = Form.create()(Page)
function mapStateToProps(state) {
  const { logoImg } = state.admin
  return { logoImg }
}
export default connect(mapStateToProps)(LogForm)
