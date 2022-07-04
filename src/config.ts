import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'acala',
    prefix: 'acala',
    dataSource: {
        archive: 'https://acala.archive.subsquid.io/graphql',
        chain: 'wss://acala-rpc-2.aca-api.network/ws',
    },
    typesBundle: 'acala',
    batchSize: 100,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
