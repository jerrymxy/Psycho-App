<template>
	<view>
		<uni-notice-bar v-if="notice" show-icon :text="notice" />
		<uni-card is-full :is-shadow="false" v-if="surveyList.length < 1">
			<text class="uni-h6">您已经填完所有的测评计划啦，去试试别的功能吧</text>
		</uni-card>
		<uni-list>
			<uni-list-item v-for="(item, index) in surveyList" :key="item.planId" :title="item.planName"
				:note="'截止时间：' + item.endTime + '\n已完成：' + item.completeNum + '/' + item.scaleNum" clickable showArrow
				@click="dialogToggle(item)" />
		</uni-list>

		<view>
			<!-- 提示窗 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="info" cancelText="取消" confirmText="同意" title="知情同意书" :content="selectedInformedConsent"
					@confirm="dialogConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import request from "@/utils/request.js";

	function getList(query) {
		return request({
			url: "/survey/app/user-plan-infos",
			method: "GET",
			// params: query
		});
	};

	export default {
		data() {
			return {
				notice: "公告占位",
				surveyList: [],
				selectedInformedConsent: "",
				selectedPlanID: 0,
				selectedPlanName: ""
			}
		},
		methods: {
			dialogConfirm() {
				console.log(this.selectedPlanID);
				uni.navigateTo({
					url: "./scales?planId=" + this.selectedPlanID + "&planName=" + this.selectedPlanName,
				});
				
			},
			dialogToggle(item) {
				this.selectedInformedConsent = item.informedConsent;
				this.selectedPlanID = item.planId;
				this.selectedPlanName = item.planName;
				this.$refs.alertDialog.open();
			},

		},
		computed: {

		},
		onLoad() {
			uni.showLoading({
				title: "加载中",
			});
			// 请求测评计划
			getList().then(response => {
				this.surveyList = response.data;
				// console.log(response);
				uni.hideLoading();
			});
		}
	}
</script>

<style>
	.empty-tip {
		display: flex;
		margin: 10px;
	}
</style>