import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'karura',
    prefix: 'karura',
    dataSource: {
        archive: 'https://karura.archive.subsquid.io/graphql',
        chain: 'wss://karura.api.onfinality.io/public-ws',
    },
    typesBundle: 'karura',
    batchSize: 500,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
