import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'bifrost',
    prefix: 'bifrost',
    dataSource: {
        archive: 'https://bifrost.archive.subsquid.io/graphql',
        chain: 'wss://eu.bifrost-rpc.liebi.com/ws',
    },
    typesBundle: 'bifrost',
    batchSize: 500,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
