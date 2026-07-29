import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Sparkles, Target, BookOpen, Clock } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-blue-100 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Z Secret Activity Tracker</span>
          </div>
          <Link href="/sign-in">
            <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              🎯 Optimize Your Common App Activities
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight text-balance">
              Transform Your Activities into
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                Compelling Stories
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed text-balance">
              Z Secret Activity Tracker helps you craft authentic, optimized Common App activity entries using the proven BEABIES framework. Perfect for students applying to top universities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-4 text-sm text-gray-600">
            <p>Join students optimizing their applications for their dream universities</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use the BEABIES framework to structure and optimize your activity entries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-6">
            {/* B - Beneficiaries */}
            <div className="lg:col-span-1 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                B
              </div>
              <h3 className="font-semibold text-gray-900">Beneficiaries</h3>
              <p className="text-sm text-gray-600">Who exactly did you assist?</p>
              <p className="text-xs text-gray-500">e.g., 40 high school students</p>
            </div>

            {/* E - Endeavors */}
            <div className="lg:col-span-1 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                E
              </div>
              <h3 className="font-semibold text-gray-900">Endeavors</h3>
              <p className="text-sm text-gray-600">What were your tasks?</p>
              <p className="text-xs text-gray-500">e.g., Created curriculum</p>
            </div>

            {/* A - Actual Impact */}
            <div className="lg:col-span-1 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <h3 className="font-semibold text-gray-900">Actual Impact</h3>
              <p className="text-sm text-gray-600">Use clear numbers</p>
              <p className="text-xs text-gray-500">e.g., Raised 5,000 Birr</p>
            </div>

            {/* B - Backlash */}
            <div className="lg:col-span-1 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                B
              </div>
              <h3 className="font-semibold text-gray-900">Backlash</h3>
              <p className="text-sm text-gray-600">What challenges faced?</p>
              <p className="text-xs text-gray-500">e.g., Limited internet</p>
            </div>

            {/* I - Insights */}
            <div className="lg:col-span-1 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                I
              </div>
              <h3 className="font-semibold text-gray-900">Insights</h3>
              <p className="text-sm text-gray-600">What skills developed?</p>
              <p className="text-xs text-gray-500">e.g., Team management</p>
            </div>

            {/* E - Effort */}
            <div className="lg:col-span-1 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                E
              </div>
              <h3 className="font-semibold text-gray-900">Effort</h3>
              <p className="text-sm text-gray-600">Time commitment?</p>
              <p className="text-xs text-gray-500">e.g., 15 hrs/week</p>
            </div>

            {/* S - Solved */}
            <div className="lg:col-span-1 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 space-y-3 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                S
              </div>
              <h3 className="font-semibold text-gray-900">Solved</h3>
              <p className="text-sm text-gray-600">Main problem fixed?</p>
              <p className="text-xs text-gray-500">e.g., Lack of skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Z Secret Activity Tracker?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Structured Optimization</h3>
              <p className="text-gray-600">
                Use the proven BEABIES framework to ensure your activity entries have all the components admissions officers want to see.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Multiple Variations</h3>
              <p className="text-gray-600">
                Generate 3 different optimized versions of each entry: Leadership-focused, Quantitative-focused, and Direct & Concise.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Your History</h3>
              <p className="text-gray-600">
                Save all your entries to your personal dashboard. Track your progress, edit entries, and refine them over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Ready to Transform Your Activities?
            </h2>
            <p className="text-lg text-blue-100">
              Join hundreds of students crafting compelling application entries with Z Secret Activity Tracker.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8">
                Start Optimizing Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Already a Member?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">Z Secret Activity Tracker</span>
              </div>
              <p className="text-sm text-gray-500">
                Optimize your Common App activities for top universities.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/landing" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/sign-up" className="hover:text-white transition">Get Started</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-sm text-center text-gray-500">
            <p>&copy; 2026 Z Secret Activity Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
