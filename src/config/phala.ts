import {ProcessorConfig} from './processorConfig'

const config: ProcessorConfig = {
    chainName: 'phala',
    prefix: 'phala',
    dataSource: {
        archive: 'https://phala.archive.subsquid.io/graphql',
        chain: 'wss://api.phala.network/ws',
    },
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
