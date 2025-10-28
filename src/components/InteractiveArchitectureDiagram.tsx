import { useState } from 'react'
import {
  Database,
  Network,
  Layers,
  Cloud,
  Workflow,
  BarChart3,
  Server,
  ChevronDown,
  ArrowDown,
  TrendingUp,
  Code2,
} from 'lucide-react'

interface ArchitectureLayer {
  id: number
  title: string
  color: string
  nodes: Array<{
    name: string
    subtitle: string
    icon: typeof Database
    color?: string
  }>
  details: {
    description: string
    metrics: string[]
    technologies: string[]
  }
}

const architectureLayers: ArchitectureLayer[] = [
  {
    id: 1,
    title: 'DATA SOURCES (OLTP)',
    color: 'blue',
    nodes: [
      { name: 'PostgreSQL', subtitle: 'Orders', icon: Database },
      { name: 'MySQL', subtitle: 'Customers', icon: Database },
      { name: 'APIs', subtitle: 'Products', icon: Server },
    ],
    details: {
      description: 'Transactional data sources with real-time operations',
      metrics: ['5M+ rows', '100+ tables', '50 req/sec'],
      technologies: ['PostgreSQL 14', 'MySQL 8', 'REST APIs'],
    },
  },
  {
    id: 2,
    title: 'CHANGE DATA CAPTURE',
    color: 'green',
    nodes: [{ name: 'AWS DMS', subtitle: 'CDC Replication', icon: Network }],
    details: {
      description: 'Real-time data replication with change tracking',
      metrics: ['<5s latency', '1M+ daily changes', '99.9% uptime'],
      technologies: ['AWS DMS', 'Binary Log Replication', 'CDC Streams'],
    },
  },
  {
    id: 3,
    title: 'DATA LAKE (S3 - Medallion)',
    color: 'yellow',
    nodes: [
      { name: 'RAW', subtitle: 'Parquet', icon: Layers, color: 'yellow' },
      { name: 'SILVER', subtitle: 'Cleaned', icon: Layers, color: 'cyan' },
      { name: 'GOLD', subtitle: 'Aggregated', icon: Layers, color: 'purple' },
    ],
    details: {
      description: 'Multi-layer data lake with medallion architecture',
      metrics: ['500GB+ storage', '3 layers', '1000+ files/day'],
      technologies: ['S3', 'Parquet', 'Partitioning', 'Compression'],
    },
  },
  {
    id: 4,
    title: 'PROCESSING LAYER',
    color: 'orange',
    nodes: [
      { name: 'AWS Glue', subtitle: 'PySpark ETL', icon: Cloud },
      { name: 'Airflow', subtitle: 'Orchestration', icon: Workflow },
    ],
    details: {
      description: 'Distributed processing and workflow orchestration',
      metrics: ['25+ DAG tasks', '10 DPU capacity', '15min avg runtime'],
      technologies: ['PySpark', 'Apache Airflow', 'AWS Glue', 'MWAA'],
    },
  },
  {
    id: 5,
    title: 'DATA WAREHOUSE (OLAP)',
    color: 'red',
    nodes: [{ name: 'Redshift', subtitle: 'Star Schema + OLAP', icon: Database }],
    details: {
      description: 'Analytical warehouse with dimensional modeling',
      metrics: ['30+ dbt models', '2TB data', '<2s query time'],
      technologies: ['Amazon Redshift', 'dbt', 'Star Schema', 'OLAP Cubes'],
    },
  },
  {
    id: 6,
    title: 'BUSINESS INTELLIGENCE',
    color: 'indigo',
    nodes: [{ name: 'QuickSight', subtitle: 'Dashboards', icon: BarChart3 }],
    details: {
      description: 'Self-service analytics and interactive dashboards',
      metrics: ['50+ users', '20+ dashboards', '100K+ queries/mo'],
      technologies: ['AWS QuickSight', 'SPICE', 'Auto-refresh', 'Mobile'],
    },
  },
]

