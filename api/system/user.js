import upload from '@/utils/upload'
import request from '@/utils/request'

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
	const data = {
		oldPassword,
		newPassword
	}
	return request({
		url: '/system/user/profile/update-password',
		method: 'PUT',
		params: data
	})
}

// 查询用户个人信息
export function getUserProfile() {
	return request({
		url: '/system/user/profile/get',
		method: 'GET'
	})
}

// 临时查询学生信息
// Todo: 改成跟userInfo一起返回
export function getStudentInfo(uid) {
	return request({
		url: '/system/student-searcher/get',
		method: 'GET',
		params: {
			uid: uid
		}
	});
}

// 修改用户个人信息
export function updateUserProfile(data) {
	return request({
		url: '/system/user/profile/update',
		method: 'PUT',
		data: data
	})
}

// 用户头像上传
export function uploadAvatar(data) {
	return upload({
		url: '/system/user/profile/update-avatar',
		method: 'PUT',
		name: data.name,
		filePath: data.filePath
	})
}
