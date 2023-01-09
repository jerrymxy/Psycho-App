<template>
	<view class="content">
		<view>
			<!-- <image class="logo" src="/static/logo.png"></image> -->
			<view class="text-area">
				<text class="title">
					Hi!<br>
					{{name}}，欢迎你
				</text>
			</view>
		</view>
		<view>
			<view v-if="!notFirstLogin">
				<uni-card class="first-login" title="第一次使用吗？" extra="点击关闭提示" @click="setFirstLogin">
					<text class="uni-body">下面的卡片展示了App的主要功能，点一下试试吧！</text>
				</uni-card>
			</view>
			<view v-if="hasApmt">
				<uni-card title="您有一个未开始的预约" extra="" :thumbnail="tips_icon" @click="navToApmtHistory">
					<text class="uni-body">
						时间：{{apmt.date}}<br>
						地点：{{apmt.location}}
					</text>
				</uni-card>
			</view>
		</view>

		<!-- <uni-card> -->
		<uni-group style="margin: 0 15px 15px 15px;" title="快速入口" mode="card">
			<!-- <uni-section class="features" title="快速入口" type="line" padding="0 0 15px 0"> -->
			<view class="grid-body">
				<uni-grid :column="3" :showBorder="false" :highlight="true">
					<uni-grid-item>
						<view class="grid-item-box" @tap="navToApmt">
							<view class="material-icons md-36 md-dark">&#xe878;</view>
							<text class="text">我要预约</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" @tap="navToApmtHistory">
							<view class="material-icons md-36 md-dark">&#xe889;</view>
							<text class="text">预约记录</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="grid-item-box" @tap="navToPsym">
							<view class="material-icons md-36 md-dark">&#xea70;</view>
							<text class="text">心理测评</text>
						</view>
					</uni-grid-item>

				</uni-grid>
			</view>
			<!-- </uni-section> -->
		</uni-group>
		<!-- </uni-card> -->

		<!-- <uni-card> -->
		<uni-group style="margin: 0 15px 15px 15px;" title="联系我们" mode="card">
			<!-- <uni-section class="mb-10 features" title="联系我们" type="line" padding="0 0 20px 20px"> -->
			<text class="uni-body">
				<dt>学生心理健康教育与咨询中心</dt>
				<dt>北京大学新太阳学生中心4层南侧</dt>
				<dt>联系电话：<a href="tel:010-62760852">010-62760852</a></dt>
				<dt>电子邮箱：<a href="mailto:zixun@pku.edu.cn">zixun@pku.edu.cn</a></dt>
				<dt>北京大学24小时心理援助热线：<a href="tel:010-62760521">010-62760521</a></dt>
				<dt>公众号：北大学生心理健康教育与咨询中心</dt>
			</text>
			<!-- </uni-section> -->
		</uni-group>
		<!-- </uni-card> -->

	</view>

</template>

<script>
	export default {
		onLoad: function() {
			this.getFirstLogin();
		},
		methods: {
			// navToApmtDetail() {
			// 	uni.showToast({
			// 		title: '暂未完成',
			// 		duration: 1000,
			// 		icon: "error"
			// 	});
			// },
			navToApmt() {
				uni.switchTab({
					url: 'appointment/index'
				});
			},
			navToApmtHistory() {
				uni.navigateTo({
					url: "appointment/history"
				});
			},
			navToPsym() {
				uni.switchTab({
					url: 'psychometry/index'
				});
			},
			setFirstLogin() {
				uni.setStorage({
					key: "not_first_login",
					data: true
				})
				this.notFirstLogin = true;
			},
			getFirstLogin() {
				this.notFirstLogin = uni.getStorageSync("not_first_login");
			},
		},
		data() {
			return {
				name: this.$store.state.user.name,
				apmt: {
					date: "2022-12-19 14:30",
					location: "A101",
				},
				notFirstLogin: false,

				tips_icon: "/static/images/home/remind.png",

			}
		},
		computed: {
			hasApmt() {
				// Todo: 判断是否有预约
				return false;
			}
		}
	}
</script>

<style>
	page {
		/* height: 100%; */
		background-color: #bfe9fd;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		/* background: #00aaff; */
	}


	.logo {
		height: 200rpx;
		width: 200rpx;
		/* margin-top: 200rpx; */
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: left;
	}

	.title {
		margin: 50px 0 10px 35px;
		font-size: 48rpx;
		color: rgba(0, 0, 0, 0.54);
	}

	.first-login {
		background-color: lightyellow;
	}

	.features {
		/* display: grid;
		grid-template-columns: 1fr 1fr; */
		margin-top: 15px;
		background-color: transparent;
		/* width: 100%; */
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}
</style>
