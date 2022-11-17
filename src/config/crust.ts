import {ProcessorConfig} from '../chains/processorConfig'

const config: ProcessorConfig = {
    chainName: 'crust',
    prefix: 'crust',
    dataSource: {
        archive: 'https://crust.archive.subsquid.io/graphql',
        chain: 'wss://rpc.crust.network',
    },
    blockRange: {
        from: 1432567,
    },
}

export default config
