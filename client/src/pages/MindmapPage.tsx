import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';


interface MindmapNode {
  id: string;
  title: string;
  blurb: string;
  link: string;
  depth: number;
  parent?: string;
  children?: MindmapNode[];
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface MindmapLink {
  source: string | MindmapNode;
  target: string | MindmapNode;
}

const mindmapData = {
  id: 'internet',
  title: 'History of the Internet',
  blurb: 'The evolution from a decentralized military project (ARPANET) to a centralized, corporate-dominated network (Web 2.0), setting the stage for the Web3 movement.',
  link: 'https://en.wikipedia.org/wiki/History_of_the_Internet',
  children: [
    {
      id: 'arpanet',
      title: 'ARPANET (1960s)',
      blurb: 'The precursor to the modern internet, designed as a resilient, decentralized network for the US military.',
      link: 'https://en.wikipedia.org/wiki/ARPANET',
    },
    {
      id: 'web1',
      title: 'Web 1.0 (1990s)',
      blurb: 'The "read-only" web of static websites. Decentralized protocols (HTTP, SMTP) dominated, but user interaction was limited.',
      link: 'https://en.wikipedia.org/wiki/Web_1.0',
      children: [
        { id: 'netscape', title: 'Rise & Fall of Netscape', blurb: 'Netscape Navigator was the dominant browser of the early web, but lost the "first browser war" to Microsoft\'s Internet Explorer, a key moment in centralization.', link: 'https://en.wikipedia.org/wiki/Browser_wars#First_Browser_War'},
        { id: 'cda_230', title: 'CDA Section 230 (1996)', blurb: 'A pivotal piece of US legislation that granted online platforms immunity for their users\' content, enabling the rise of social media.', link: 'https://www.eff.org/issues/cda230'},
      ]
    },
    {
      id: 'web2',
      title: 'Web 2.0 (2000s-Present)',
      blurb: 'The "read-write" web of centralized platforms (Google, Facebook, etc.) where user data became the primary product, leading to the problems the Cypherpunks predicted.',
      link: 'https://en.wikipedia.org/wiki/Web2',
      children: [
        { id: 'google_facebook', title: 'Rise of Big Tech', blurb: 'Companies like Google and Facebook created massive, centralized databases of user information, pioneering the business model of surveillance capitalism.', link: 'https://en.wikipedia.org/wiki/Surveillance_capitalism'},
      ]
    },
    {
      id: 'cryptography',
      title: 'Cryptography',
      blurb: 'The science of secure communication. It provides the mathematical foundation for all blockchain technology and secure internet protocols.',
      link: 'https://en.wikipedia.org/wiki/Cryptography',
      children: [
        {
          id: 'pkc',
          title: 'Public-Key Cryptography',
          blurb: 'A revolutionary concept from the 1970s allowing for secure communication without pre-sharing a secret key. It is the basis for all crypto wallets.',
          link: 'https://en.wikipedia.org/wiki/Public-key_cryptography',
          children: [
            { id: 'diffie_hellman', title: 'Diffie & Hellman', blurb: 'Whitfield Diffie and Martin Hellman published the first paper on public-key cryptography in 1976, making widespread secure communication possible.', link: 'https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange'},
            { id: 'pgp', title: 'PGP (Pretty Good Privacy)', blurb: 'Created by Phil Zimmermann in 1991, PGP was a powerful encryption software released for free, sparking the "Crypto Wars."', link: 'https://en.wikipedia.org/wiki/Pretty_Good_Privacy'},
          ]
        },
        {
          id: 'legislation_crypto',
          title: 'Legislation: The Crypto Wars',
          blurb: 'The 1990s conflict between the US government, which wanted to control encryption (classifying it as a munition), and activists fighting for public access.',
          link: 'https://en.wikipedia.org/wiki/Crypto_Wars',
        },
        { id: 'david_chaum_crypto', title: 'David Chaum', blurb: 'The "godfather of digital cash." His 1980s work on blind signatures and the DigiCash system was a crucial early experiment in private digital transactions.', link: 'https://en.wikipedia.org/wiki/David_Chaum'},
      ]
    },
    {
      id: 'cypherpunks',
      title: 'The Cypherpunk Movement',
      blurb: 'A movement from the late 1980s advocating for privacy and social change through the use of strong cryptography. They are the philosophical architects of Web3.',
      link: 'https://www.activism.net/cypherpunk/manifesto.html',
      children: [
        {
          id: 'people_cypherpunks',
          title: 'Key Individuals',
          blurb: 'The core thinkers and builders who drove the movement.',
          link: 'https://en.wikipedia.org/wiki/Cypherpunk#Noteworthy_cypherpunks',
          children: [
            { id: 'tim_may', title: 'Timothy May', blurb: 'Author of "The Crypto Anarchist Manifesto," a foundational text outlining a vision of society transformed by cryptography.', link: 'https://nakamotoinstitute.org/crypto-anarchist-manifesto/'},
            { id: 'eric_hughes', title: 'Eric Hughes', blurb: 'Author of "A Cypherpunk\'s Manifesto," famously stating "Cypherpunks write code."', link: 'https://www.activism.net/cypherpunk/manifesto.html'},
            { id: 'wei_dai', title: 'Wei Dai', blurb: 'Creator of "b-money," an early proposal for an anonymous, distributed electronic cash system, cited in the Bitcoin whitepaper.', link: 'http://www.weidai.com/bmoney.txt'},
          ]
        },
        {
          id: 'bitcoin',
          title: 'Bitcoin',
          blurb: 'The first successful decentralized electronic cash system, created by the anonymous Satoshi Nakamoto. It was the culmination of the Cypherpunks\' dream of private, digital money.',
          link: 'https://bitcoin.org/bitcoin.pdf',
        },
      ]
    },
    {
      id: 'smart_contracts',
      title: 'The Smart Contract Revolution',
      blurb: 'The evolutionary leap after Bitcoin, generalizing the blockchain concept from just money to a global, decentralized computer.',
      link: 'https://ethereum.org/en/whitepaper/',
      children: [
        {
          id: 'people_smart_contracts',
          title: 'Key Individuals',
          blurb: 'The visionaries who imagined and built programmable blockchains.',
          link: '#',
          children: [
            { id: 'nick_szabo', title: 'Nick Szabo', blurb: 'Pioneered the concept of "smart contracts" in the 1990s, laying the theoretical groundwork for Ethereum long before blockchain existed.', link: 'https://en.wikipedia.org/wiki/Nick_Szabo'},
            { id: 'vitalik_buterin', title: 'Vitalik Buterin', blurb: 'Co-founder of Ethereum. His 2013 whitepaper proposed a Turing-complete blockchain, and he framed the "Scalability Trilemma" that projects like Solana aim to solve.', link: 'https://en.wikipedia.org/wiki/Vitalik_Buterin'},
            { id: 'gavin_wood', title: 'Gavin Wood', blurb: 'Co-founder of Ethereum, wrote the technical "Yellow Paper" specifying the EVM, and created Solidity. Later founded Polkadot.', link: 'https://en.wikipedia.org/wiki/Gavin_Wood'},
          ]
        },
        {
          id: 'concepts_smart_contracts',
          title: 'Core Concepts',
          blurb: 'The key ideas that enabled the explosion of dApps.',
          link: '#',
          children: [
            { id: 'ethereum', title: 'Ethereum', blurb: 'The first Turing-complete blockchain, allowing developers to build and deploy any decentralized application (dApp).', link: 'https://ethereum.org/'},
            { id: 'dao_hack', title: 'The DAO Hack', blurb: 'The first major philosophical crisis of the smart contract era, forcing a fork of Ethereum and a confrontation with the "code is law" principle.', link: 'https://en.wikipedia.org/wiki/The_DAO_(organization)'},
          ]
        },
        {
          id: 'solana_node',
          title: 'Solana',
          blurb: 'A high-performance blockchain designed to solve the Scalability Trilemma with innovations like Proof of History.',
          link: 'https://solana.com/'
        }
      ]
    },
    {
      id: 'intelligence_connection',
      title: 'The Intelligence Connection',
      blurb: 'Explores the documented interest of intelligence agencies and their research arms (like DARPA) in the technologies that both enable and threaten privacy.',
      link: 'https://unlimitedhangout.com/',
      children: [
        { id: 'darpa', title: "DARPA's Dual Legacy", blurb: 'The agency that created the decentralized ARPANET has also funded projects aimed at surveillance and breaking encryption, a fundamental conflict.', link: 'https://www.darpa.mil/about-us/timeline/arpanet'},
        { id: 'whitney_webb', title: "Whitney Webb's Research", blurb: 'Investigative journalist who documents deep ties between intelligence agencies, Silicon Valley, and figures in the crypto space.', link: 'https://unlimitedhangout.com/'},
        { id: 'total_info', title: '"Total Information Awareness"', blurb: 'A post-9/11 DARPA program for mass data collection that, while defunded, influenced the architecture of Web 2.0 surveillance.', link: 'https://en.wikipedia.org/wiki/Total_Information_Awareness'},
      ]
    },
    {
      id: 'legal_battlefield',
      title: 'The Legal Battlefield',
      blurb: 'The ongoing fight to define the legal boundaries of code, privacy, and decentralization in the courts.',
      link: '#',
      children: [
        { id: 'roman_storm', title: 'Roman Storm (Tornado Cash)', blurb: 'His indictment for creating a non-custodial privacy tool is a pivotal case for developer liability and the "code is speech" debate.', link: 'https://www.coindesk.com/policy/2023/08/23/tornado-cash-founders-charged-with-money-laundering-and-sanctions-violations/'},
        { id: 'roger_ver', title: 'Roger Ver ("Bitcoin Jesus")', blurb: 'His tax evasion case highlights the conflict between sovereign individuals and nation-states over financial control in a digital economy.', link: 'https://www.justice.gov/opa/pr/early-bitcoin-investor-charged-tax-fraud'},
        { id: 'code_is_speech', title: 'The "Code is Speech" Debate', blurb: 'The central legal argument that writing and publishing open-source software is a form of protected speech under the First Amendment.', link: 'https://www.eff.org/deeplinks/2023/10/code-speech-and-tornado-cash-case'},
      ]
    },
    {
      id: 'corporate_cooption',
      title: 'Corporate Co-option vs. Ethos',
      blurb: 'The internal struggle against the centralizing forces of venture capital, profit motives, and dishonest marketing within Web3.',
      link: '#',
      children: [
        { id: 'cexs', title: 'The Rise of CEXs', blurb: 'Centralized exchanges like Coinbase and the defunct FTX reintroduced central points of failure, as shown by the FTX collapse.', link: 'https://en.wikipedia.org/wiki/Collapse_of_FTX'},
        { id: 'fake_decentralization', title: '"Fake Decentralization"', blurb: 'A critique of projects that use a blockchain but maintain centralized control, often masked by clever marketing.', link: '#'},
        { id: 'vc_influence', title: 'The VC Influence', blurb: 'Venture capital has accelerated innovation but also introduced pressures for profit over principle, sometimes at the expense of true decentralization.', link: '#'},
      ]
    }
  ]
};

export default function MindmapPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<MindmapNode | null>(null);
  const [nodes, setNodes] = useState<MindmapNode[]>([]);
  const [links, setLinks] = useState<MindmapLink[]>([]);

