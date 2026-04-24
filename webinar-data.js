const WEBINAR_DATA = {
    title: "LTE450 for Critical Communications",
    subtitle: "Reliable broadband LTE solutions for public safety and industry",
    totalSlides: 45,
    sections: [
        { id: "intro", name: "Introduction", slides: [1, 2, 3, 4], icon: "play-circle" },
        { id: "usecases", name: "Use Cases & Services", slides: [5, 6, 7], icon: "target" },
        { id: "network", name: "Network Foundations", slides: [8, 9], icon: "shield" },
        { id: "standards", name: "Standards & Quality", slides: [10, 11], icon: "check-circle" },
        { id: "security", name: "Security & Operations", slides: [12, 13], icon: "lock" },
        { id: "economics", name: "Economics", slides: [14], icon: "trending-up" },
        { id: "infrastructure", name: "Technical Infrastructure", slides: [15, 16, 17], icon: "server" },
        { id: "devices", name: "Devices & Management", slides: [18, 19], icon: "smartphone" },
        { id: "operations", name: "Operations & Maintenance", slides: [20, 21, 22], icon: "settings" },
        { id: "validation", name: "Integration & Validation", slides: [23, 24, 25], icon: "layers" },
        { id: "business", name: "Business & Planning", slides: [26, 27], icon: "briefcase" },
        { id: "future", name: "Future & Evolution", slides: [28, 29], icon: "zap" },
        { id: "decision", name: "Decision & Action", slides: [30, 31, 32], icon: "clipboard" },
        { id: "resources", name: "Resources", slides: [33, 34], icon: "book-open" },
        { id: "closing", name: "Summary & Closing", slides: [35, 36, 37], icon: "award" },
        { id: "appendix", name: "Appendix", slides: [38, 39, 40, 41, 42, 43, 44, 45], icon: "file-text" }
    ],
    slides: [
        { num: 1, title: "LTE450 for Critical Communications", duration: 30, section: "Introduction" },
        { num: 2, title: "Introduction", duration: 35, section: "Introduction" },
        { num: 3, title: "Why 450 MHz Matters", duration: 52, section: "Introduction" },
        { num: 4, title: "450 Alliance Overview", duration: 42, section: "Introduction" },
        { num: 5, title: "Primary Use Cases", duration: 52, section: "Use Cases and Services" },
        { num: 6, title: "Mission Critical Voice - MCPTT", duration: 55, section: "Use Cases and Services" },
        { num: 7, title: "Mission Critical Data and Video", duration: 52, section: "Use Cases and Services" },
        { num: 8, title: "Network Resilience Strategies", duration: 48, section: "Network Foundations" },
        { num: 9, title: "Spectrum and Regulatory Considerations", duration: 45, section: "Network Foundations" },
        { num: 10, title: "Interoperability and Standards", duration: 48, section: "Standards and Quality" },
        { num: 11, title: "Quality of Service and Priority", duration: 45, section: "Standards and Quality" },
        { num: 12, title: "Security and Encryption", duration: 42, section: "Security and Operations" },
        { num: 13, title: "Roaming and Cross-Border Operations", duration: 42, section: "Security and Operations" },
        { num: 14, title: "Cost Efficiency and TCO", duration: 48, section: "Economics" },
        { num: 15, title: "Radio Access Network Design", duration: 48, section: "Technical Infrastructure" },
        { num: 16, title: "Core Network and Virtualization", duration: 48, section: "Technical Infrastructure" },
        { num: 17, title: "Backhaul and Transport Options", duration: 45, section: "Technical Infrastructure" },
        { num: 18, title: "Devices and Terminals Ecosystem", duration: 42, section: "Devices and Management" },
        { num: 19, title: "Device Management and Provisioning", duration: 40, section: "Devices and Management" },
        { num: 20, title: "Operational Readiness and Training", duration: 42, section: "Operations and Maintenance" },
        { num: 21, title: "Maintenance and Lifecycle Management", duration: 42, section: "Operations and Maintenance" },
        { num: 22, title: "Key Performance Indicators", duration: 42, section: "Operations and Maintenance" },
        { num: 23, title: "Integrations and Ecosystems", duration: 42, section: "Integration and Validation" },
        { num: 24, title: "Pilot Deployments and Validation", duration: 45, section: "Integration and Validation" },
        { num: 25, title: "Case Studies - Public Safety Wins", duration: 52, section: "Integration and Validation" },
        { num: 26, title: "Deployment Roadmap Essentials", duration: 45, section: "Business and Planning" },
        { num: 27, title: "Business Models and Funding", duration: 42, section: "Business and Planning" },
        { num: 28, title: "Future Evolution and 5G Interplay", duration: 48, section: "Future and Evolution" },
        { num: 29, title: "Role of 450 Alliance Going Forward", duration: 42, section: "Future and Evolution" },
        { num: 30, title: "Decision Maker Checklist", duration: 42, section: "Decision and Action" },
        { num: 31, title: "Recommended Next Steps", duration: 40, section: "Decision and Action" },
        { num: 32, title: "Questions to Consider", duration: 40, section: "Decision and Action" },
        { num: 33, title: "Resources and References", duration: 35, section: "Resources" },
        { num: 34, title: "Contact and Collaboration Channels", duration: 35, section: "Resources" },
        { num: 35, title: "Key Takeaways", duration: 45, section: "Summary and Closing" },
        { num: 36, title: "Call to Action", duration: 38, section: "Summary and Closing" },
        { num: 37, title: "Thank You", duration: 30, section: "Summary and Closing" },
        { num: 38, title: "Appendix - Technical Specs", duration: 30, section: "Appendix" },
        { num: 39, title: "Glossary of Key Terms", duration: 28, section: "Appendix" },
        { num: 40, title: "Risk and Mitigation Summary", duration: 40, section: "Appendix" },
        { num: 41, title: "Measuring Success", duration: 32, section: "Appendix" },
        { num: 42, title: "Innovation Opportunities", duration: 38, section: "Appendix" },
        { num: 43, title: "Timeline to Scale", duration: 32, section: "Appendix" },
        { num: 44, title: "Wrap Up and Next Engagement", duration: 28, section: "Appendix" },
        { num: 45, title: "Thank You - Connect With Us", duration: 25, section: "Appendix" }
    ],
    transcripts: {
        1: "Welcome to this webinar on LTE450 for Critical Communications. Over the next thirty minutes, we will explore how the 450 megahertz spectrum is transforming the way public safety agencies, utilities, and industrial operators stay connected. Whether you are evaluating new network options or planning a nationwide rollout, this session will give you a clear, practical understanding of the technology, the ecosystem, and the path to deployment. Let us get started.",
        2: "This webinar is presented by Net Technologies Finland and the 450 MHz Alliance, with the support of the University of West Attica and the eatcps Laboratory. Together, we bring expertise in LTE450 for critical communications, reliable broadband solutions for public safety and industry, and key insights on LTE 450 deployments and private networks.",
        3: "So why does the 450 megahertz band deserve special attention? The answer comes down to physics. Lower frequency signals travel significantly farther than higher bands and penetrate buildings, tunnels, and dense foliage far more effectively. As you can see in the frequency chart on screen, the 450 megahertz range sits in a sweet spot that delivers deep rural coverage, superior indoor penetration, and a dramatically lower infrastructure cost per square kilometre. For organisations that need to blanket large areas with reliable connectivity, especially where commercial networks do not reach, this band is uniquely compelling.",
        4: "The 450 Alliance is the global industry body championing LTE technology in the 450 megahertz spectrum. It brings together operators, equipment vendors, regulators, and system integrators to promote interoperability and define best practices. The Alliance actively advocates for harmonised spectrum policies with regulators worldwide, ensuring that deployments in different countries can share a common technology foundation. Importantly, it also supports public safety use cases, connecting the dots between commercial viability and mission-critical requirements.",
        5: "LTE450 serves a diverse range of mission-critical sectors. Public safety organisations including police, fire, and ambulance services rely on it for instant field communications. Utility companies use it for smart grid monitoring and remote control of substations. Transport operators depend on it for rail signalling and road network management. And in mining and maritime environments, where conventional coverage simply does not exist, LTE450 provides the lifeline connectivity that keeps operations running safely.",
        6: "Mission Critical Push-to-Talk, or MCPTT, is one of the headline capabilities of LTE450. It delivers instant, one-touch voice communication with call setup times measured in milliseconds. Users can initiate group calls across entire agencies, make private one-to-one calls, and trigger emergency alerts that override all other traffic. The system supports priority and preemption, meaning that when a critical incident occurs, the most important calls always get through. As you can see on screen, modern MCPTT handsets integrate voice, messaging, location, and camera functions into a single rugged device.",
        7: "Beyond voice, LTE450 supports a full suite of mission-critical data and video services. MCData enables real-time telemetry, computer-aided dispatch integration, and secure file transfers between field teams and command centres. MCVideo allows live scene streaming, giving incident commanders real-time visual awareness of unfolding situations. These services are built on the 3GPP framework and integrate with vertical enablers for railways, vehicle-to-everything communications, unmanned aerial systems, and IoT messaging. Together, they fundamentally improve how organisations make decisions under pressure.",
        8: "When lives depend on communication, resilience is non-negotiable. Effective LTE450 networks are built with redundancy at every layer. This includes redundant core sites and radio access nodes, diverse backhaul paths so that a single fibre cut does not take down a region, and battery and generator backups at every cell site. Rapid deployable cells can be transported to disaster zones within hours to restore coverage. The goal is simple: ensure that the network keeps running no matter what happens around it.",
        9: "Successful LTE450 deployment starts with proper spectrum planning. Licensed spectrum is essential because it guarantees interference-free operation, which is a hard requirement for safety-critical services. As the regional table on screen shows, LTE450 bands B31, B72, and B87 are allocated consistently across Africa, Asia, Europe, the Middle East, North America, Oceania Pacific, and South America. The 450 MHz Alliance and GCF partnership supports interoperability and certification across these regions, which simplifies equipment sourcing and reduces costs. Shared licensing models are also emerging in some markets, enabling multiple agencies to share the same spectrum band efficiently.",
        10: "Standards are the backbone of any multi-vendor, multi-operator network. LTE450 is built entirely on 3GPP specifications, which means devices, network equipment, and applications from different manufacturers can work together seamlessly. The 450 Alliance runs dedicated interoperability testing programmes to verify this in practice. Standardised MCPTT and MCData protocols ensure that a handset from one vendor can communicate with a server from another. SIP and IMS integration paths provide bridges to legacy systems, protecting existing investments while enabling modernisation.",
        11: "In a mission-critical network, not all traffic is equal. Quality of Service mechanisms allow operators to classify and prioritise traffic so that an emergency voice call always takes precedence over a routine data transfer. The architecture supports traffic classification rules, priority and preemption policies, guaranteed bitrate for key flows, and end-to-end QoS monitoring. This means that even when the network is under heavy load, the most critical communications are delivered reliably and on time.",
        12: "Security is foundational to trusted operations. LTE450 networks implement multiple layers of protection, starting with SIM-based mutual authentication between devices and the network. All user data is protected by end-to-end encryption, preventing eavesdropping even if the radio signal is intercepted. Network access controls restrict which devices can connect, and secure device provisioning ensures that only authorised equipment joins the network. These measures collectively create a security posture that meets the stringent requirements of government and critical infrastructure operators.",
        13: "Emergencies do not respect national boundaries. When a wildfire, flood, or industrial incident spans multiple countries, responders need seamless cross-border communications. LTE450 supports this through bilateral roaming agreements between operators. Harmonised spectrum across regions makes roaming technically straightforward. Inter-operator trust frameworks govern how networks share resources, and data protection compliance ensures that privacy regulations are respected even when traffic crosses borders.",
        14: "One of the most compelling arguments for LTE450 is its total cost of ownership. Because the 450 megahertz band covers vast areas with fewer cell sites, operators need significantly less infrastructure compared to higher frequency networks. This translates to fewer sites to build, fewer sites to power, and fewer sites to maintain. Energy consumption per site is lower, and devices enjoy longer battery life due to favourable propagation characteristics. The result is a network investment that scales efficiently, making nationwide coverage economically viable even in low-density regions.",
        15: "Designing the radio access network involves balancing coverage against capacity. Macro cell sites provide wide-area reach and are the workhorse of LTE450 deployments. In urban areas or high-traffic locations, small cells can be layered in to boost capacity. Carrier aggregation allows operators to combine multiple spectrum channels for higher throughput. And antenna optimisation for the 450 megahertz band is critical, given the unique propagation characteristics of these longer wavelengths.",
        16: "The core network is the brain of the operation. Modern LTE450 deployments increasingly leverage Network Functions Virtualisation, running core functions as software in cloud or data centre environments rather than on dedicated hardware. This approach enables edge computing for ultra-low latency applications, containerised network functions that scale on demand, and redundant Evolved Packet Core or 5G Core options for maximum resilience. Virtualisation also simplifies upgrades and reduces the time needed to deploy new services.",
        17: "Connecting radio sites to the core network requires reliable backhaul. As the site diagram illustrates, a typical tower installation includes antennas, radio equipment, a shelter, and an energy supply. Fibre is the preferred backhaul medium where available, offering virtually unlimited bandwidth. Microwave links serve as an excellent last-mile solution. Satellite backhaul connects the most remote sites. Most real-world deployments use a hybrid approach, combining these technologies to balance cost, capacity, and availability across different terrain types.",
        18: "A robust device ecosystem is essential for operational success. The LTE450 market now includes push-to-talk handsets like the Motorola device shown here, which combine rugged construction with advanced mapping and group communication features. Vehicle-mounted routers and gateways extend coverage into fleet operations. Wearable sensors and body cameras add situational awareness. All these devices are designed for demanding environments, with features like extended battery life, water and dust resistance, and glove-friendly operation.",
        19: "Managing thousands of devices across a large organisation requires scalable tools. Modern device management platforms, like the dashboard shown here, provide a centralised view of OS versions, device models, and application usage across the entire fleet. Key capabilities include over-the-air firmware and configuration updates, remote diagnostics and troubleshooting, bulk provisioning tools for rapid deployment, and policy-based access control that enforces security rules automatically. This reduces the operational burden on IT teams significantly.",
        20: "Technology alone does not save lives. People need to know how to use it effectively under stress. Operational readiness programmes include regular drills and exercises that simulate real incidents, comprehensive user manuals and standard operating procedures, cross-agency coordination training so that different organisations can work together, and well-defined on-call support processes. As the SOP workflow on screen shows, developing these procedures is a structured process that requires ongoing review and iteration.",
        21: "A network is only as good as its maintenance programme. Proactive maintenance sustains long-term service levels and prevents unexpected outages. This includes preventive site checks on a regular schedule, a spare parts inventory positioned for rapid response, firmware lifecycle plans that keep software current and secure, and SLA-based vendor support contracts that guarantee response times. The image shows field engineers performing routine tower maintenance, a critical activity that keeps the network performing at its best.",
        22: "What gets measured gets managed. Operators track a range of key performance indicators to monitor network health and service quality. The most important KPIs include network availability percentage, which should target above ninety-nine point nine percent, call setup success rate, end-to-end latency and jitter metrics, and throughput per site. Dashboards like the one shown here provide real-time visibility, enabling teams to spot trends, identify problems early, and make data-driven decisions about capacity and coverage.",
        23: "The true value of LTE450 is amplified when it connects to the wider operational ecosystem. Through well-defined APIs, the network integrates with dispatch and computer-aided dispatch systems, IoT platforms and sensor networks, geographic information systems and mapping tools, and enterprise applications via APIs and webhooks. Push-to-talk functionality provides one-button instant group communication across all connected devices. And network optimisation tools enable real-time monitoring and continuous tuning of network performance. These integrations transform the network from a standalone communication tool into a platform that enhances every aspect of operational efficiency.",
        24: "Before committing to full-scale rollout, pilot deployments are essential for validating assumptions. A well-structured pilot includes proof-of-coverage testing to verify that the 450 megahertz propagation models hold true in the local terrain, interoperability trials between different vendor equipment, user acceptance testing with actual field personnel, and iterative improvements based on lessons learned. As the project timeline on screen shows, a pilot phase should be carefully planned with clear milestones and success criteria.",
        25: "Real-world deployments provide the strongest evidence of LTE450's value. As highlighted in the disaster response case study on screen, deployments across multiple regions consistently demonstrate faster incident response times thanks to instant push-to-talk and real-time data, improved rural outreach where communities previously had no reliable coverage, enhanced situational awareness through live video and sensor integration, measurable gains in cross-agency coordination during multi-jurisdictional incidents, and the value of engaging expert consultancy from the outset. These are not theoretical benefits. They are proven outcomes from operational networks.",
        26: "A staged deployment approach minimises risk and builds confidence at each phase. The project roadmap timeline on screen illustrates the typical phases. It begins with an assessment and planning phase where spectrum, coverage, and stakeholder requirements are defined. This is followed by a pilot and validation phase that proves the concept in the field. Next comes a phased scale-up, expanding coverage region by region. Finally, continuous improvement and optimisation ensure the network evolves with changing requirements. This disciplined approach prevents costly mistakes and builds organisational buy-in along the way.",
        27: "Securing funding is often one of the biggest challenges in critical communications projects. Several models have proven successful. Public funding is common for safety networks where government recognises the societal value. Public-private partnerships allow costs and risks to be shared between government agencies and commercial operators. Operator-led commercial rollouts serve both critical and commercial users on the same infrastructure. And leasing or managed service models reduce upfront capital requirements while providing predictable operating costs.",
        28: "LTE450 is not a dead-end technology. It is designed to complement emerging platforms. Organisations can plan for a smooth migration to 5G where higher bandwidth or lower latency is needed, while maintaining LTE450 for wide-area coverage. Private 5G and LTE hybrid models allow the best of both worlds. Edge computing synergies enable latency-sensitive applications like autonomous systems and real-time analytics. And ongoing 3GPP standards evolution ensures that LTE450 will continue to receive feature updates for years to come.",
        29: "The 450 Alliance continues to play a central role in the ecosystem's growth. Its forward-looking agenda includes driving interoperability testing events that bring vendors and operators together, engaging regulators globally to secure and harmonise spectrum allocations, publishing deployment guidance and best practice documents, and fostering collaboration between vendors, operators, and end-user organisations. As the conference photo illustrates, the Alliance creates real connections between the people building these networks.",
        30: "If you are evaluating LTE450 for your organisation, there are several key questions to work through. What are your coverage and performance targets? What spectrum is available or can be secured in your region? Is the device and vendor ecosystem mature enough for your use case? And what budget and funding options are realistic? The seven-step decision framework shown on screen provides a structured approach: identify the goal, gather information, evaluate alternatives, compare options, choose, execute, and review the outcome.",
        31: "Moving from interest to action requires a clear plan. We recommend starting by engaging with 450 Alliance contacts to access the latest technical resources and connect with experienced operators. Next, plan and run a technical pilot to validate coverage and performance in your specific environment. In parallel, work to secure spectrum access through licensing or partnership agreements. And finally, define your procurement strategy and establish service level agreements with vendors.",
        32: "Before we move to our closing section, here are some critical questions to discuss with your stakeholders. What are your top coverage priorities, and where are the current gaps? Who will own and operate the network on an ongoing basis? How will you measure success, and what KPIs will you track? And what is your long-term migration path as technology evolves? Taking time to align on these questions early will prevent misunderstandings and ensure the project has broad organisational support.",
        33: "To support your evaluation, a wealth of guidance material is available. The 450 Alliance publishes detailed whitepapers on technology and deployment best practices. 3GPP specifications provide the definitive technical standards for every aspect of the network. Vendor deployment guides offer practical, product-specific implementation advice. Regulatory filings and reports from spectrum authorities provide insight into licensing processes and conditions in your region. And expert consultant guides and work papers offer additional depth for planning and decision-making.",
        34: "Connecting with the right people accelerates every project. The 450 Alliance operates working groups focused on specific technical and market topics. A network of expert consultants specialises in LTE450 planning and deployment. Regional operator contacts can share real-world operational experience. Vendor integration teams support proof-of-concept and pilot activities. And academic and research partners contribute innovation and independent validation.",
        35: "Let us recap the most important points from today's session. LTE450 offers superior coverage and building penetration thanks to its low-frequency propagation advantages. It delivers strong public safety features including mission-critical voice, data, and video services built on proven 3GPP standards. Interoperability is assured through standardised protocols and rigorous testing programmes. And the cost and resilience profile makes it one of the most efficient ways to deliver wide-area mission-critical connectivity. These four pillars make LTE450 a compelling choice for any organisation that cannot afford to lose contact.",
        36: "Now is the time to start planning. We encourage you to assess spectrum and coverage gaps in your region, engage local agencies and potential partner organisations, pilot with 450 Alliance partners to explore deployment opportunities, plan your funding and procurement strategy, and engage an experienced network consultant to guide you through the process. The technology is proven, the ecosystem is mature, and real-world deployments are delivering measurable results today.",
        37: "Thank you for joining this LTE450 webinar. We hope this session has given you a solid foundation for your next steps. We encourage you to follow up with technical briefs for deeper dives into specific topics, schedule a pilot scoping session with an experienced operator or vendor, connect directly with 450 Alliance teams for guidance, and coordinate stakeholder workshops to build consensus within your organisation. We look forward to supporting your journey.",
        38: "This appendix section provides reference material for technical teams. It covers LTE450 radio parameters including frequency bands, channel bandwidths, and power levels. You will also find security baseline checklists aligned with critical infrastructure standards, interoperability test plan templates, and QoS and KPI measurement templates. These resources are designed to be used during network design and procurement activities.",
        39: "For quick reference, here are the key acronyms used throughout this presentation. MCPTT stands for Mission Critical Push-to-Talk. MCData refers to Mission Critical Data services. EPC is the Evolved Packet Core, which is the heart of the LTE network. And QoS means Quality of Service, the mechanisms that prioritise critical traffic.",
        40: "Every deployment carries risk, but early identification enables effective mitigation. Spectrum delays can be addressed by pursuing regulatory engagement well ahead of the planned build. Vendor lock-in is mitigated by requiring standards-based interoperability in all procurement contracts. Operational readiness risks are reduced by investing in training from day one. And funding gaps can be bridged by exploring public-private partnerships, government grants, and phased investment models that spread cost over time.",
        41: "Defining clear success metrics from the outset ensures accountability and demonstrates value. Key indicators include coverage achieved versus the original target, response time improvements for emergency services, user satisfaction scores from field personnel, and operational cost reductions compared to previous communication systems. Tracking these metrics consistently builds the evidence base needed to justify further investment and expansion.",
        42: "LTE450 is not just about replacing legacy systems. It opens the door to entirely new capabilities. IoT applications for utilities and agriculture can leverage the wide-area coverage for smart metering and precision farming. Drone coordination in remote zones becomes feasible with reliable low-latency connectivity. Smart transport systems can use the network for vehicle tracking and signalling. And edge AI processing enables real-time situational awareness at the network edge, bringing intelligence closer to where it is needed most.",
        43: "Reaching national-scale coverage is a multi-year journey. A typical timeline starts with Year One focused on assessment, spectrum acquisition, and pilot deployment. Year Two moves into phased regional rollouts, expanding coverage progressively. Year Three targets full-scale operation with optimisation and capacity tuning. And on an ongoing basis, the network evolves through technology upgrades, migration planning, and continuous improvement. This phased approach balances ambition with pragmatism.",
        44: "To close, LTE450 provides a pragmatic, resilient, and cost-effective path for critical communications. We encourage you to leverage 450 Alliance expertise, start with a focused pilot programme, prioritise interoperability and resilience in your requirements, and plan for long-term migration and sustainable funding. Thank you once again for your time, and we look forward to continuing this conversation.",
        45: "Thank you for attending this webinar. We hope it has given you a comprehensive understanding of what LTE450 can deliver for your organisation. If you would like to continue the conversation, please connect with us through our social media channels on Facebook, LinkedIn, and Instagram, or scan the QR code on screen. For general enquiries, you can reach us at info at nettechn dot com, or contact Saima Androuitsopoulou directly at saima dot androuitsopoulou at nettechn dot com. We look forward to hearing from you and supporting your journey toward resilient critical communications."
    },
    quizzes: [
        {
            afterSlide: 7,
            title: "Knowledge Check: Use Cases & Services",
            questions: [
                {
                    question: "What is the primary advantage of the 450 MHz frequency band for wide-area coverage?",
                    options: [
                        "Higher data throughput than 5G",
                        "Lower propagation loss and better building penetration",
                        "No licensing requirements",
                        "Smaller antenna size"
                    ],
                    correct: 1,
                    explanation: "The 450 MHz band's lower frequency means signals travel farther and penetrate buildings more effectively, enabling wide-area coverage with fewer base stations."
                },
                {
                    question: "Which 3GPP service provides instant push-to-talk voice over LTE450?",
                    options: [
                        "VoLTE",
                        "MCData",
                        "MCPTT",
                        "MCVideo"
                    ],
                    correct: 2,
                    explanation: "MCPTT (Mission Critical Push-to-Talk) is the 3GPP standard for instant voice communication with priority and preemption support."
                }
            ]
        },
        {
            afterSlide: 14,
            title: "Knowledge Check: Network & Economics",
            questions: [
                {
                    question: "Why is licensed spectrum important for mission-critical LTE450 networks?",
                    options: [
                        "It is free of charge",
                        "It guarantees interference-free operation",
                        "It allows unlimited bandwidth",
                        "It requires no regulatory approval"
                    ],
                    correct: 1,
                    explanation: "Licensed spectrum ensures reliable, interference-free communication \u2014 a hard requirement for safety-critical services where connectivity cannot be compromised."
                },
                {
                    question: "How does LTE450 achieve lower total cost of ownership?",
                    options: [
                        "By using unlicensed spectrum",
                        "By requiring more base stations for redundancy",
                        "By covering large areas with fewer cell sites",
                        "By using consumer-grade equipment"
                    ],
                    correct: 2,
                    explanation: "The 450 MHz band's superior propagation means fewer sites are needed to cover the same area, reducing build, power, and maintenance costs significantly."
                }
            ]
        },
        {
            afterSlide: 22,
            title: "Knowledge Check: Infrastructure & Operations",
            questions: [
                {
                    question: "What is the main benefit of Network Functions Virtualisation (NFV) in LTE450 core networks?",
                    options: [
                        "Eliminates the need for backhaul",
                        "Increases flexibility, scalability and resilience",
                        "Removes the need for spectrum licensing",
                        "Reduces the number of devices needed"
                    ],
                    correct: 1,
                    explanation: "NFV runs core functions as software in cloud environments, enabling on-demand scaling, faster upgrades, and redundant deployment options."
                },
                {
                    question: "What network availability target should mission-critical LTE450 networks aim for?",
                    options: [
                        "95%",
                        "99%",
                        "99.9%+",
                        "100%"
                    ],
                    correct: 2,
                    explanation: "Mission-critical networks should target above 99.9% availability, tracked through KPI dashboards that monitor network health continuously."
                }
            ]
        },
        {
            afterSlide: 29,
            title: "Knowledge Check: Strategy & Future",
            questions: [
                {
                    question: "What is the recommended first step in an LTE450 deployment roadmap?",
                    options: [
                        "Full national rollout",
                        "Assessment and planning phase",
                        "Device procurement",
                        "5G migration"
                    ],
                    correct: 1,
                    explanation: "A staged approach starts with assessment and planning to define spectrum, coverage, and stakeholder requirements before any infrastructure is built."
                },
                {
                    question: "How does LTE450 relate to 5G technology?",
                    options: [
                        "LTE450 replaces 5G entirely",
                        "They cannot coexist on the same network",
                        "LTE450 complements 5G with wide-area coverage",
                        "5G makes LTE450 obsolete"
                    ],
                    correct: 2,
                    explanation: "LTE450 and 5G are complementary. LTE450 provides wide-area coverage while 5G adds high bandwidth and low latency where needed. Hybrid models combine both."
                }
            ]
        },
        {
            afterSlide: 37,
            title: "Final Reflection",
            questions: [
                {
                    question: "Which of the following is NOT one of the four key pillars of LTE450 discussed in this webinar?",
                    options: [
                        "Superior coverage and penetration",
                        "Unlimited free spectrum access",
                        "Standards-based interoperability",
                        "Cost-effective resilience"
                    ],
                    correct: 1,
                    explanation: "The four pillars are: superior coverage/penetration, strong public safety features, standards-based interoperability, and cost-effective resilience. Spectrum is licensed, not free."
                }
            ]
        }
    ]
};
