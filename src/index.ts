import { Hono } from 'hono'
import { logger } from 'hono/logger'
import isObjectEmty from '@/lib/is-object-emty'
import { RequestBodyNewNote } from '@/types/request'
import { DataNotes, Note } from '@/types/notes'
const crypto = require('node:crypto')
const data: DataNotes = require('@/database/mocks/data.json')

const app = new Hono()
app.use(logger())

// Este es el Get
app.get('/api', async (c) => {
  return c.json(data.notes)
})

// Este es el post
app.post('/api', async (c) => {
  let body: RequestBodyNewNote = { message: '' }

  try {
    body = (await c.req.json()) as RequestBodyNewNote
  } catch {
    return c.json({ statusCode: 400, message: 'Bad Request' }, 400)
  }

  if (isObjectEmty(body))
    return c.json({ statusCode: 400, message: 'Bad Request' }, 400)

  const newNote: Note = {
    id: crypto.randomUUID(),
    message: body.message,
  }

  data.notes.push(newNote)

  return c.json(newNote, 201)
})

app.delete('/api/:id', async (c) => {
  const id = c.req.param('id')

  const newNotes = data.notes.filter((note) => {
    return note.id !== id
  })

  /* Ahora te toca a ti hacer la de actualizar */
  data.notes = newNotes

  return c.json(newNotes)
})

export default {
  port: 4000,
  fetch: app.fetch,
}
