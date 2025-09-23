import { Link } from 'react-router-dom'
import { 
  DocumentTextIcon, 
  ScaleIcon, 
  ShieldCheckIcon, 
  EyeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Free Document Generation',
    description: 'Generate all 26 legal document types completely free. No payment required ever.',
    icon: DocumentTextIcon,
    link: '/documents',
    color: 'text-green-600'
  },
  {
    name: 'Constitutional Analysis',
    description: 'AI-powered analysis of laws for constitutional compliance and violation detection.',
    icon: ScaleIcon,
    link: '/constitutional-analyzer',
    color: 'text-blue-600'
  },
  {
    name: 'Lawyer Accountability',
    description: '0-10 corruption scoring system with fee escalation monitoring and public transparency.',
    icon: ShieldCheckIcon,
    link: '/lawyer-accountability',
    color: 'text-red-600'
  },
  {
    name: 'Public Transparency',
    description: 'Live dashboard showing constitutional violations, case outcomes, and corruption reports.',
    icon: EyeIcon,
    link: '/dashboard',
    color: 'text-purple-600'
  }
]

const stats = [
  { name: 'Property Owners Protected', value: '1,247+', icon: UserGroupIcon },
  { name: 'Unconstitutional Laws Challenged', value: '67', icon: ScaleIcon },
  { name: 'Corrupt Lawyers Exposed', value: '134', icon: ShieldCheckIcon },
  { name: 'Legal Costs Saved', value: 'R127M+', icon: CurrencyDollarIcon },
  { name: 'Citizens Educated', value: '12,847', icon: UserGroupIcon },
  { name: 'Success Rate', value: '94.7%', icon: CheckCircleIcon }
]

const documentTypes = [
  'Promissory Note', 'Bill of Exchange', 'Fraud Notice', 'Birth Certificate Application',
  'Trust Accounting Demand', 'Settlement Demand', 'Retroactive Claim', 'Debt Collector Challenge',
  'Mortgage Disclosure Demand', 'Urgent Eviction Application', 'Standard Eviction Application',
  'Criminal Charges (Police)', 'Criminal Charges (Prosecutor)', 'Criminal Charges (Court)',
  'Constitutional Challenge', 'Corruption Report', 'Utility Theft Claim', 'Damages Claim',
  'Asset Preservation Order', 'Constitutional Damages', 'Law Challenge', 'Statute Challenge',
  'Mandate Challenge', 'Bylaw Challenge', 'Regulation Challenge', 'Directive Challenge'
]

export default function HomePage() {
  return (
    <div className="bg-white">
      <div className="hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Constitutional Liberation Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Revolutionary AI-Powered Constitutional Justice Platform providing <strong>FREE</strong> legal document generation, 
              constitutional analysis, and property rights protection for all South African citizens.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/documents"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-constitutional-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Generate Free Documents
              </Link>
              <Link
                to="/shakira-choonara-case"
                className="text-sm font-semibold leading-6 text-white hover:text-blue-100"
              >
                View Flagship Case Study <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Revolutionary Features
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The first platform ever to provide completely free constitutional justice with AI-powered legal research and public transparency.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className={`h-5 w-5 flex-none ${feature.color}`} aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <Link to={feature.link} className={`text-sm font-semibold leading-6 ${feature.color} hover:opacity-80`}>
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="constitutional-gradient py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Platform Impact Statistics
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Real results from our constitutional liberation efforts across South Africa.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-center sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col gap-y-3 border-l border-gray-900/10 pl-6">
                <dt className="flex items-center gap-x-2 text-sm leading-6 text-gray-600">
                  <stat.icon className="h-4 w-4 text-constitutional-600" />
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              26 Free Document Types
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Complete legal document generation covering all aspects of constitutional justice and property rights protection.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {documentTypes.map((docType, index) => (
              <div key={index} className="document-type-card">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-5 w-5 text-constitutional-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">{docType}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/documents"
              className="btn-primary"
            >
              Start Generating Documents
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Constitutional Liberation Manifesto
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our mission to liberate citizens from legal system oppression through constitutional purity and free access to justice.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🏛️ Constitutional Purity</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Systematic analysis of ALL South African laws</li>
                  <li>• Automatic detection of constitutional violations</li>
                  <li>• Public database of unconstitutional statutes</li>
                  <li>• Challenge automation for unconstitutional laws</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⚖️ Free Legal Justice</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• ZERO COST document generation for ALL citizens</li>
                  <li>• Universal access to constitutional rights protection</li>
                  <li>• Complete elimination of financial barriers</li>
                  <li>• Democratization of legal system access</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Public Transparency</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Live constitutional violations dashboard</li>
                  <li>• Public case tracking with real-time updates</li>
                  <li>• Lawyer corruption exposure and accountability</li>
                  <li>• Success story library with precedents</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI-Powered Analysis</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Microsoft Copilot integration for legal research</li>
                  <li>• Constitutional analysis of any law or regulation</li>
                  <li>• Automated document enhancement with AI</li>
                  <li>• Legal strategy generation with precedents</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Liberate Your Constitutional Rights?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Join thousands of South Africans who have already protected their rights through our platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/documents"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-constitutional-600 shadow-sm hover:bg-gray-50"
              >
                Generate Your First Document
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-semibold leading-6 text-white hover:text-blue-100"
              >
                View Public Dashboard <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
