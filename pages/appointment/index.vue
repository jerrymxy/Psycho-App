<template>
	<view class="container">
		<!-- <view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" />
		</view> -->

		<uni-notice-bar v-if="notice" show-icon :text="notice" />

		<view class="content">

			<view class="date-picker">
				<uni-datetime-picker type="date" :clear-icon="false" v-model="datePicked" returnType="string"
					:start="Date.now()" />
			</view>
			<view v-for="(person, index) in list" :key="person.uid">
				<uni-card :title="person.name" :isFull="true" :sub-title="person.introduction"
					:thumbnail="person.avatar" :is-shadow="false">

					<button class="mini-btn" v-for="(item, index) in person.timeRange" :key="item.tid" type="default"
						size="mini" :disabled="item.availability" @click="handleAmpt(person, item.tid)">
						{{item.startTime}}-{{item.endTime}}
					</button>

				</uni-card>
			</view>

		</view>
	</view>
</template>

<script>
	import request from "@/utils/request.js";

	function getList(query) {
		return request({
			url: "/appoint/getAppointList",
			method: "GET",
			params: query
		});
	};

	export default {
		data() {
			return {
				notice: "公告",
				datePicked: Date.now(),
				list: [{
						uid: 1,
						name: "abc",
						introduction: "擅长情绪困扰、人际关系、职业生涯等议题",
						avatar: "",
						timeRange: [{
							tid: 0,
							startTime: "8:00",
							endTime: "9:00",
							availability: true
						}, {
							tid: 1,
							startTime: "9:00",
							endTime: "10:00",
							availability: false
						}, {
							tid: 2,
							startTime: "10:00",
							endTime: "11:00",
							availability: false
						}],
					},
					{
						uid: 2,
						name: "bbb",
						introduction: "擅长情绪困扰、人际关系、职业生涯等议题",
						timeRange: [{
							range: "8-9",
							availability: true
						}, {
							range: "9-10",
							availability: false
						}, {
							range: "8-9",
							availability: true
						}, {
							range: "9-10",
							availability: false
						}, {
							range: "8-9",
							availability: true
						}, {
							range: "9-10",
							availability: false
						}],

					},
				]
			}
		},
		methods: {
			handleAmpt(person, tid) {
				uni.navigateTo({
					url: "./confirm?person=" + person + "&tid=" + tid,

				})
				console.log(person, tid);
			},
		},
		watch: {
			datePicked: {
				handler(newVal) {
					let query = {
						date: newVal
					};
					getList(query).then(res => {
						this.list = res;
						uni.hideLoading();
					});
				}
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: "加载中",
			});
			let query = {};
			if (options.id) {
				query.uid = options.id
			}
			getList(query).then(res => {
				this.list = res;
				uni.hideLoading();
			});
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		// background-color: #fff;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	/* #endif */

	.text {
		text-align: center;
		font-size: 20rpx;
	}

	.content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		justify-content: center;
		align-items: center;
		// height: 150px;

		margin-top: 20px;
	}

	.uni-common-mt {
		margin-top: 20px;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		padding: 0px 30px;
	}

	.date-picker {
		margin: 10px;
	}

	.mini-btn {
		margin-right: 5px;
		width: fit-content;
	}
</style>
