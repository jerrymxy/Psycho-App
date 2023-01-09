<template>
	<view>
		<uni-card :title="person.name" :isFull="true" :sub-title="person.introduction">
			<uni-section class="mb-10" title="预约时间" type="line">
				<text class="body">{{schedule.date}} {{schedule.startTime}} - {{schedule.endTime}}</text>
			</uni-section>
			<uni-section class="mb-10" title="咨询室" type="line">
				<text class="body">{{schedule.roomName}}</text>
			</uni-section>
			<uni-section class="mb-10" title="咨询地点" type="line">
				<text class="body">{{schedule.roomAddress}}</text>
			</uni-section>
		</uni-card>
		<button class="btn-submit" type="primary" :loading="loading" :disabled="disabled" @click="submit">提交预约</button>
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
				person: {
					id: "",
					name: "",
					introduction: ""
				},
				schedule: {
					scheduleId: "",
					date: "",
					startTime: "",
					endTime: "",
					roomName: "",
					roomAddress: ""
				},
				loading: false,
				disabled: false
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
			console.log(options.scheduleId);
			if (options.scheduleId) {
				let schedules = uni.getStorageSync("schedules");
				let scheduleId = parseInt(options.scheduleId);
				for (let item of schedules) {
					console.log(item.scheduleId);
					if (scheduleId === item.scheduleId) {
						this.schedule = item;
						
						let consultants = uni.getStorageSync("consultants");
						for (let person of consultants) {
							if (item.consultantId === person.id) {
								this.person = person;
								break;
							}
						}
						break;
					}
				}
			} else {
				uni.showToast({
					title: "无参数，请重试",
					icon: "error"
				});
				this.disabled = true;
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
