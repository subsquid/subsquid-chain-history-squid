import {ChainGetters} from '../chains/chainGetters'
import {ProcessorConfig} from './processorConfig'

export function getChain(): {config: ProcessorConfig; getters: ChainGetters} {
    switch (process.env.CHAIN) {
        case 'kusama':
            return require('./kusama')
        case 'polkadot':
            return require('./polkadot')
        case 'acala':
            return require('./acala')
        case 'karura':
            return require('./karura')
        case 'moonriver':
            return require('./moonriver')
        case 'moonbeam':
            return require('./moonbeam')
        case 'bifrost':
            return require('./bifrost')
        case 'phala':
            return require('./phala')
        default:
            throw new Error(`Unsupported chain ${process.env.CHAIN}`)
    }
}
