<template>
	<view>
		<!-- 因子部分 -->
		<view>
			<uni-section class="mb-10" title="因子" type="line">
				<uni-collapse>
					<uni-collapse-item v-for="(item, index) in factors" :key="index" titleBorder="auto">
						<template v-slot:title>
							<uni-list :border="false">
								<uni-list-item :title="item.factor">
									<template v-slot:footer>
										<uni-tag :inverted="true" :circle="true" :text="item.score" type="primary" />
									</template>
								</uni-list-item>
							</uni-list>
						</template>
						<view class="content">
							<text class="text">{{item.explanation}}</text>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</uni-section>
		</view>

		<!-- 基本信息部分 -->
		<view>
			<uni-section v-if="planName" class="mb-10" title="基本信息" type="line">
				<uni-list>
					<uni-list-item title="测试计划" :rightText="planName" />
					<uni-list-item title="量表" :rightText="scaleName" />
					<uni-list-item title="提交时间" :rightText="submitTime" />
					<uni-list-item title="用时" :rightText="timeSpent" />
					<uni-list-item title="答题记录" showArrow link="navigateTo" to="../common/form/index"/>
				</uni-list>
			</uni-section>
			<!-- <uni-section v-if="scaleName" class="mb-10" title="量表" :sub-title="scaleName" type="circle">
			</uni-section>
			<uni-section v-if="submitTime" class="mb-10" title="测评时间" :sub-title="submitTime" type="circle">
			</uni-section>
			<uni-section v-if="timeSpent" class="mb-10" title="用时" :sub-title="timeSpent" type="circle">
			</uni-section> -->
		</view>

	</view>
</template>

<script>
	import request from "@/utils/request.js";
	
	function getList(query) {
		return request({
			url: "/survey/app/report",
			method: "GET",
			params: query
		});
	};
	
	
	export default {
		data() {
			return {
				planId: 0,
				scaleId: 0,
				planName: "测试计划001",
				scaleName: "症状自评量表SCL90",
				submitTime: "2023-01-01 00:00",
				timeSpent: "2分35秒",
				factors: [{
					factor: "总症状指数",
					score: "3.7",
					explanation: "总的来看，被试的自我症状评价介于“没有”到“严重”的哪一个水平。总症状指数的分数在1～1.5之间，表明被试自我感觉没有量表中所列的症状；在1.5～2.5之间，表明被试感觉有点症状，但发生得并不频繁；在2.5～3.5之间，表明被试感觉有症状，其严重程度为轻到中度；在3.5～4.5之间，表明被试感觉有症状，其程度为中到严重；在4.5～5之间表明被试感觉有，且症状的频度和强度都十分严重"
				}, {
					factor: "躯体化",
					score: "37",
					explanation: "该分量表的得分在12-60分之间。得分在36分以上，表明个体在身体上有较明显的不适感，并常伴有头痛、肌肉酸痛等症状。得分在24分以下，躯体症状表现不明显。总的说来，得分越高，躯体的不适感越强；得分越低，症状体验越不明显。"
				}, ],

			}
		},
		onLoad(options) {
			this.$modal.loading("加载中");
			let query = {
				planId: options.planId,
				scaleId: options.scaleId
			}
			getList(query).then(res => {
				this.planName = res.data.planName;
				this.scaleName = res.data.scaleName;
				this.submitTime = res.data.submitTime;
				this.timeSpent = res.data.timeSpent;
				this.factors = res.data.factors;
			});
			this.$modal.closeLoading();
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		// background-color: white;
	}

	.mb-10 {
		margin-bottom: 10px;
	}

	.decoration {
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: $uni-success;
	}

	.content {
		padding: 15px;
	}

	.text {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}
</style>