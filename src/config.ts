import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'acala',
    prefix: 'acala',
    dataSource: {
        archive: 'https://acala.archive.subsquid.io/graphql',
        chain: 'wss://acala-polkadot.api.onfinality.io/public-ws',
    },
    typesBundle: 'acala',
    batchSize: 500,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
