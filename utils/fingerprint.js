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
				// console.log(err);
				return false;
			}
		})
	},
	// 检查是否录入指纹生物信息
	checkIsEnabled() {
		uni.checkIsSoterEnrolledInDevice({
			checkAuthMode: 'fingerPrint',
			success(res) {
				// console.log(res);
				return res.isEnrolled;
			},
			fail(err) {
				// console.log(err);
				return false;
			}
		})
	},
	// 开始指纹识别
	startAuth(challengeMsg) {
		uni.startSoterAuthentication({
			requestAuthModes: ['fingerPrint'],
			challenge: challengeMsg || '000000',
			authContent: '请验证指纹',
			success(res) {
				// console.log(res);
				if (res.errCode === 0) {
					uni.showToast({
						title: "验证成功",
					});
					return true;
				} else {
					uni.showToast({
						title: res.errMsg,
					});
					return false;
				}
			},
			fail(err) {
				// console.log(err);
				return false;
			}
		})
	}
}

export default fingerPrint;