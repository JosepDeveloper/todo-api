import { Hono } from 'hono'
const data = require('./database/mocks/data.json')

const app = new Hono()

// Este es el Get
app.get('/', async (c) => {
  return c.json(data.notes)
})

// Este es el post
app.post('/', async (c) => {
  const body = await c.req.json()

  console.log(body)

  /* if (!message) return c.json({ status: 401, message: "The request not found" })

  const newNotes = {
    id: data.notes.lenght + 1,
    message: message.content
  }
  data.notes.push(newNotes) */

  return c.text('Hola')
})

export default {
  port: 4000,
  fetch: app.fetch,
}
