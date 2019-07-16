import crypto from 'crypto'
import Id from '../Id'
import ipRegex from 'ip-regex'
import buildMakePostOrder from './post-order'
import buildMakeSource from './source'

const makeSource = buildMakeSource({ isValidIp });
const makePostOrder = buildMakePostOrder({ Id, md5, makeSource });

export default makePostOrder

function isValidIp (ip) {
  return ipRegex({ exact: true }).test(ip)
}

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}
