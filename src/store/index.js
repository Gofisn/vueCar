import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'
import mutations from './mutations.js'
import state from './state.js'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = process.env.NODE_NEV !=='production'
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	strict:debug,
	plugins:debug?[createLogger()]:[]
})