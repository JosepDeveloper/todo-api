import { Hono } from 'hono'
import { logger } from 'hono/logger'
import isObjectEmty from './lib/is-object-emty'
import { RequestBodyNewNote } from './types/request'
import { DataNotes, Note } from './types/notes'
const data: DataNotes = require('./database/mocks/data.json')

const app = new Hono()
app.use(logger())

// Este es el Get
app.get('/', async (c) => {
  return c.json(data.notes)
})

// Este es el post
app.post('/', async (c) => {
  let body: RequestBodyNewNote = { message: '' }

  try {
    body = (await c.req.json()) as RequestBodyNewNote
  } catch {
    return c.json({ statusCode: 400, message: 'Bad Request' }, 400)
  }

  if (isObjectEmty(body))
    return c.json({ statusCode: 400, message: 'Bad Request' }, 400)

  const newNote: Note = {
    id: data.notes.length + 1,
    message: body.message,
  }

  data.notes.push(newNote)

  return c.json(newNote, 201)
})

export default {
  port: 4000,
  fetch: app.fetch,
}
