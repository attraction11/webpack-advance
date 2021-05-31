/*
* @Author: cuijk
* @Date:   2017-10-01 14:45:45
* @Last Modified by:   cuijk
* @Last Modified time: 2017-10-02 20:38:58
*/
// ES6语法定义类
export default class Singer {
  constructor({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }

}