// 应用全局配置
module.exports = {
  // baseUrl: 'http://localhost:8080',
	// Todo: 切换到app-api接口
  baseUrl: 'http://localhost:48080',
	
	// 测试用url
	// baseUrl: "http://127.0.0.1:4523/m1/2022323-0-default",
  baseApi: '/admin-api',
	// baseApi: '',
  // 应用信息
  appInfo: {
    // 应用名称
    name: "yudao-app",
    // 应用版本
    version: "1.0.0",
    // 应用logo
    logo: "/static/logo.png",
    // 官方网站
    site_url: "https://iocoder.cn",
    // 政策协议
    agreements: [{
        title: "隐私政策",
        url: "https://iocoder.cn"
      },
      {
        title: "用户服务协议",
        url: "https://iocoder.cn"
      }
    ]
  }
}
