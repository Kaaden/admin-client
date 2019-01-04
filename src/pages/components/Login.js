import { Component } from "react"
import { connect } from "dva"
import { Form, Icon, Input, Button } from 'antd';
import styles from "./Login.css"
class Page extends Component {
  state = { loading: false }

  handleSubmit = async (e) => {
    const { form, dispatch } = this.props
    e.preventDefault();
    this.setState({ loading: true })
    await form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: "admin/Login", payload: { ...values } })
      }
    });
    this.setState({ loading: false })
  }
  render() {
    const { loading } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.login}>
        <Form className={styles.loginMain} id="form" onSubmit={this.handleSubmit}>
          <span className={styles.loginTitle}>Kaaden Blog</span>
          <Form.Item style={{ width: "100%" }}>
            {getFieldDecorator('user', {
              rules: [{ required: true, message: '请输入账号!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="userName" />
            )}
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" className={styles.loginButton}>登录</Button>
        </Form>
      </div>
    )
  }
}
const LogForm = Form.create()(Page)

export default connect()(LogForm)
