import {hash} from 'bcrypt'

export const hasher = (value: string):Promise<string> => hash(value, 10)