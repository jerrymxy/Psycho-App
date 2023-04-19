<template>
	<view class="setting-container" :style="{height: `${windowHeight}px`}">

		<uni-section type="line" class="mb-10" title="手势登录" sub-title="">
			<view class="uni-list">
				<view class="uni-list-cell uni-list-cell-pd">
					<view class="uni-list-cell-db">开启手势登录</view>
					<switch :checked="isGestureEnabled" @change="switchGestureChange" />
				</view>
				<view class="list-cell list-cell-arrow" @click="modifyPattern">
					<view class="uni-list-cell-db">修改手势图案</view>
				</view>
			</view>
		</uni-section>

		<uni-section v-if="isFingerPrintSupported" type="line" class="mb-10" title="指纹认证" sub-title="">
			<view class="uni-list">
				<view class="uni-list-cell uni-list-cell-pd">
					<view class="uni-list-cell-db">开启指纹登录</view>
					<switch :checked="isFingerPrintEnabled" @change="switchFPChange" />
				</view>
			</view>
		</uni-section>

		<uni-section type="line" class="mb-10" title="账户管理" sub-title="">
			<view class="uni-list">
				<view class="list-cell list-cell-arrow" @click="handleToPwd">
					<view class="uni-list-cell-db">修改密码</view>
				</view>
				<view class="list-cell">
					<view class="uni-list-cell-db">退出登录</view>
				</view>
			</view>
		</uni-section>

		<!-- <view class="">
		
			<uni-list>
				<uni-list-item title="修改密码" clickable link to="/pages/mine/account/pwd" />
				<uni-list-item title="手势认证" rightText="未开启" clickable link to="/pages/mine/account/gesture" />
				<uni-list-item v-if="isFingerPrintSupported" title="指纹认证" rightText="未开启" clickable link
					to="/pages/mine/account/fingerprint" />
			</uni-list>

			<!-- <view class="list-cell list-cell-arrow" @click="handleToPwd">
				<view class="menu-item-box">
					<view>修改密码</view>
				</view>
			</view>
			<view class="list-cell list-cell-arrow" @click="handleToGesture">
				<view class="menu-item-box">
					<view>手势认证</view>
				</view>
			</view>
			<view v-if="isFingerPrintSupported" class="list-cell list-cell-arrow" @click="handleToFinger">
				<view class="menu-item-box">
					<view>指纹认证</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import settings from "@/utils/settings.js";
	import fingerPrint from "@/utils/fingerprint.js";

	export default {
		data() {
			return {
				windowHeight: uni.getSystemInfoSync().windowHeight,
				isFingerPrintEnabled: false,
				isFingerPrintSupported: false,
				isGestureEnabled: false
			};
		},
		computed: {
			gestureTip() {
				return isGestureEnabled ? "未开启" : "已开启";
			},
			fingerPrintTip() {
				return isFingerPrintEnabled ? "未开启" : "已开启";
			}
		},
		onShow() {
			if (this.checkFingerPrint()) {
				this.checkFingerPrintEnabled();
			}
			this.checkGestureEnabled();

		},
		methods: {
			// 测试指纹是否可用
			checkFingerPrint() {
				this.isFingerPrintSupported = fingerPrint.checkIsSupport();
			},
			checkGestureEnabled() {
				if (settings.get("gesture")) {
					isGestureEnabled = true;
				}
			},
			checkFingerPrintEnabled() {
				if (settings.get("fingerPrint")) {
					isFingerPrintEnabled = true;
				}
			},
			switchGestureChange: function(e) {
				console.log('switchGesture 发生 change 事件，携带值为', e.detail.value);
				if (e.detail.value) {
					//手势锁认证类型（1-解锁、2、注册、3-修改）
					this.$tab.navigateTo('/pages/gestureLock?type=2');
				} else {
					this.$tab.navigateTo('/pages/gestureLock?type=1');
					settings.remove("gesture");
				}
			},
			switchFPChange() {
				if (fingerPrint.checkIsEnabled()) {
					if (fingerPrint.startAuth()) {
						settings.set("fingerPrint", true);
					} else {
						this.isFingerPrintEnabled = false;
					}
				} else {
					this.isFingerPrintEnabled = false;
				}
			},
			modifyPattern() {
				const pwd = settings.get("gesture");
				
				this.$tab.navigateTo('/pages/gestureLock?type=3&pwd=' + pwd);
			},
			handleToPwd() {
				this.$tab.navigateTo('/pages/mine/account/pwd');
			},
			handleLogout() {
				this.$modal.confirm('确定注销并退出系统吗？').then(() => {
					this.$store.dispatch('LogOut').then(() => {
						this.$tab.reLaunch('/pages/index')
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #f8f8f8;
	}

	.item-box {
		background-color: #FFFFFF;
		margin: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 10rpx;
		border-radius: 8rpx;
		color: #303133;
		font-size: 32rpx;
	}
</style>