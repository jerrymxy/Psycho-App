<template>
	<view>
		<uni-collapse ref="collapse" accordion>
			<uni-collapse-item v-for="(item, index) in scaleList" :key="item.scaleId" :title="item.scaleName">
				<view class="content">
					<uni-section title="描述" :sub-title="item.description">
						<!-- <text class="text">{{item.description}}</text> -->
					</uni-section>
					<uni-section title="问题数量" :sub-title="item.questionNum">
						<!-- <text class="text">{{item.questionNum}}</text> -->
					</uni-section>
					<uni-section title="限时" :sub-title="calculatedTime(item.assessmentTime)">
						<!-- <text class="text">{{calculatedTime(item.assessmentTime)}}</text> -->
					</uni-section>
				</view>
				<view>
					<view class="collapse-content" style="margin: 0 15px 15px 15px;">
						
						<button v-if="item.isComplete" class="mini-btn" type="primary" size="mini" @tap="navToResult(item)">查看结果</button>
						<button v-else class="mini-btn" type="primary" size="mini" @tap="handleEnter(item)">进入测评</button>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import request from "@/utils/request.js";

	function getList(query) {
		return request({
			url: "/survey/app/scale-infos",
			method: "GET",
			params: query
		});
	};

	export default {
		data() {
			return {
				planId: 0,
				scaleList: [],
			}
		},
		methods: {
			handleEnter(item) {

			},
			navToResult(item) {
				this.$tab.navigateTo('./result?scaleId=' + item.scaleId + '&planId=' + item.planId);
			}

		},
		computed: {
			//计算时间
			calculatedTime() {
				return seconds => {
					let minutes = parseInt(seconds / 60);
					let leftSec = seconds % 60;
					if (leftSec === 60) {
						return minutes.toString() + "分钟";
					} else {
						return minutes.toString() + "分钟" + leftSec.toString() + "秒";
					}
				};
				
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: "加载中",
			});
			this.planId = options.planID;
			uni.setNavigationBarTitle({
				title: options.planName
			});
			console.log(options);
			let query = {
				planId: this.planId
			};
			getList(query).then(res => {
				this.scaleList = res.data;
				uni.hideLoading();
			});
		}
	}
</script>

<style lang="scss">
	.empty-tip {
		display: flex;
		margin: 10px;
	}

	.content {
		padding: 0 5px 5px 5px;
		
		.text {
			color: #909399;
		}
	}
</style>