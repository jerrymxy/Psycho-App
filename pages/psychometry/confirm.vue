<template>
	<view>
		<uni-card :is-shadow="false" is-full>
			<text class="uni-body">在开始测评前，请仔细阅读下方的知情同意书。</text>
		</uni-card>
		<uni-card :is-shadow="false" is-full>
			<u-parse :content="agreementContent"></u-parse>
		</uni-card>
		<uni-card class="agreement-check" :is-shadow="false" is-full>
			<checkbox-group @change="checkboxChange">
				<label>
					<checkbox value="cb" :checked="state" />我已阅读并同意以上内容
				</label>
			</checkbox-group>
			<button style="margin-top: 10px;" type="primary" :disabled="btnDisabled" @click="goSurvey">开始测评</button>
		</uni-card>
	</view>
</template>

<script>
	// uParse 富文本解析组件
	import uParse from "@/components/u-parse/u-parse.vue";
	import request from "@/utils/request.js";
	
	export function getContent(query) {
		return request({
			url: "/measure/getConfirm",
			method: "GET",
			param: query.sid,
		});
	};

	export default {
		components: {
			uParse,
		},
		data() {
			return {
				state: false,
				// Todo: 获取知情同意书
				agreementContent: "<div>我是HTML代码</div>",
				sid: "",
			}
		},
		methods: {
			checkboxChange() {
				this.state = !this.state;
			},
			goSurvey() {
				uni.navigateTo({
					url: "/pages/common/form/index?surveyId=" + this.surveyId
				});
			}
		},
		computed: {
			btnDisabled() {
				return !this.state;
			}
		},
		onLoad(options) {
			// 获取上一页传来的id
			console.log(options.sid);
			this.sid = options.sid;
			uni.showLoading({
				title: "加载中"
			});
			getContent(options.sid).then(response => {
				this.agreementContent = response;
				uni.hideLoading();
			});
		}
	}
</script>

<style>

</style>
