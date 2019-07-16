import {
  addPostOrder,
  editPostOrder
} from '../use-cases'

import makeAddPostOrder from './add-post-order'

const addPo = makeAddPostOrder({ addPostOrder })

const postOrderController = Object.freeze({addPo})

export default postOrderController
export { addPo }
