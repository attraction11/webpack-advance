/*
* @Author: cuijk
* @Date:   2017-10-04 13:05:43
* @Last Modified by:   cuijk
* @Last Modified time: 2017-10-17 22:22:40
* @describe 状态管理
*/
import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  disc: {},
  topList: {},
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
export default state
