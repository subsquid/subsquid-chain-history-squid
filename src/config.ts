import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'phala',
    prefix: 'phala',
    dataSource: {
        archive: 'https://phala.archive.subsquid.io/graphql',
        chain: 'wss://api.phala.network/ws',
    },
    typesBundle: 'khala',
    batchSize: 100,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
