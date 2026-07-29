import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserEntries, deleteEntry } from '@/app/actions/entries'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const entries = await getUserEntries()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-card/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Your Entry History</h1>
              <p className="text-sm text-muted-foreground mt-1">
                All your optimized Common App entries in one place
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {session.user.email}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {entries.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No entries yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start creating optimized entries for your Common App
            </p>
            <Link
              href="/optimizer"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Create Your First Entry
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </p>
              <Link
                href="/optimizer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                + New Entry
              </Link>
            </div>

            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-border bg-card p-6 hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        entry.entryType === 'ACTIVITY'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}
                    >
                      {entry.entryType}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <DeleteEntryButton entryId={entry.id} />
                </div>

                <div className="bg-background/50 rounded p-4 border border-border/50 my-3">
                  <p className="text-sm text-foreground leading-relaxed">
                    {entry.selectedVariation || entry.rawInput}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {entry.selectedVariation?.length || entry.rawInput?.length} characters
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50/10 rounded-lg transition-colors dark:text-blue-400">
                    Copy
                  </button>
                  <Link
                    href={`/optimizer?edit=${entry.id}`}
                    className="flex-1 px-3 py-2 text-sm text-foreground hover:bg-foreground/5 rounded-lg transition-colors border border-border text-center"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function LogoutButton() {
  return (
    <form
      action={async () => {
        'use server'
        await authClient.signOut()
        redirect('/sign-in')
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </form>
  );
}

function DeleteEntryButton({ entryId }: { entryId: number }) {
  return (
    <form
      action={async () => {
        'use server'
        await deleteEntry(entryId)
      }}
    >
      <button
        type="submit"
        className="px-3 py-1 text-xs text-red-600 hover:bg-red-50/10 rounded transition-colors dark:text-red-400"
      >
        Delete
      </button>
    </form>
  );
}
