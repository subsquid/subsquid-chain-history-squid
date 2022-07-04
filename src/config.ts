import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'crust',
    prefix: 'crust',
    dataSource: {
        archive: 'https://crust.archive.subsquid.io/graphql',
        chain: 'wss://rpc.crust.network',
    },
    typesBundle: 'crust',
    batchSize: 100,
    blockRange: {
        from: 1432567,
    },
}

export default config
