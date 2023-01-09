<template>
	<view class="container">
		<uni-section title="基本信息" type="line">
			<uni-list>
				<uni-list-item showExtraIcon="true" :extraIcon="{type: 'person'}" title="姓名"
					:rightText="user.nickname" />
				<uni-list-item showExtraIcon="true" :extraIcon="{type: 'auth'}" title="学生类型"
					:rightText="stuInfo.type" />
				<uni-list-item showExtraIcon="true" :extraIcon="{type: 'staff'}" title="院系"
					:rightText="stuInfo.deptName" />
				<uni-list-item showExtraIcon="true" :extraIcon="{type: 'calendar'}" title="出生日期"
					:rightText="stuInfo.birthday" />
			</uni-list>
		</uni-section>
		<uni-section title="附加信息" type="line">
			<template v-slot:right>
				<view style="color: rgba(0, 0, 0, 0.54);" @click="navToEdit">点击修改</view>
			</template>
			<uni-list>
				<uni-list-item showExtraIcon="true" :extraIcon="{type: 'phone'}" title="手机号码"
					:rightText="user.mobile" />
				<uni-list-item showExtraIcon="true" :extraIcon="{type: 'email'}" title="邮箱" :rightText="user.email" />
			</uni-list>
			<!-- <view class="btn">
				<button @click="navToEdit">修改信息</button>
			</view> -->
		</uni-section>

	</view>
</template>

<script>
	import {
		getUserProfile
	} from "@/api/system/user"
	import {
		parseTime
	} from "@/utils/ruoyi"

	export default {
		data() {
			return {
				user: {},
				stuInfo: {}
			}
		},
		onLoad() {
			this.getUser();
			this.stuInfo = uni.getStorageSync("stuInfo");
		},
		methods: {
			getUser() {
				getUserProfile().then(response => {
					this.user = response.data
				})
			},
			parseTime(time) {
				return parseTime(time)
			},
			navToEdit() {
				uni.navigateTo({
					url: './edit'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.btn {
		margin: 15px;
	}
</style>
