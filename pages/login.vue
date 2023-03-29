<template>
	<view class="normal-login-container">
		<view class="logo-content align-center justify-center flex">
			<image style="width: 100rpx;height: 100rpx;" :src="globalConfig.appInfo.logo" mode="widthFix">
			</image>
			<text class="title">登录</text>
		</view>
		<view class="login-form-content">
			<view class="input-item flex align-center">
				<view class="iconfont icon-user icon"></view>
				<input v-model="loginForm.username" class="input" type="text" placeholder="请输入账号" maxlength="30" />
			</view>
			<view class="input-item flex align-center">
				<view class="iconfont icon-password icon"></view>
				<input v-model="loginForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20" />
			</view>
			<view class="checkbox flex align-center">
				<checkbox-group>
					<label class="checkbox-item">
						<checkbox value="cb" :checked="isSaveAccountName" />记住用户名
					</label>
					<label>
						<checkbox value="cb" />记住密码
					</label>
				</checkbox-group>
			</view>
			<Verify @success="pwdLogin" :mode="'pop'" :captchaType="'blockPuzzle'"
				:imgSize="{ width: '330px', height: '155px' }" ref="verify"></Verify>
			<view class="action-btn">
				<button @click="handleLogin" class="login-btn cu-btn block lg round">登录</button>
			</view>
			<view class="action-btn" v-if="showGesture">
				<button @click="handleGesture" class="sublogin-btn cu-btn block lg round">手势登录</button>
			</view>
			<view class="action-btn" v-if="showFingerPrint">
				<button @click="handleFingerPrint" class="sublogin-btn cu-btn block lg round">指纹登录</button>
			</view>
		</view>

		<view class="xieyi text-center">
			<text class="text-grey1">Logging in means agreeing to the<br></text>
			<text @click="handleUserAgrement" class="text-blue">User Agreement<br></text>
			<text @click="handlePrivacy" class="text-blue">Privacy Agreement</text>
		</view>
	</view>
</template>

<script>
	import Verify from "@/components/verifition/Verify"
	import {
		getStudentInfo
	} from "@/api/system/user.js";
	import settings from "../utils/settings";

	export default {
		name: 'Login',
		components: {
			Verify
		},
		data() {
			return {
				captchaEnabled: false, // 验证码开关 TODO 芋艿：需要抽到配置里
				globalConfig: getApp().globalData.config,
				isSaveAccountName: true, // 保存用户名
				showGesture: true, // 显示手势登录
				showFingerPrint: true, // 显示指纹登录
				loginForm: {
					// admin admin123
					username: "panyunqi",
					password: "panyunqi",
					captchaVerification: "",

				}
			}
		},
		onLoad() {
			if (settings.get("gesture")) {
				this.showGesture = true;
			}
			if (settings.get("fingerPrint")) {
				this.showFingerPrint = true;
			}
		},
		methods: {
			// 隐私协议
			handlePrivacy() {
				let site = this.globalConfig.appInfo.agreements[0]
				this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
			},
			// 用户协议
			handleUserAgrement() {
				let site = this.globalConfig.appInfo.agreements[1]
				this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
			},
			handleGesture() {
				this.$tab.navigateTo("./gestureLock?type=1");
			},
			handleFingerPrint() {
				this.$tab.navigateTo("./gestureLock?type=1");
			},
			// 登录方法
			async handleLogin(params) {
				if (this.loginForm.username === "") {
					this.$modal.msgError("请输入您的账号")
				} else if (this.loginForm.password === "") {
					this.$modal.msgError("请输入您的密码")
				} else {
					// 显示验证码
					if (this.captchaEnabled) {
						this.$refs.verify.show()
					} else { // 直接登录
						await this.pwdLogin({});
					}
				}
			},
			// 密码登录
			async pwdLogin(captchaParams) {
				this.$modal.loading("登录中，请耐心等待...")
				// 执行登录
				this.loginForm.captchaVerification = captchaParams.captchaVerification
				// Todo: 密码目前是明文的
				this.$store.dispatch('Login', this.loginForm).then(() => {
					this.$modal.closeLoading()
					this.loginSuccess()
				})
			},
			// 登录成功后，处理函数
			loginSuccess(result) {
				// 设置用户信息
				this.$store.dispatch('GetInfo').then(res => {
					// console.log(this.$store.state.user);
					if (this.isSaveAccountName) {
						uni.setStorageSync("account", this.loginForm.username);
					}
					getStudentInfo(this.$store.state.user.id).then(res => {
						// console.log(res);
						uni.setStorageSync("stuInfo", res.data);
						this.$tab.reLaunch('/pages/index');
					})

				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.normal-login-container {
		width: 100%;

		.logo-content {
			width: 100%;
			font-size: 21px;
			text-align: center;
			padding-top: 10%;

			image {
				border-radius: 4px;
			}

			.title {
				margin-left: 10px;
			}
		}

		.login-form-content {
			text-align: center;
			margin: 20px auto;
			margin-top: 10%;
			width: 80%;

			.input-item {
				margin: 20px auto;
				background-color: #f5f6f7;
				height: 45px;
				border-radius: 20px;

				.icon {
					font-size: 38rpx;
					margin-left: 10px;
					color: #999;
				}

				.input {
					width: 100%;
					font-size: 14px;
					line-height: 20px;
					text-align: left;
					padding-left: 15px;
				}
			}

			.checkbox {
				justify-content: space-around;

				.checkbox-item {
					margin-right: 10px;
				}
			}

			.login-btn {
				margin-top: 40px;
				height: 45px;
				background: #00aaff;
				color: white;
			}

			.sublogin-btn {
				margin-top: 10px;
				height: 45px;
				background: #94bcff;
				color: white;
			}

			.xieyi {
				color: #333;
				margin-top: 20px;
			}
		}

		.easyinput {
			width: 100%;
		}
	}

	.login-code-img {
		height: 45px;
	}
</style>