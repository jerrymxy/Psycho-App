let storageKey = "settings";

// 存储的数据
let storageData = uni.getStorageSync(storageKey) || {}

const settings = {
	get: function(key) {
		return storageData[key] || "";
	},
	set: function(key, value) {
		let tmp = uni.getStorageSync(storageKey);
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		uni.setStorageSync(storageKey, tmp);
	},
	remove: function(key) {
		delete storageData[key]
		uni.setStorageSync(storageKey, storageData)
	},
	clean: function() {
		uni.removeStorageSync(storageKey)
	},
	hasKey: function(key) {
		return storageData.hasOwnProperty(key);
	}
}

export default settings;
