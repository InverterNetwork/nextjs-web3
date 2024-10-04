import { model, models } from 'mongoose'
import schema from '../schema'

const setModel = () => model('project', schema.Project)

if (!models.users) setModel()

export const Project = models.users as ReturnType<typeof setModel>
