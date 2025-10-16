"use client";

interface AutomationFeatureProps {
  icon: string;
  title: string;
  description: string;
}

function AutomationFeature({ icon, title, description }: AutomationFeatureProps) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#F6851B]/20 text-[#F6851B] text-2xl mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default function WhyAutomation() {
  const features = [
    {
      icon: '⚡',
      title: 'Instant settlement per usage event',
      description: 'Payments are processed immediately after each ride without any manual intervention or delays.'
    },
    {
      icon: '🪙',
      title: 'Programmable spending through smart delegations',
      description: 'Define exactly how your money flows with conditional logic and preset limits you control.'
    },
    {
      icon: '🔁',
      title: 'Auto revoke / reset cycles ensure user safety',
      description: 'Delegations can automatically reset for new periods or revoke when limits are reached, providing security guardrails.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#262E36] to-[#1E2329]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Built for the Pay-As-You-Go Economy</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Why on-chain automation is the future of ride payments
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <AutomationFeature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <div className="mt-16 bg-[#1E2329]/50 border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:max-w-xl mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Ready to experience the future of ride payments?</h3>
              <p className="text-gray-400">
                Join the growing ecosystem of projects using account abstraction and delegations 
                to create seamless user experiences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://github.com/MetaMask/metamask-sdk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/30 text-white font-medium rounded-lg backdrop-blur-sm transition-colors duration-200 text-center"
              >
                View GitHub
              </a>
              <a 
                href="https://docs.metamask.io/sdk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/30 text-white font-medium rounded-lg backdrop-blur-sm transition-colors duration-200 text-center"
              >
                Read Docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
