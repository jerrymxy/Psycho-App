<template>
	<view>
		<view>
			<uni-group title="预约信息" margin-top="20">
				<uni-section class="mb-10" title="咨询师" type="line">
					<text class="body">{{person.name}}</text>
				</uni-section>
				<uni-section class="mb-10" title="预约时间" type="line">
					<text class="body">{{schedule.date}} {{schedule.startTime}} - {{schedule.endTime}}</text>
				</uni-section>
				<uni-section class="mb-10" title="咨询室" type="line">
					<text class="body">{{schedule.roomName}}</text>
				</uni-section>
				<uni-section class="mb-10" title="咨询地点" type="line">
					<!-- <text class="body">{{schedule.roomName}}</text> -->
					<text class="body">{{schedule.roomName}}</text>
				</uni-section>
			</uni-group>

			<uni-group title="预约问卷" margin-top="20">
				<view>
					<text class="questions">咨询经历：</text>
					<uni-easyinput type="textarea" v-model="surveyQuestions.consultHistory" placeholder="">
					</uni-easyinput>
				</view>
				<view>
					<text class="questions">是否患（或曾患有）任何躯体疾病？（手术，慢性疾病等，请标明时间）</text>
					<uni-easyinput type="textarea" v-model="surveyQuestions.diseaseHistory" placeholder="">
					</uni-easyinput>
				</view>
				<view>
					<text class="questions">你现在需要接受帮助的主要问题是什么？</text>
					<uni-easyinput type="textarea" v-model="surveyQuestions.currentProblem" placeholder="">
					</uni-easyinput>
				</view>
				<view>
					<text class="questions">近半年里，是否发生了对你有重大意义的事情？（如亲友的死亡、法律诉讼、失恋等）</text>
					<uni-easyinput type="textarea" v-model="surveyQuestions.recentEvent" placeholder="">
					</uni-easyinput>
				</view>
				<view>
					<text class="questions">在你的成长经历中，是否有对你来说有特殊意义的事情？</text>
					<uni-easyinput type="textarea" v-model="surveyQuestions.specialEvent" placeholder="">
					</uni-easyinput>
				</view>
				<view>
					<text class="questions">你希望心理咨询能够帮助你达到什么样的目标？</text>
					<uni-easyinput type="textarea" v-model="surveyQuestions.target" placeholder=""></uni-easyinput>
				</view>
				<view>
					<text class="questions">其他你认为对咨询可能有帮助的事情？</text>
					<uni-easyinput type="textarea" v-model="surveyQuestions.otherInfo" placeholder=""></uni-easyinput>
				</view>
			</uni-group>
		</view>

		<view class="survey">

		</view>

		<view>
			<button class="btn-submit" type="primary" :loading="loading" @click="submit"
				:disabled="disabled">提交预约</button>
			<button class="btn-submit" type="default" @click="navigateBack">我再想想</button>
		</view>
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
					id: "",
					date: "",
					startTime: "",
					endTime: "",
					roomName: "",
					roomAddress: ""
				},
				surveyQuestions: {
					consultHistory: "",
					diseaseHistory: "",
					currentProblem: "",
					recentEvent: "",
					specialEvent: "",
					target: "",
					otherInfo: ""
				},
				loading: false,
				disabled: false
			}
		},
		methods: {
			navigateBack() {
				uni.navigateBack();
			},
			sendRequest() {
				return request({
					url: "/appoint/ment/create",
					method: "POST",
					data: {
						scheduleId: this.schedule.id,
						studentUid: this.$store.state.user.id,
						application: this.surveyQuestions
					}
				});
			},
			submit(e) {
				// Todo
				this.loading = true;

				console.log(this.surveyQuestions);
				console.log(this.$store.state.user.id);
				this.sendRequest().then(res => {
					console.log(res);
					uni.redirectTo({
						url: "/pages/appointment/history"
					});
				});
			}
		},
		onLoad(options) {
			// console.log(options.scheduleId);
			console.log(this.$store.state.user.id);
			if (options.scheduleId) {
				let schedules = uni.getStorageSync("schedules");
				let scheduleId = parseInt(options.scheduleId);
				for (let item of schedules) {
					// console.log(item.id);
					if (scheduleId === item.id) {
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
				console.log(this.schedule.id);
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
