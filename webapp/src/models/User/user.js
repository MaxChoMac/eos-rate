import _get from 'lodash.get'

import apolloClient from 'services/graphql'
import { getRpc, getAccountName } from 'utils/eosjsUtils'

import { contractEden } from '../../config'
import QUERY_GET_RATES from './query_get_rates'
import MUTATION_DELETE_USER_RATE from './mutation_delete_user_rate'

const initialState = {
  data: null
}

const user = {
  state: initialState,

  reducers: {
    setUser(state, data) {
      return {
        ...state,
        data
      }
    }
  },

  effects: (dispatch) => ({
    async getUserChainData({ ual }, { user, blockProducers, isLoading }) {
      try {
        dispatch.isLoading.storeIsContentLoading(true)

        const accountName = await getAccountName(ual)

        if (user.data && user.data.account_name === accountName) {
          dispatch.isLoading.storeIsContentLoading(false)
          return
        }

        let account = null
        let userRates = []
        let edenMember = false
        const rpc = getRpc(ual)

        if (accountName.length) {
          account = await rpc.get_account(accountName)

          const { rows: edenMembers } = await rpc.get_table_rows({
            json: true,
            code: contractEden,
            scope: 0,
            table: 'member',
            lower_bound: accountName,
            limit: 1,
            reverse: false,
            show_payer: false
          })

          if (edenMembers[0][1].account === accountName) {
            edenMember = true
          }
        }

        const {
          data: { user_ratings: userRatings }
        } = await apolloClient.query({
          variables: { user: accountName },
          query: QUERY_GET_RATES
        })

        const producers = _get(account, 'voter_info.producers', [])
        const proxy = _get(account, 'voter_info.proxy', '')
        userRates = userRatings

        if (userRatings.length) {
          userRates = userRatings.map((bpRated) => {
            const item = blockProducers.list.find(
              ({ owner }) => bpRated.bp === owner
            )

            return { ...item, ...bpRated }
          })
        }

        account
          ? this.setUser({
              ...account,
              hasProxy: Boolean(proxy.length),
              producersCount: producers.length,
              userRates,
              edenMember
            })
          : this.setUser(null)

        if (producers.length) {
          const filterBPs = producers.filter((bpName) =>
            blockProducers.list.find(({ owner }) => bpName === owner)
          )

          dispatch.blockProducers.addArrayToSelected(filterBPs)
        }
        proxy.length && dispatch.proxies.addToSelected(proxy)

        if ((producers.length || proxy.length) && !blockProducers.compareTool) {
          dispatch.blockProducers.toggleCompareTool()
        }
        dispatch.isLoading.storeIsContentLoading(false)
      } catch (error) {
        console.error('getUserChainData', error)
        dispatch.isLoading.storeIsContentLoading(false)
        this.setUser(null)
      }
    },
    async removeBlockProducersVotedByUser() {
      this.setUser(null)
      dispatch.blockProducers.clearSelected()
    },
    async deleteUserRate({ user, bpName }, state) {
      try {
        dispatch.isLoading.storeIsContentLoading(true)

        const {
          data: {
            delete_user_ratings: { affected_rows: affectedRows }
          }
        } = await apolloClient.mutate({
          variables: { user, bpName },
          mutation: MUTATION_DELETE_USER_RATE
        })

        if (affectedRows) {
          const {
            data: { userRates }
          } = state.user
          const rates = userRates.filter(({ owner }) => owner !== bpName)

          this.setUser({ ...state.user.data, userRates: rates })
        }

        dispatch.isLoading.storeIsContentLoading(false)
      } catch (error) {
        console.error('deleteUserRate', error)
        dispatch.isLoading.storeIsContentLoading(false)
      }
    },
    async getUserRates({ userRate }, { user }) {
      try {
        dispatch.isLoading.storeIsContentLoading(true)

        const { message, ...bpRate } = userRate
        const userRatesFiltered = user.data.userRates.filter(
          ({ owner }) => owner !== bpRate.bp
        )

        this.setUser({
          ...user.data,
          userRates: [...userRatesFiltered, bpRate]
        })
        dispatch.isLoading.storeIsContentLoading(false)
      } catch (error) {
        console.error('getUserRates', error)
        dispatch.isLoading.storeIsContentLoading(false)
        this.setUser(null)
      }
    }
  })
}

export default user
