import { Component } from "react"
import { connect } from "dva"
import { Form, Icon, Input, Button } from 'antd';
import styles from "./index.css"
class Page extends Component {
  state = {}
  componentDidMount() {
    const {history}=this.props
    let auth = window.sessionStorage.getItem("auth")
    if(auth){
      history.push("/home")
    }
    this.props.dispatch({ type: "admin/featchImg" })
  }
  handleSubmit = (e) => {
    const { form, dispatch } = this.props
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: "admin/Login", payload: { ...values } })
      }
    });
  }
  render() {
    const { logoImg, form } = this.props
    const { getFieldDecorator } = form
    return (
      <div className={styles.contain}>
        <div className={styles.containbg}></div>
        <img src={logoImg} alt=""></img>
        <div className={styles.login}>
          <Form className={styles.loginMain} id="form" onSubmit={this.handleSubmit}>
            <span className={styles.loginTitle}>Kaaden Blog</span>
            <Form.Item style={{ width: "100%" }}>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入账号!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱账号" />
              )}
            </Form.Item>
            <Form.Item style={{ width: "100%" }}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginButton}>登录</Button>
          </Form>
        </div>
      </div>
    )
  }
}
const LogForm = Form.create()(Page)
function mapStateToProps(state) {
  const { logoImg, auth } = state.admin
  return { logoImg, auth }
}
export default connect(mapStateToProps)(LogForm)
