// import Login from './login.js'
// const allApi = Object.assign(Login);
// export default allApi

import { apiBase, apiComment } from "./base.js";

export default {
	//登录接口（进行登录组件后调用）
	login: (params) => apiBase('/urs/login', params),
	commentList: (params) => apiComment('comments?', params),
	comment: (params) => apiComment('comment?', params),
}
