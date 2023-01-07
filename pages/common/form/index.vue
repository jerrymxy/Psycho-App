<template>
	<view class="container">
		<!-- Todo: 暂时还不能正常加载表单 -->
		<form @submit="submit" @reset="formReset">

			<view class="uni-form-item uni-column" v-for="(item, index) in dynamicList" :key="item.qid">
				<uni-card :is-shadow="false" is-full>
					<view class="title">{{item.title}}</view>
					<radio-group v-if="item.type === 'radio'" :name="item.qid.toString()">
						<view v-for="(option, index) in item.options" :key="option.value">
							<radio class="option-label" :value="option.value.toString()" /><text>{{option.text}}</text>
						</view>
					</radio-group>
					<checkbox-group v-if="item.type === 'checkbox'" :name="item.qid.toString()">
						<view v-for="(option, index) in item.options" :key="option.value">
							<checkbox class="option-label" :value="option.value.toString()" /><text>{{option.text}}</text>
						</view>
					</checkbox-group>
					<view v-if="item.type === 'textarea'">
						<textarea class="uni-input form-input" :name="item.qid.toString()" placeholder="" />
					</view>
				</uni-card>
			</view>
			<button class="btn-submit" type="primary" form-type="submit">提交</button>
		</form>

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
	
	function sendData(url, sid, saveData) {
		return request({
			url: url,
			method: "POST",
			data: {
				sid: sid,
				saveData: saveData
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
				saveData: {},
				dynamicRules: {}
			}
		},
		methods: {
			submit(e) {
				this.saveData = e.detail.value;
				console.log(this.saveData);
				sendData("/measure/getContent", this.formId, this.saveData).then(res => {
					// Todo: 成功提示
					uni.navigateBack();
				})
			}
		},
		onLoad(options) {
			this.formId = options.surveyId;
			this.formTitle = options.formTitle;
			console.log(this.formId);
			uni.showLoading({
				title: "正在加载"
			});
			getFormData("/measure/getContent", options.surveyId).then(res => {
				console.log(res);
				this.dynamicList = res;
				uni.hideLoading();
			});
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

	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.option-label {
		/* display: block; */
		margin-top: 5px;
	}

	.form-input {
		/* background-color: #f1f1f1; */
		border: 1px solid gray;
		border-radius: 5px;
		width: 100%;
	}
</style>
