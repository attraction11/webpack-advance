import fetch from './fetch';
import { getPasswordConfirmed, setPasswordConfirmed } from '@/utils/auth'

const checkPasswordUtil = {
    checkManagePassword(passwordMd5) {
        let params = {
            accountPassword: passwordMd5
        };
        return new Promise((resolve, reject) => {
            if (getPasswordConfirmed()) {
                return resolve({
                    data: true
                })
            }
            fetch({
                url: '/api/user/pwdConfirm',
                method: 'post',
                data: params
            }).then(res => {
                if (res.data === true) {
                    setPasswordConfirmed()
                }
                resolve(res);
            }).catch(e => {
                console.error(e);
                reject('验证密码出错');
            });
        });

    }
};

export default checkPasswordUtil;