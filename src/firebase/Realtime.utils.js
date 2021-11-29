import {app} from './firebase.utils'
import { getDatabase } from '@firebase/database'

export const rdb = getDatabase(app);

