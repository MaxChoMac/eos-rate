export const appName = 'EOSRate'
export const stage = process.env.REACT_APP_MAINNET_VERSION
export const contract = process.env.REACT_APP_RATING_CONTRACT || 'rateproducer'
export const contractEden =
  process.env.REACT_APP_EDEN_CONTRACT || 'genesis.eden'
export const eosApiHost = process.env.REACT_APP_EOS_API_HOST
export const eosApiPort = process.env.REACT_APP_EOS_API_PORT
export const eosApiProtocol = process.env.REACT_APP_EOS_API_PROTOCOL
export const eosApiUri = `${process.env.REACT_APP_EOS_API_PROTOCOL}://${process.env.REACT_APP_EOS_API_HOST}:${process.env.REACT_APP_EOS_API_PORT}`
export const eosChainId = process.env.REACT_APP_EOS_CHAIN_ID
export const blockExplorer = process.env.REACT_APP_BLOCK_EXPLORER
export const networkMonitor = process.env.REACT_APP_NETWORK_MONITOR_URL
