<template>
	<view>
		<!-- <uni-card :isFull="true" :isShadow="false">
			<text class="uni-body">。。。</text>
		</uni-card> -->
		<view class="date-picker">
			<uni-datetime-picker v-model="range" type="daterange" @change="change" @maskClick="maskClick" />
		</view>
		<view v-for="(item, index) in list" :key="index">
			<uni-card :isFull="false" :is-shadow="false">
				<uni-title type="h4" title="咨询师"></uni-title>
				<text>{{item.consultantName}}</text>
				<uni-title type="h4" title="预约时间"></uni-title>
				<text>{{item.schedule.date}} {{item.appointTime.startTime}}-{{item.appointTime.endTime}}</text>
				<uni-title type="h4" title="咨询地点"></uni-title>
				<text>{{item.room.name}}</text>
				<text>{{item.room.address}}</text>
				<!-- 判断时间 -->
				<view v-if="Date.parse(item.date +' ' + item.startTime) > new Date" class="cancel-btn">
					<button type="default" size="mini" @click="handleCancel">取消预约</button>
				</view>

			</uni-card>
		</view>
	</view>
</template>

<script>
	import request from "@/utils/request.js";

	function getHistory(startDate, endDate) {
		return request({
			url: "appoint/ment/my-history",
			method: "GET",
			// param: {
			// 	// startDate: startDate,
			// 	// endDate: endDate
			// }
		});
	};

	function cancelAppointment(aid) {
		return request({
			url: "/appoint/cancel",
			method: "POST",
			data: {
				aid: aid
			}
		});
	};

	export default {
		data() {
			return {
				range: [],
				list: [{
					uid: 1,
					aid: 1,
					name: "aaa",
					date: "2023-01-06",
					startTime: "8:00",
					endTime: "9:00",
					location: "燕园校区新太阳学生中心313室"
				}]
			}
		},
		methods: {
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
			handleCancel(e) {
				cancelAppointment(aid).then(res => {
					getHistory(this.range[0], this.range[1]).then(res => {
						this.list = res;
					});
				});
			}
		},
		onLoad() {
			// 设置日期
			let curDate = new Date();
			this.range = [curDate.setMonth((curDate.getMonth() - 1)), new Date()];
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

	.cancel-btn {
		margin-top: 10px;
		/* text-align: right; */
	}
</style>
