import * as types from './mutations_type'

const mutations={
	[types.RANK_TYPE](state,rankType){
		state.rankType=rankType
	}
};

export default mutations