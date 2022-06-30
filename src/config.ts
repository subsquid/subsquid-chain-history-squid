import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'moonriver',
    prefix: 'moonriver',
    dataSource: {
        archive: 'https://moonriver.archive.subsquid.io/graphql',
        chain: 'wss://moonriver.api.onfinality.io/public-ws',
    },
    typesBundle: 'moonriver',
    batchSize: 500,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
