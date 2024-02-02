import { ChangeStreamInsertDocument, ChangeStreamUpdateDocument } from 'mongodb'
import { UserModel } from '../models'
import { User } from '../types'

export default function listenPayments() {
  UserModel.watch<
    User,
    ChangeStreamUpdateDocument<User> | ChangeStreamInsertDocument<User>
  >([], {
    fullDocument: 'updateLookup',
  }).on('change', (change) => {
    const { operationType, fullDocument } = change
    try {
      switch (operationType) {
        case 'insert':
          break
        case 'update':
          break
        default:
          break
      }
    } catch (err) {
      console.error('AT USER LISTEN', err ?? 'No Error Cought')
    }
  })
}
