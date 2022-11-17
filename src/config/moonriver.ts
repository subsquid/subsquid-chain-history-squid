import {ProcessorConfig} from '../chains/processorConfig'

const config: ProcessorConfig = {
    chainName: 'moonriver',
    dataSource: {
        archive: 'https://moonriver.archive.subsquid.io/graphql',
        chain: 'wss://rpc.pinknode.io/moonriver/6e3fa591-e24f-483a-95fa-1d773f7f2be3',
    },
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
