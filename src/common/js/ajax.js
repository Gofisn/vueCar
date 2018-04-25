import axios from 'axios'

// 首页数据
export function getHomeData(data,callback) {
	let url=process.env.API_HOST+'stream/api/news/feed/web/v47/';
	axios.get(url,{params:data}).then((res)=>{
		callback(res.data)
	})
}
// 首页详情
export function getHomeDetail(data,callback) {
	let url=process.env.API_HOST+'m/article/detail';
	axios.get(url,{params:data}).then((res)=>{
		callback(res.data)
	})
}
// 车友圈
export function getSelectData(data,callback) {
	let url=process.env.API_HOST+'brand/m/v1/brand/';
	axios.get(url,{params:data}).then((res)=>{
		callback(res.data)
	})
}

// 车友圈
export function getBrandList(data,callback) {
	let url=process.env.API_HOST+'brand/m/v1/series/';
	axios.get(url,{params:data}).then((res)=>{
		callback(res.data)
	})
}