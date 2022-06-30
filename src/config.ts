import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'moonbeam',
    prefix: 'moonbeam',
    dataSource: {
        archive: 'https://moonbeam.archive.subsquid.io/graphql',
        chain: 'wss://moonbeam.api.onfinality.io/public-ws',
    },
    typesBundle: 'moonbeam',
    batchSize: 500,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
