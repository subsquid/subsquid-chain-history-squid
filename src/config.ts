import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'hydradx',
    prefix: 'hydradx',
    dataSource: {
        archive: 'https://hydradx-snakenet.archive.subsquid.io/graphql',
        chain: 'wss://archive.snakenet.hydradx.io',
    },
    typesBundle: 'hydradx',
    batchSize: 100,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
