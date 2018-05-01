import axios from 'axios'

// 首页数据
export function getNewsData(data, callback) {
  let url = process.env.API_HOST + 'stream/api/news/feed/web/v47/';
  axios.get(url, { params: data }).then((res) => {
    callback(res.data)
  })
}
// 首页详情
export function getNewsDetail(data, callback) {
  let url = process.env.API_HOST + 'm/article/detail';
  axios.get(url, { params: data }).then((res) => {
    callback(res.data)
  })
}
// 车友圈
export function getSelectData(data, callback) {
  let url = process.env.API_HOST + 'brand/m/v1/brand/';
  axios.get(url, { params: data }).then((res) => {
    callback(res.data)
  })
}

// 车友圈
export function getBrandList(data, callback) {
  let url = process.env.API_HOST + 'brand/m/v1/series/';
  axios.get(url, { params: data }).then((res) => {
    callback(res.data)
  })
}
// 车友圈 series信息
export function getSeriesObj(data, callback) {
  let url = process.env.API_HOST + 'car_page/m/v1/get_head/';
  axios.get(url, { params: data }).then((res) => {
    callback(res.data)
  })
}
// 车友圈 series 在售及停售信息
export function getSeriesLine(data, callback) {
  let url = process.env.API_HOST + 'car_page/m/v1/series_all_json/';
  axios.get(url, { params: data }).then((res) => {
    callback(res.data)
  })
}

//车友圈 小视频 列表
export function getVideo(data, callback) {
  let url = process.env.API_HOST + 'stream/api/news/feed/web/v47/';
  axios.get(url, { params: data }).then((res) => {
    callback(res.data)
  })
}

//服务类型
export function getSevers(data, callback) {
  let url = process.env.API_HOST + 'card/car_service_cate_head/v1/';
  axios.get(url, { params: data }).then((res) => {
    callback(res.data)
  })
}
