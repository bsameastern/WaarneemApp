import Vue from 'vue'
import Vuex from 'vuex'
import shifts from '~/store/shifts'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: { shifts },
  })

export default store
