import {ProcessorConfig} from '../processorConfig'

export const config: ProcessorConfig = {
    chainName: 'kusama',
    prefix: 'kusama',
    dataSource: {
        archive: 'https://kusama.archive.subsquid.io/graphql',
        chain: 'wss://kusama-rpc.polkadot.io',
    },
    // blockRange: {
    //     from: 7567700,
    // },
}
