import { Link } from 'react-router-dom'
import { 
  ScaleIcon, 
  HeartIcon, 
  UserGroupIcon,
  LightBulbIcon,
  EyeIcon,
  DocumentTextIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

const principles = [
  {
    name: 'Constitutional Purity',
    description: 'Systematic analysis of ALL South African laws for constitutional compliance with automatic violation detection.',
    icon: ScaleIcon,
    color: 'text-blue-600'
  },
  {
    name: 'Free Legal Justice',
    description: 'ZERO COST document generation for ALL citizens. Complete elimination of financial barriers to justice.',
    icon: CurrencyDollarIcon,
    color: 'text-green-600'
  },
  {
    name: 'Public Transparency',
    description: 'Live constitutional violations dashboard, public case tracking, and lawyer corruption exposure.',
    icon: EyeIcon,
    color: 'text-purple-600'
  },
  {
    name: 'AI-Powered Analysis',
    description: 'Microsoft Copilot integration for real-time legal research, constitutional analysis, and document enhancement.',
    icon: LightBulbIcon,
    color: 'text-yellow-600'
  }
]

const features = [
  {
    category: 'Document Generation',
    items: [
      '9 Existing Plebeian Tribunal Documents',
      '11 New Property Rights Documents', 
      '6 Constitutional Challenge Documents',
      'AI-Enhanced Legal Analysis',
      'Constitutional Compliance Verification'
    ]
  },
  {
    category: 'Constitutional Analysis',
    items: [
      'Section 25 Property Rights Analysis',
      'Section 33 Administrative Justice Review',
      'Section 34 Access to Courts Verification',
      'Section 195 Public Administration Compliance',
      'Automatic Violation Detection'
    ]
  },
  {
    category: 'Lawyer Accountability',
    items: [
      '0-10 Corruption Scoring System',
      'Fee Escalation Monitoring',
      'Mafia Tactics Detection',
      'Client Protection Alerts',
      'Public Performance Transparency'
    ]
  },
  {
    category: 'Multi-Court Filing',
    items: [
      'Automatic Court Selection',
      'Magistrate Court Filing',
      'High Court Applications',
      'Constitutional Court Access',
      'Real-Time Case Tracking'
    ]
  }
]

const team = [
  {
    name: 'Plebeian Tribunal Academy',
    role: 'Platform Architects',
    description: 'Constitutional law experts and legal technology innovators dedicated to democratizing access to justice.',
    avatar: '🏛️'
  },
  {
    name: 'AI Legal Research Team',
    role: 'Microsoft Copilot Integration',
    description: 'Artificial intelligence specialists developing cutting-edge legal research and constitutional analysis tools.',
    avatar: '🤖'
  },
  {
    name: 'Open Source Community',
    role: 'Platform Contributors',
    description: 'Developers, lawyers, and citizens contributing to the platform\'s continuous improvement and expansion.',
    avatar: '👥'
  }
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              About the Constitutional Liberation Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              The world's first AI-powered constitutional justice platform providing completely free legal document generation, 
              constitutional analysis, and property rights protection for all South African citizens.
            </p>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Revolutionary Mission
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              This platform represents the FIRST-OF-ITS-KIND Constitutional Liberation System designed to 
              liberate citizens from legal system oppression through constitutional purity and free access to justice.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <principle.icon className={`h-5 w-5 flex-none ${principle.color}`} aria-hidden="true" />
                    {principle.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{principle.description}</p>
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
              Platform Features
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Comprehensive legal technology suite covering all aspects of constitutional justice and property rights protection.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{feature.category}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-sm text-gray-600">
                      <span className="text-constitutional-600 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Dedicated professionals and volunteers working to democratize access to constitutional justice.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-sm font-medium text-constitutional-600 mb-3">{member.role}</div>
                <p className="text-sm text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Constitutional Liberation Manifesto
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our declaration of principles for liberating citizens from legal system oppression.
              </p>
            </div>
            
            <div className="card">
              <div className="prose prose-lg max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏛️ DECLARATION</h3>
                <p className="text-gray-700 mb-6">
                  This is not just a legal platform. This is a <strong>CONSTITUTIONAL LIBERATION MOVEMENT</strong>.
                </p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3">We declare that:</h4>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>• <strong>Legal justice belongs to ALL citizens</strong>, not just the wealthy</li>
                  <li>• <strong>Constitutional rights must be protected</strong> through systematic enforcement</li>
                  <li>• <strong>Legal corruption must be exposed</strong> through public transparency</li>
                  <li>• <strong>Property rights are fundamental</strong> and must be defended</li>
                  <li>• <strong>Unconstitutional laws must be challenged</strong> and repealed</li>
                </ul>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Our Commitment:</h4>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>• <strong>Free Forever:</strong> No payment required for any citizen, ever</li>
                  <li>• <strong>Open Source:</strong> Complete transparency in code and operations</li>
                  <li>• <strong>Constitutional Purity:</strong> All laws analyzed for constitutional compliance</li>
                  <li>• <strong>Public Accountability:</strong> Lawyer performance and corruption exposed</li>
                </ul>
                
                <div className="bg-constitutional-50 border border-constitutional-200 rounded-lg p-6 mt-8">
                  <blockquote className="text-center text-lg font-medium text-constitutional-800">
                    "Justice delayed is justice denied. Justice made expensive is justice for the few. Justice made free is justice for all."
                  </blockquote>
                  <div className="text-center text-sm text-constitutional-600 mt-2">
                    — Constitutional Liberation Platform
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Open Source & Community
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              This platform is completely open source to encourage public participation and continuous improvement.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="card text-center">
              <DocumentTextIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contribute Code</h3>
              <p className="text-sm text-gray-600 mb-4">
                Help improve the platform by contributing code, fixing bugs, or adding new features.
              </p>
              <a 
                href="https://github.com/nbbulk-dotcom/Plebeian_Legal_Recourse_South_Africa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-constitutional-600 hover:text-constitutional-700 text-sm font-medium"
              >
                View on GitHub →
              </a>
            </div>
            
            <div className="card text-center">
              <UserGroupIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Join Community</h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect with other users, share experiences, and help improve the platform.
              </p>
              <Link 
                to="/dashboard"
                className="text-constitutional-600 hover:text-constitutional-700 text-sm font-medium"
              >
                Public Dashboard →
              </Link>
            </div>
            
            <div className="card text-center">
              <HeartIcon className="h-8 w-8 text-constitutional-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Mission</h3>
              <p className="text-sm text-gray-600 mb-4">
                Help spread awareness about constitutional rights and free legal access.
              </p>
              <Link 
                to="/documents"
                className="text-constitutional-600 hover:text-constitutional-700 text-sm font-medium"
              >
                Generate Documents →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Join the Constitutional Liberation Movement?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Start protecting your constitutional rights today with our free platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/documents"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-constitutional-600 shadow-sm hover:bg-gray-50"
              >
                Generate Your First Document
              </Link>
              <Link
                to="/constitutional-analyzer"
                className="text-sm font-semibold leading-6 text-white hover:text-blue-100"
              >
                Analyze Constitutional Compliance <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
