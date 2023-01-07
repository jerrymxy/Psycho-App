<template>
	<view>
		<uni-card :title="name" :isFull="true" :sub-title="introduction" :thumbnail="avatar">
			<uni-section class="mb-10" title="预约时间" type="line">
				<text class="body">{{date}} {{startTime}} - {{endTime}}</text>
			</uni-section>
			<uni-section class="mb-10" title="咨询地点" type="line">
				<text class="body">{{location}}</text>
			</uni-section>
		</uni-card>
		<button class="btn-submit" type="primary" :loading="loading" @click="submit">提交预约</button>
		<button class="btn-submit" type="default" @click="navigateBack">我再想想</button>
	</view>
</template>

<script>
	import request from "@/utils/request.js";

	function getSurvey() {
		return request({
			url: "/appoint/getSurvey",
			method: "GET",
		});
	}

	export default {
		data() {
			return {
				uid: 1,
				avatar: "",
				name: "xxx",
				introduction: "xxx",
				tid: 1,
				date: "2023-01-01",
				startTime: "8:00",
				endTime: "9:00",
				location: "燕园校区新太阳学生中心313室",
				loading: false
			}
		},
		methods: {
			navigateBack() {
				uni.navigateBack();
			},
			submit(e) {
				// Todo
				this.loading = true;
				getSurvey().then(res => {
					if (res.required) {
						uni.navigateTo({
							url: "/pages/common/form/index"
						});
					} else {
						// 解决异步问题
						const req = request({
							url: "/appoint/submit",
							method: "POST",
							data: {
								uid: this.uid,
								date: this.date,
								timeId: this.tid
							}
						});
						req.then(res => {
							// uni.redirectTo({
							// 	url: "/pages/appointment/history"
							// });
						});
					}
				});
			}
		},
		onLoad(options) {
			if (options.person && options.tid) {
				this.uid = options.person.uid;
				this.avatar = options.person.avatar;
				this.name = options.person.name;
				this.introduction = options.person.introduction;
				for (let item in options.person.timeRange) {
					if (item.tid === options.tid) {
						this.tid = options.tid;
						this.date = item.date;
						this.startTime = item.startTime;
						this.endTime = item.endTime;
						this.location = item.location;
						break;
					}
				}
			} else {
				uni.showToast({
					title: "无参数，请重试",
					icon: "error"
				});
			}

		},
	}
</script>

<style>
	.body {
		margin-left: 20px;
	}

	.btn-submit {
		margin: 20px;
	}
</style>
