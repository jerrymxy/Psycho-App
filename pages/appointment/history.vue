<template>
	<view>
		<!-- <uni-card :isFull="true" :isShadow="false">
			<text class="uni-body">。。。</text>
		</uni-card> -->
<!-- 		<view class="test">
			<button @click="forceUpdate">test</button>
		</view> -->
		<view v-if="false" class="date-picker">
			<uni-datetime-picker v-model="range" type="daterange" @change="change" @maskClick="maskClick" />
		</view>
		<view v-if="refresh">
			<view v-for="(item, index) in list" :key="index">
				<uni-card :isFull="false" :is-shadow="false">
					<uni-title type="h4" title="咨询师"></uni-title>
					<text>{{item.consultantName}}</text>
					<uni-title type="h4" title="预约时间"></uni-title>
					<text>{{item.schedule.date}} {{item.appointTime.startTime}}-{{item.appointTime.endTime}}</text>
					<uni-title type="h4" title="咨询地点"></uni-title>
					<text>{{item.room.name}}</text>
					<text>{{item.room.address}}</text>
					<view class="tag-view" v-if="item.canceled">
						<uni-tag text="已取消" />
					</view>
					<!-- 判断时间 -->
					<view v-else-if="Date.parse(item.schedule.date +' ' + item.appointTime.startTime) > new Date"
						class="tag-view">
						<button type="default" size="mini" @click="handleCancel(item.id)">取消预约</button>
					</view>
			
				</uni-card>
			</view>
		</view>
		
	</view>
</template>

<script>
	import request from "@/utils/request.js";

	function getHistory(startDate, endDate) {
		return request({
			url: "/appoint/ment/my-history",
			method: "GET",
			// param: {
			// 	// startDate: startDate,
			// 	// endDate: endDate
			// }
		});
	};

	function cancelAppointment(id) {
		return request({
			url: "/appoint/ment/cancel",
			method: "PUT",
			data: {
				id: id
			}
		});
	};

	export default {
		data() {
			return {
				range: [],
				list: [],
				refresh: true
			}
		},
		// watch: {
		// 	list: {
		// 		deep: true,
		// 		handler(val) {
					
		// 		}
		// 	}
		// },
		methods: {
			forceUpdate() {
				this.$forceUpdate();				
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			change(e) {
				this.single = e
				console.log('change事件:', this.single = e);
				getHistory(this.range[0], this.range[1]).then(res => {
					this.list = res;
				});
			},
			handleCancel(id) {
				this.$modal.confirm('确定取消预约吗？').then(() => {
					cancelAppointment(id).then(() => {
						uni.showLoading({
							title: "请稍等"
						});
						getHistory().then(res => {
							this.list = res.data.list;
							this.forceUpdate();
							uni.hideLoading();
						});
					});
				})

			}
		},
		onLoad() {
			// 设置日期
			// let curDate = new Date();
			// this.range = [curDate.setMonth((curDate.getMonth() - 1)), new Date()];
			getHistory().then(res => {
				this.list = res.data.list;

			});

		}
	}
</script>

<style>
	.date-picker {
		margin: 15px;
	}

	.tag-view {
		margin-top: 10px;
		/* text-align: right; */
	}
</style>
