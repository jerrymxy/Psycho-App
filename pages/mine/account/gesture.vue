<template>
	<view class="uni-list">
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">启用手势认证</view>
			<switch checked />
		</view>
		<view class="uni-list-cell uni-list-cell-pd">
			<view class="uni-list-cell-db">修改手势图案</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEnabled: false,
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
