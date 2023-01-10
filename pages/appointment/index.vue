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
			<view v-for="(person, index) in mergedList" :key="person.id">
				<uni-group :title="person.name" mode="card">

					<!-- <button class="mini-btn" v-for="(item, index) in person.timeRange" :key="item.tid" type="default"
						size="mini" :disabled="item.availability" @click="handleAmpt(person, item.tid)">
						{{item.startTime}}-{{item.endTime}}
					</button> -->

					<view class="tag-view">
						<template v-for="item in person.languageIds">
							<uni-tag class="tag" type="primary" :text="languages[item]" inverted></uni-tag>
						</template>

						<template v-for="item in person.themeIds">
							<uni-tag class="tag" type="default" :text="themes[item]" inverted></uni-tag>
						</template>
					</view>

					<view>
						<text>{{person.introduction}}</text>
					</view>

					<view>
						<uni-collapse>
							<uni-collapse-item v-for="item in person.schedules" :key="item.id" :show-animation="true"
								:disabled="item.appointStatus !== 0" :title="item.startTime + ' - ' + item.endTime">
								<!-- <template v-slot:title>
									<uni-section class="mb-10" :title="item.startTime + ' - ' + item.endTime"
										type="circle"></uni-section>
								</template> -->
								<view class="collapse-content">
									<uni-title type="h4" title="咨询室"></uni-title>
									<text class="text">{{item.roomName}}</text>
									<uni-title type="h4" title="位置"></uni-title>
									<text class="text">{{item.roomAddress}}</text>
								</view>
								<view class="collapse-content" style="margin: 10px;">
									<button class="mini-btn" type="primary" size="mini"
										@tap="handleAppoint(item.id)">预约</button>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</view>
				</uni-group>
			</view>

		</view>
	</view>
</template>

<script>
	import request from "@/utils/request.js";
	import {
		parseTime
	} from "@/utils/ruoyi.js";
	import {
		THEME,
		LANGUAGE
	} from "@/utils/temp_dict.js";
	// import storage from "@/utils/storage.js";

	function getSingleList(query) {
		return request({
			// url: "/appoint/getAppointList",
			url: "/appoint/calendar/get-single-day",
			method: "GET",
			params: query
		});
	}


	export default {
		data() {
			return {
				notice: "公告",
				datePicked: "",
				scheduleList: [],
				consultantList: [],
				mergedList: [],
				themes: THEME,
				languages: LANGUAGE
			}
		},
		methods: {
			handleAppoint(scheduleId) {
				uni.navigateTo({
					url: "./confirm?scheduleId=" + scheduleId,

				})
			},
			processConsultantTime() {
				// let scheduleList = storage.get("schedules");
				// console.log(scheduleList);
				this.mergedList = [];
				for (let person of this.consultantList) {
					let pid = person.id;
					let arr = [];
					for (let item of this.scheduleList) {
						if (item.consultantId === pid) {
							arr.push(item);
						}
					}
					let tmp = {
						schedules: arr
					};
					let obj = {
						...person,
						...tmp
					};
					this.mergedList.push(obj);
				}

			},
		},
		watch: {
			datePicked: {
				handler(newVal) {
					let query = {
						date: newVal
					};
					getSingleList(query).then(res => {
						// console.log(res.data);
						this.scheduleList = res.data.schedules;
						// storage.set("schedules", res.data.schedules);
						uni.setStorageSync("schedules", res.data.schedules);
						uni.setStorageSync("consultants", res.data.consultants);
						this.consultantList = res.data.consultants;
						this.processConsultantTime();
						// console.log(this.consultantList);
						// console.log(this.scheduleList);
						uni.hideLoading();
					});
				}
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: "加载中",
			});
			this.datePicked = parseTime(Date.now(), "{y}-{m}-{d}");
			if (options.id) {
				query.uid = options.id
			}

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
		// font-size: 20rpx;
		// margin-left: 20px;
	}

	.collapse-content {
		margin-left: 10px;
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
		margin: 9px;
	}

	.mini-btn {
		margin-right: 5px;
		width: fit-content;
	}

	.tag {
		margin-right: 3px;
		margin-bottom: 5px;
		display: inline-block;
	}

	.tag-view {
		margin-bottom: 5px;
	}
</style>