export default function InteractiveArchitectureDiagram() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null)

  const getColorClass = (color: string, type: 'bg' | 'border' | 'text') => {
    const colorMap: Record<string, Record<string, string>> = {
      blue: { bg: 'bg-blue-600/40', border: 'border-blue-500', text: 'text-blue-300' },
      green: { bg: 'bg-green-600/40', border: 'border-green-500', text: 'text-green-300' },
      yellow: { bg: 'bg-yellow-600/40', border: 'border-yellow-500', text: 'text-yellow-300' },
      cyan: { bg: 'bg-cyan-600/40', border: 'border-cyan-500', text: 'text-cyan-300' },
      purple: { bg: 'bg-purple-600/40', border: 'border-purple-500', text: 'text-purple-300' },
      orange: { bg: 'bg-orange-600/40', border: 'border-orange-500', text: 'text-orange-300' },
      red: { bg: 'bg-red-600/40', border: 'border-red-500', text: 'text-red-300' },
      indigo: { bg: 'bg-indigo-600/40', border: 'border-indigo-500', text: 'text-indigo-300' },
    }
    return colorMap[color]?.[type] || ''
  }

  return (
    <div className="relative">
      <style>{`
        @keyframes flowStream {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        @keyframes dataParticle {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(110px);
            opacity: 0;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
          }
        }
        .flow-stream {
          position: absolute;
          width: 3px;
          height: 100px;
          background: linear-gradient(to bottom, transparent, #10b981, transparent);
          animation: flowStream 2s ease-in-out infinite;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
        }
        .data-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          animation: dataParticle 3s ease-in-out infinite;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 8px #10b981;
        }
        .node-hover {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .node-hover:hover {
          transform: scale(1.05);
          animation: pulseGlow 1s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-slate-900 p-8 rounded-xl border border-white/10 shadow-2xl">
        {architectureLayers.map((layer, layerIndex) => (
          <div key={layer.id} className="mb-6">
            {/* Layer Header - Clickeable para expandir */}
            <div
              className="cursor-pointer mb-4 hover:bg-white/5 rounded-lg p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setExpandedLayer(expandedLayer === layer.id ? null : layer.id)
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setExpandedLayer(expandedLayer === layer.id ? null : layer.id)
                }
              }}
            >
              <h4
                className={`text-sm font-semibold ${getColorClass(layer.color, 'text')} text-center flex items-center justify-center gap-2`}
              >
                <span>
                  {layerIndex + 1}. {layer.title}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    expandedLayer === layer.id ? 'rotate-180' : ''
                  }`}
                />
              </h4>
            </div>

            {/* Nodes Grid */}
            <div
              className={`grid ${
                layer.nodes.length === 3
                  ? 'grid-cols-3'
                  : layer.nodes.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-1'
              } gap-4 max-w-3xl mx-auto`}
            >
              {layer.nodes.map((node, nodeIndex) => {
                const NodeIcon = node.icon
                const nodeColor = node.color || layer.color

                return (
                  <div
                    key={nodeIndex}
                    className={`node-hover ${getColorClass(nodeColor, 'bg')} ${getColorClass(nodeColor, 'border')} border rounded-lg p-4 text-center relative group`}
                  >
                    <NodeIcon className={`w-6 h-6 mx-auto mb-2 ${getColorClass(nodeColor, 'text')}`} />
                    <div className="text-sm font-semibold text-white">{node.name}</div>
                    <div className="text-xs text-gray-300">{node.subtitle}</div>

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      <div className="bg-slate-900 text-white text-xs rounded px-3 py-2 whitespace-nowrap shadow-2xl border-2 border-blue-400/50">
                        Hover node • Click title to expand
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Expandable Details Panel */}
            {expandedLayer === layer.id && (
              <div className="mt-4 bg-slate-800/60 rounded-lg p-4 border border-white/20 animate-in fade-in duration-300 shadow-lg">
                <p className="text-sm text-gray-300 mb-3">{layer.details.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Metrics */}
                  <div>
                    <h5 className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Metrics
                    </h5>
                    <ul className="space-y-1">
                      {layer.details.metrics.map((metric, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h5 className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
                      <Code2 className="w-3 h-3" /> Technologies
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {layer.details.technologies.map((tech, i) => (
                        <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Flow Animation (not last layer) */}
            {layerIndex < architectureLayers.length - 1 && (
              <div className="relative h-32 my-6">
                {/* Multiple flowing streams */}
                <div className="flow-stream" style={{ animationDelay: '0s' }} />
                <div className="flow-stream" style={{ animationDelay: '0.3s' }} />
                <div className="flow-stream" style={{ animationDelay: '0.6s' }} />

                {/* Data particles */}
                <div className="data-particle" style={{ animationDelay: '0s' }} />
                <div className="data-particle" style={{ animationDelay: '0.5s', left: '48%' }} />
                <div className="data-particle" style={{ animationDelay: '1s', left: '52%' }} />
                <div className="data-particle" style={{ animationDelay: '1.5s' }} />
                <div className="data-particle" style={{ animationDelay: '2s', left: '48%' }} />

                {/* Arrow indicator */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <ArrowDown className="w-6 h-6 text-green-400 animate-bounce" />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Legend */}
        <div className="mt-8 p-4 bg-slate-800/40 rounded-lg border border-white/20 shadow-lg">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Active Data Flow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-blue-400 rounded" />
              <span>Hover for tooltip</span>
            </div>
            <div className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              <span>Click title to expand</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
