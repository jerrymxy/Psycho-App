const fingerPrint = {
	// 检查设备是否支持指纹识别
	checkIsSupport() {
		uni.checkIsSupportSoterAuthentication({
			success(res) {
				if (res.supportMode.includes("fingerPrint")) {
					return true;
				} else {
					return false;
				}
			},
			fail(err) {
				console.log(err);
				return false;
			}
		})
	},
	// 检查是否录入指纹生物信息
	checkIsEnabled() {
		uni.checkIsSoterEnrolledInDevice({
			checkAuthMode: 'fingerPrint',
			success(res) {
				console.log(res);
				return res.isEnrolled;
			},
			fail(err) {
				console.log(err);
				return false;
			}
		})
	},
	// 开始指纹识别
	startAuth() {
		uni.startSoterAuthentication({
			requestAuthModes: ['fingerPrint'],
			challenge: '000000',
			authContent: '请验证指纹',
			success(res) {
				console.log(res);
			},
			fail(err) {
				console.log(err);
			},
			complete(res) {
				console.log(res);
			}
		})
	}
}