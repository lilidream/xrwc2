import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
const service = axios.create({
        timeout: 5000,
        baseURL: 'https://xrwc.nightship.cn/api'
    })
service.interceptors.response.use(
    res => {
        return res
    },
    err => {
        console.log(err);
        if (err.response) {
            switch (err.response.status) {
                case 500:
                    ElementUI.Message({
                        type: 'error',
                        message: '服务器出现问题啦，请联系作者'
                    });
                    break;
                default:
                    break;
            }
        } else {
            ElementUI.Message({
                type: 'error',
                message: '连接服务器失败'
            });
        }
        return Promise.reject(err)
    }
);
export default service