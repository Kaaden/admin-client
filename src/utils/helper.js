//表单事件
export const formClick = (form) => {
    return new Promise((resolve, reject) => {
        form.validateFields((error, values) => {
            if (!error) {
                resolve(values)
            } else {
                resolve("")
            }
        })
    })
}