/*
* @Author: cuijk
* @Date:   2017-10-04 13:07:30
* @Last Modified by:   cuijk
* @Last Modified time: 2017-10-17 00:31:49
* @describe 映射
*/
// export const singer = function (state) {
//   return {
//     state.singer
//   }
// }
export const singer = state => state.singer

export const disc = state => state.disc

export const topList = state => state.topList

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList
