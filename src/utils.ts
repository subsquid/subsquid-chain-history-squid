import * as ss58 from '@subsquid/ss58'
import {decodeHex, toHex} from '@subsquid/substrate-processor'
import {getConfig} from './config'

const config = getConfig()

export function getOriginAccountId(origin: any) {
    if (origin && origin.__kind === 'system' && origin.value.__kind === 'Signed') {
        return decodeHex(origin.value.value)
    } else {
        return undefined
    }
}

export function encodeId(id: Uint8Array) {
    return config.prefix != null ? ss58.codec(config.prefix).encode(id) : toHex(id)
}

export function decodeId(id: string) {
    return config.prefix != null ? ss58.codec(config.prefix).decode(id) : decodeHex(id)
}

export class UnknownVersionError extends Error {
    constructor(name: string) {
        super(`There is no relevant version for ${name}`)
    }
}
