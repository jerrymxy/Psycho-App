<template>
	<view class="container">
		<!-- Todo: 暂时还不能正常加载表单 -->
		<uni-forms ref="dynamicForm" :modelValue="dynamicFormData" :rules="dynamicRules">
			<uni-forms-item v-for="(item, index) in dynamicList" :key="item.qid" :label="item.title"
				:required="item.required" :rules="item.rules">
				<!-- 单选框 -->
				<uni-data-checkbox v-if="item.type === 'radio'" v-model="item.value" :localdata="item.options">
				</uni-data-checkbox>
				<!-- 多选框 -->
				<uni-data-checkbox v-if="item.type === 'checkbox'" multiple v-model="item.options" :localdata="item.value">
				</uni-data-checkbox>
				<!-- 下拉框 -->
				<uni-data-select v-if="item.type === 'select'" v-model="item.options" :localdata="item.value">
				</uni-data-select>
				<!-- 输入框 -->
				<uni-easyinput v-if="item.type === 'input'" v-model="item.options"></uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<button class="btn-submit" type="primary" @click="submit">提交</button>
	</view>
</template>

<script>
	import request from "@/utils/request.js";

	function getFormData(url, sid) {
		return request({
			url: url,
			method: "GET",
			param: {
				sid: sid,
			}
		});
	};

	export default {
		data() {
			return {
				formId: "",
				// Todo: 获取表单标题
				formTitle: "xxx",
				dynamicList: [],
				dynamicFormData: {},
			}
		},
		methods: {
			submit() {
				// Todo: 上传表单数据
				uni.showToast({
					title: "未完成"
				})
			}
		},
		onLoad(options) {
			this.formId = options.surveyId;
			console.log(this.formId);
			uni.showLoading({
				title: "正在加载"
			});
			getFormData("/measure/getContent", options.surveyId).then(res => {
				dynamicList = res;
			})
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.formTitle
			});
		}
	}
</script>

<style>
	.btn-submit {
		margin: 20px;
	}
</style>
