<template>
	<view>
		<uni-notice-bar v-if="notice" show-icon :text="notice" />
		<uni-card is-full :is-shadow="false" v-if="surveyList.length < 1">
			<text class="uni-h6">您已经填完所有的测评问卷啦，去试试别的功能吧</text>
		</uni-card>
		<uni-list>
			<uni-list-item v-for="(item, index) in surveyList" :key="item.sid" :title="item.title"
				:note="'截止时间：' + item.endDate + ' ' + item.endTime" clickable showArrow @click="goConfirm(item.sid)" />
		</uni-list>
	</view>
</template>

<script>
	import request from "@/utils/request.js";
	
	function getList(query) {
		return request({
			url: "/measure/getList",
			method: "GET",
			// params: query
		});
	};
	
	export default {
		data() {
			return {
				notice: "公告占位",
				surveyList: []
			}
		},
		methods: {
			goConfirm(sid) {
				uni.navigateTo({
					url: "./confirm?sid=" + sid,
				});
				console.log(sid);
			},
			
		},
		computed: {

		},
		onLoad() {
			uni.showLoading({
				title: "加载中",
			});
			getList().then(response => {
				this.surveyList = response;
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
