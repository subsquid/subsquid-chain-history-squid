import {ProcessorConfig} from '../interfaces/processorConfig'

export const config: ProcessorConfig = {
    chainName: 'moonbeam',
    dataSource: {
        archive: 'https://moonbeam.archive.subsquid.io/graphql',
        chain: 'wss://rpc.pinknode.io/moonbeam/6e3fa591-e24f-483a-95fa-1d773f7f2be3',
    },
}
