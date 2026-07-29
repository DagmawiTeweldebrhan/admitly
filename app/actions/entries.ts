'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { entries, variations } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function saveEntry(
  entryType: 'ACTIVITY' | 'HONOR',
  rawInput: string,
  selectedVariation: string,
  variationsList: { type: 'LEADERSHIP' | 'QUANTITATIVE' | 'CONCISE'; content: string }[]
) {
  const userId = await getUserId()

  // Insert entry
  const [entryResult] = await db
    .insert(entries)
    .values({
      userId,
      entryType,
      rawInput,
      selectedVariation,
    })
    .returning({ id: entries.id })

  const entryId = entryResult.id

  // Insert variations
  await db.insert(variations).values(
    variationsList.map((v) => ({
      entryId,
      variationType: v.type,
      content: v.content,
      characterCount: v.content.length,
    }))
  )

  revalidatePath('/dashboard')
  return entryId
}

export async function getUserEntries() {
  const userId = await getUserId()
  return db
    .select()
    .from(entries)
    .where(eq(entries.userId, userId))
    .orderBy(desc(entries.createdAt))
}

export async function getEntryWithVariations(entryId: number) {
  const userId = await getUserId()
  const entry = await db
    .select()
    .from(entries)
    .where(and(eq(entries.id, entryId), eq(entries.userId, userId)))

  if (!entry.length) throw new Error('Entry not found')

  const entryVariations = await db
    .select()
    .from(variations)
    .where(eq(variations.entryId, entryId))

  return {
    entry: entry[0],
    variations: entryVariations,
  }
}

export async function deleteEntry(entryId: number) {
  const userId = await getUserId()
  await db.delete(entries).where(and(eq(entries.id, entryId), eq(entries.userId, userId)))
  revalidatePath('/dashboard')
}

export async function updateEntry(
  entryId: number,
  selectedVariation: string
) {
  const userId = await getUserId()
  await db
    .update(entries)
    .set({ selectedVariation })
    .where(and(eq(entries.id, entryId), eq(entries.userId, userId)))
  revalidatePath('/dashboard')
}
