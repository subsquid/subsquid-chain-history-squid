import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'bifrost',
    prefix: 'bifrost',
    dataSource: {
        archive: 'https://bifrost.archive.subsquid.io/graphql',
        chain: 'wss://bifrost-parachain.api.onfinality.io/public-ws',
    },
    typesBundle: 'bifrost',
    batchSize: 500,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
