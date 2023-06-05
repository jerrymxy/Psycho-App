<template>
	<view class="container">
		<!-- Todo: 等后端接口完成后完成表单提交功能 -->
		<view class="form">
			<uni-forms ref="dynamicForm" :rules="dynamicRules" :modelValue="dynamicFormData" label-position="top">
				<uni-forms-item label-position="top" label-width="375" v-for="(item, index) in dynamicLists" :key="item.id"
					:label="index + 1 + '. ' + item.label" :required="item.required" :name="'domains[' + item.question_id + ']'">
					<uni-data-checkbox v-model="item.value" :localdata="item.options"></uni-data-checkbox>
				</uni-forms-item>
			</uni-forms>
			<button class="btn-submit" @click="submit">
				提交
			</button>
		</view>
	</view>
</template>

<script>
	import request from "@/utils/request.js";

	function getFormData(url, sid) {
		return request({
			url: url,
			method: "GET",
			param: {
				scaleId: sid,
			}
		});
	};

	function sendData(url, sid, saveData) {
		return request({
			url: url,
			method: "POST",
			data: {
				scaleId: sid,
				options: saveData
			}
		});
	};

	export default {
		data() {
			return {
				formTitle: "",
				detail: {}, //后端返回数据
				// 自定义表单校验规则
				dynamicRules: {
					// 这里随便写一个,不然会报错

				},
				dynamicFormData: {},
				dynamicLists: []
			}
		},
		methods: {
			// 获取表单
			async getForm(scaleId) {
				const res = await getFormData("/api/scale/getScaleDetail", scaleId);
				// console.log(res.data, "表单");
				this.detail = res.data;
				for (let i = 0; i < this.detail.questions.length; i++) {
					let tmp_o = [];
					for (let j = 0; j < this.detail.options.length; j++) {
						if (this.detail.options[j].question_id === this.detail.questions[i].question_id) {
							let new_opt = {
								text: this.detail.options[j].option_content,
								value: this.detail.options[j].option_id
							}

							tmp_o.push(new_opt);
						}
					}
					this.dynamicLists.push({
						label: this.detail.questions[i].content,
						value: "",
						required: this.detail.questions[i].is_required === '1' ? true : false,
						id: this.detail.questions[i].question_id,
						options: tmp_o,
					});
				}
				// console.log(this.dynamicLists, "处理数据");
			},
			// Todo
			submit(e) {
				// this.saveData = e.detail.value;
				// console.log(this.saveData);
				// sendData("/measure/getContent", this.formId, this.saveData).then(res => {
				// 	// Todo: 成功提示
				// 	uni.navigateBack();
				// })
				// Todo
				this.$modal.msg("待完善");
			},
			// 将选项放入问题列表中
			handleOptions() {
				for (opt in this.optionsList) {
					opt["text"] = opt["option_content"];
					opt["value"] = opt["option_id"];
					for (question in this.dynamicList) {
						if (question.question_id === opt.question_id) {
							if (question["options"]) {
								question["options"].push(opt);
							} else {
								question["options"] = [opt];
							}
						}

					}
				}
			}
		},
		onLoad(options) {
			if (options.type === 1) {
				// 查看结果
			} else {
				// 填写表单
				this.getForm(options.scaleId);
			}
			
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.detail.baseInfo.name || "表单页"
			});
		}
	}
</script>

<style>
	.form {
		padding: 15px;
		background-color: #fff;
	}

	.btn-submit {
		margin: 10px;
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