  // Flatten the hierarchical data structure
  const flattenData = (node: any, parent: MindmapNode | null = null, depth = 0): { nodes: MindmapNode[], links: MindmapLink[] } => {
    const flatNode: MindmapNode = {
      id: node.id,
      title: node.title,
      blurb: node.blurb,
      link: node.link,
      depth,
      parent: parent?.id
    };

    let allNodes = [flatNode];
    let allLinks: MindmapLink[] = [];

    if (parent) {
      allLinks.push({ source: parent.id, target: flatNode.id });
    }

    if (node.children) {
      node.children.forEach((child: any) => {
        const { nodes: childNodes, links: childLinks } = flattenData(child, flatNode, depth + 1);
        allNodes = [...allNodes, ...childNodes];
        allLinks = [...allLinks, ...childLinks];
      });
    }

    return { nodes: allNodes, links: allLinks };
  };

  useEffect(() => {
    const { nodes: flatNodes, links: flatLinks } = flattenData(mindmapData);
    setNodes(flatNodes);
    setLinks(flatLinks);
  }, []);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 1200;
    const height = 800;

    // Clear previous content
    svg.selectAll("*").remove();

    // Create container group for zooming
    const container = svg.append("g");

    // Set up zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Create force simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(80).strength(0.8))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(25));

