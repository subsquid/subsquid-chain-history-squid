import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'karura',
    prefix: 'karura',
    dataSource: {
        archive: 'https://karura.archive.subsquid.io/graphql',
        chain: 'wss://karura-rpc-2.aca-api.network/ws',
    },
    typesBundle: 'karura',
    batchSize: 500,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
