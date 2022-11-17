import {ProcessorConfig} from '../chains/processorConfig'

const config: ProcessorConfig = {
    chainName: 'acala',
    prefix: 'acala',
    dataSource: {
        archive: 'https://acala.archive.subsquid.io/graphql',
        chain: 'wss://acala-rpc-2.aca-api.network/ws',
    },
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