    // Create links
    const link = container.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#4A5568")
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.6);

    // Create nodes
    const nodeGroup = container.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node-group")
      .style("cursor", "pointer")
      .call(d3.drag<SVGGElement, MindmapNode>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Add circles to nodes
    const circles = nodeGroup.append("circle")
      .attr("r", (d) => Math.max(8, 20 - d.depth * 3))
      .attr("fill", "#1F2937")
      .attr("stroke", (d) => d.depth === 0 ? "#00FFFF" : "#4A5568")
      .attr("stroke-width", (d) => d.depth === 0 ? 3 : 2)
      .style("transition", "all 0.3s ease");

    // Add labels to nodes
    const labels = nodeGroup.append("text")
      .text((d) => d.title)
      .attr("dy", (d) => Math.max(8, 20 - d.depth * 3) + 15)
      .attr("text-anchor", "middle")
      .attr("fill", "#E5E7EB")
      .attr("font-size", (d) => Math.max(10, 14 - d.depth))
      .attr("font-family", "monospace");

    // Add click handlers
    nodeGroup.on("click", (event, d) => {
      event.stopPropagation();
      setSelectedNode(d);
      highlightPath(d);
    });

    // Highlight path function
    const highlightPath = (targetNode: MindmapNode) => {
      // Reset all styles
      circles.attr("stroke", (d) => d.depth === 0 ? "#00FFFF" : "#4A5568")
             .attr("stroke-width", (d) => d.depth === 0 ? 3 : 2);
      link.attr("stroke", "#4A5568").attr("stroke-width", 2);

      // Highlight path to root
      const pathNodes = new Set<string>();
      const pathLinks = new Set<string>();
      
      let current: MindmapNode | undefined = targetNode;
      while (current) {
        pathNodes.add(current.id);
        if (current.parent) {
          pathLinks.add(`${current.parent}-${current.id}`);
          current = nodes.find(n => n.id === current!.parent);
        } else {
          break;
        }
      }

      // Apply highlighting
      circles.filter((d) => pathNodes.has(d.id))
             .attr("stroke", "#00FFFF")
             .attr("stroke-width", 3);

      link.filter((d: any) => pathLinks.has(`${d.source.id}-${d.target.id}`))
          .attr("stroke", "#00FFFF")
          .attr("stroke-width", 4);
    };

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup
        .attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Clear selection on background click
    svg.on("click", () => {
      setSelectedNode(null);
      circles.attr("stroke", (d) => d.depth === 0 ? "#00FFFF" : "#4A5568")
             .attr("stroke-width", (d) => d.depth === 0 ? 3 : 2);
      link.attr("stroke", "#4A5568").attr("stroke-width", 2);
    });

    // Initial highlight of center node
    const centerNode = nodes.find(n => n.id === 'internet');
    if (centerNode) {
      setSelectedNode(centerNode);
    }

  }, [nodes, links]);

  const handleSuggestAddition = () => {
    const subject = "Mindmap Suggestion";
    const body = "Please provide the following information for your suggestion:\n\n- Suggested Node Title:\n- Blurb (a brief explanation):\n- Source Link (must be a verifiable source):\n- Connection (which existing node should this connect to?):";
    window.location.href = `mailto:contributions@shadowranch.xyz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="text-center">
            <h1 className="font-space-gothic text-4xl md:text-5xl text-cyan-400 mb-4">
              History of the Internet: A Living Document
            </h1>
            <p className="text-gray-400 font-mono text-sm">
              Click and drag nodes to explore the network • Click on nodes to learn more
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mindmap Visualization */}
          <div className="flex-1">
            <div className="bg-gray-900/50 border border-cyan-400/20 rounded-lg p-4 backdrop-blur-sm">
              <svg
                ref={svgRef}
                width="100%"
                height="600"
                viewBox="0 0 1200 800"
                className="w-full border border-gray-700/50 rounded"
              />
            </div>
          </div>

          {/* Information Panel */}
          <div className="lg:w-96">
            <div 
              className={`bg-gray-800/70 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-6 transition-opacity duration-300 ${
                selectedNode ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {selectedNode ? (
                <>
                  <h3 className="font-space-gothic text-2xl text-cyan-400 mb-4">
                    {selectedNode.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {selectedNode.blurb}
                  </p>
                  {selectedNode.link && selectedNode.link !== '#' && (
                    <a
                      href={selectedNode.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-cyan-300 hover:text-cyan-200 font-mono text-sm transition-colors"
                    >
                      Learn More
                      <span className="ml-2">→</span>
                    </a>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <p className="font-mono text-sm">
                    Select a node to view details
                  </p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
              <h4 className="font-space-gothic text-cyan-400 text-lg mb-3">
                Navigation
              </h4>
              <ul className="text-gray-300 text-sm space-y-2 font-mono">
                <li>• Click nodes to explore</li>
                <li>• Drag nodes to rearrange</li>
                <li>• Zoom and pan to navigate</li>
                <li>• Paths highlight automatically</li>
              </ul>
            </div>

            {/* Community Contribution */}
            <div className="mt-6 bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
              <h4 className="font-space-gothic text-cyan-400 text-lg mb-3">
                Living Document
              </h4>
              <p className="text-gray-300 text-sm mb-4 font-mono">
                Help expand this comprehensive Web3 history with sourced contributions.
              </p>
              <button
                onClick={handleSuggestAddition}
                className="w-full bg-gray-800 hover:bg-gray-700 text-cyan-400 hover:text-cyan-300 font-mono py-3 px-4 rounded-lg text-sm border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-200"
              >
                Suggest an Addition
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}