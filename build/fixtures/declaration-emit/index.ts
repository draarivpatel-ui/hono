import { Hono } from 'hono'
import type { Context } from 'hono'
import { createFactory } from 'hono/factory'
import { testClient } from 'hono/testing'

// Inferred types like these mention internal aliases from hono's declarations
// (for example the return type of `c.json()`). Consumers that build with
// `declaration: true` must be able to emit them without naming those aliases.
export const handlers = createFactory().createHandlers((c) => c.json({ ok: true }))

// An unresolved type parameter must stay nameable too: TypeScript expands
// `JSONParsed` far enough to reach its recursive helper types in this shape.
export const refused = <Reason extends string>(c: Context, reason: Reason) =>
  c.json({ reason }, 403)

export const app = new Hono().get('/', (c) => c.json({ ok: true }))
export type AppType = typeof app

// `testClient()` returns a client whose members are `ClientRequest` from `hono/client`.
// It must stay nameable even though this file never imports `hono/client`.
export const client = testClient(app)
