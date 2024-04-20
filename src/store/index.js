
export default new Vuex.Store({
  state: {
    song_arr:[], //测试列表
    newDta:232123,
  },
  mutations: {
    getSongArr(s,p){
      s.song_arr=p;
    },
    setNewData(s,p){
      s.newDta=p
    }
   
  },
  actions: {
    
  }
})
