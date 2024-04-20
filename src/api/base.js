// import axiosJsonpAdapter from 'axios-jsonp';
const apiHost = __DEBUG ? 'https://test-interact2.webapp.163.com/g97simulate' : 'https://interact2.webapp.163.com/g97simulate'


// 弹幕相关接口
const comment = {
	host: '//tower.webcgi.163.com',
	url: 'https://test.nie.163.com/test_html/xyq/m/2022/jlt/?test=barrage',
	uid: ''
};

axios.defaults.withCredentials = true;
// 发起请求后
axios.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        if (error) {
            // 请求配置发生的错误
			if (!error.response) {
				return console.log('Error', error.message);
			}
        }
        return Promise.reject(error);
    }
);

// 基础
export async function apiBase(path, params){
	// params = Object.assign(params,{
	// 	random: new Date().getTime()
	// });
	return axios.get(path, {
		baseURL: apiHost,
		params: params
	}).then(res => {
		if (!res) return res || {};
		return res.data;
	});
}

// 评论
export async function apiComment(path, params) {
	return axios.get(path, {
		baseURL: '//tower.webcgi.163.com/',
		params: params
	}).then(res => {
		if (!res) return res || {};
		return res.data;
	});
}