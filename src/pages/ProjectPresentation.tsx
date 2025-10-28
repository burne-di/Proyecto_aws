import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Database,
  GitBranch,
  Workflow,
  Cloud,
  BarChart3,
  Code2,
  Container,
  FileCode,
  Layers,
  Network,
  Server,
  Shield,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  Play,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Zap,
  ArrowRight,
  ChevronDown,
  ArrowDown,
} from 'lucide-react'

export default function ProjectPresentation() {
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null)

  const technologies = [
    { name: 'React 18', category: 'Frontend', icon: Code2, color: 'bg-blue-500' },
    { name: 'TypeScript', category: 'Frontend', icon: FileCode, color: 'bg-blue-600' },
    { name: 'FastAPI', category: 'Backend', icon: Server, color: 'bg-green-600' },
    { name: 'Python 3.11', category: 'Backend', icon: Code2, color: 'bg-yellow-600' },
    { name: 'PostgreSQL', category: 'Database', icon: Database, color: 'bg-blue-700' },
    { name: 'Redshift', category: 'Data Warehouse', icon: Database, color: 'bg-red-600' },
    { name: 'Airflow', category: 'Orchestration', icon: Workflow, color: 'bg-teal-600' },
    { name: 'dbt', category: 'Transformation', icon: GitBranch, color: 'bg-orange-600' },
    { name: 'AWS Glue', category: 'ETL', icon: Cloud, color: 'bg-orange-500' },
    { name: 'Docker', category: 'DevOps', icon: Container, color: 'bg-blue-400' },
    { name: 'Terraform', category: 'IaC', icon: Layers, color: 'bg-purple-600' },
    { name: 'QuickSight', category: 'BI', icon: BarChart3, color: 'bg-indigo-600' },
  ]

  const awsServices = [
    { name: 'RDS PostgreSQL', status: 'active', type: 'Database', region: 'us-east-1' },
    { name: 'S3 Data Lake', status: 'active', type: 'Storage', region: 'us-east-1' },
    { name: 'AWS Glue', status: 'active', type: 'ETL', region: 'us-east-1' },
    { name: 'Redshift', status: 'active', type: 'DWH', region: 'us-east-1' },
    { name: 'MWAA (Airflow)', status: 'active', type: 'Orchestration', region: 'us-east-1' },
    { name: 'DMS', status: 'active', type: 'Migration', region: 'us-east-1' },
    { name: 'Lambda', status: 'active', type: 'Compute', region: 'us-east-1' },
    { name: 'QuickSight', status: 'active', type: 'BI', region: 'us-east-1' },
    { name: 'CloudWatch', status: 'active', type: 'Monitoring', region: 'us-east-1' },
    { name: 'IAM', status: 'active', type: 'Security', region: 'global' },
    { name: 'VPC', status: 'active', type: 'Network', region: 'us-east-1' },
    { name: 'Secrets Manager', status: 'active', type: 'Security', region: 'us-east-1' },
  ]

  const businessValue = [
    {
      title: 'Data Processing Speed',
      value: '10x',
      description: 'Faster than traditional ETL',
      icon: Zap,
      color: 'text-yellow-400',
    },
    {
      title: 'Infrastructure Cost',
      value: '$2.5K/mo',
      description: 'Optimized serverless architecture',
      icon: DollarSign,
      color: 'text-green-400',
    },
    {
      title: 'Data Latency',
      value: '<15min',
      description: 'Near real-time analytics',
      icon: Clock,
      color: 'text-blue-400',
    },
    {
      title: 'Business Users',
      value: '50+',
      description: 'Self-service analytics access',
      icon: Users,
      color: 'text-purple-400',
    },
    {
      title: 'Data Quality',
      value: '99.9%',
      description: 'Accuracy with validation',
      icon: CheckCircle2,
      color: 'text-green-400',
    },
    {
      title: 'Scalability',
      value: 'Auto',
      description: 'Elastic infrastructure',
      icon: TrendingUp,
      color: 'text-orange-400',
    },
  ]

  const features = [
    {
      title: 'OLTP to OLAP Pipeline',
      description: 'Complete data flow from transactional database to analytical warehouse',
      icon: Database,
      details: [
        'RDS PostgreSQL as OLTP source',
        'AWS DMS for CDC replication',
        'Multi-layer Data Lake (RAW/SILVER/GOLD)',
        'Redshift as OLAP destination',
      ],
    },
    {
      title: 'Data Orchestration',
      description: 'Production-grade workflow management with Apache Airflow',
      icon: Workflow,
      details: [
        'AWS MWAA (Managed Airflow)',
        'Complex DAG dependencies',
        'Error handling & retries',
        'Email notifications',
      ],
    },
    {
      title: 'Data Transformation',
      description: 'Modern analytics engineering with dbt on Redshift',
      icon: GitBranch,
      details: [
        'Star Schema modeling',
        'Dimensional modeling',
        'OLAP cube creation',
        'Automated testing & docs',
      ],
    },
    {
      title: 'ETL Processing',
      description: 'Scalable PySpark jobs on AWS Glue',
      icon: Cloud,
      details: [
        'Serverless Spark processing',
        'Data quality checks',
        'Incremental loads',
        'Performance optimization',
      ],
    },
    {
      title: 'Infrastructure as Code',
      description: 'Fully automated infrastructure deployment',
      icon: Layers,
      details: [
        'Terraform for AWS resources',
        'Version controlled',
        'Multi-environment support',
        'Cost optimization',
      ],
    },
    {
      title: 'Business Intelligence',
      description: 'Interactive dashboards and analytics',
      icon: BarChart3,
      details: [
        'AWS QuickSight dashboards',
        'Real-time metrics',
        'Self-service analytics',
        'Mobile support',
      ],
    },
  ]

  const metrics = [
    { label: 'Data Sources', value: '5+', icon: Database },
    { label: 'Daily Records', value: '1M+', icon: BarChart3 },
    { label: 'DAG Tasks', value: '25+', icon: Workflow },
    { label: 'dbt Models', value: '30+', icon: GitBranch },
    { label: 'AWS Services', value: '15+', icon: Cloud },
    { label: 'Test Coverage', value: '85%', icon: CheckCircle2 },
  ]

  const handleViewDashboard = () => {
    navigate('/dashboard')
  }

  const handleGitHub = () => {
    window.open('https://github.com/rubenquispev', '_blank')
  }

  const handleEmail = () => {
    window.location.href = 'mailto:rubendqv@gmail.com'
  }

  const handleLinkedIn = () => {
    window.open('https://www.linkedin.com/in/rubenquispev/', '_blank')
  }

  // Architecture layer data with expandable details
  const architectureLayers = [
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge variant="outline" className="text-white border-white/20 px-4 py-2">
              <Shield className="w-4 h-4 mr-2 inline" />
              Production-Ready Data Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-in">
              AWS E2E Data Engineering
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                OLTP → OLAP Platform
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete end-to-end data platform showcasing modern data engineering best practices
              with AWS, Airflow, dbt, and advanced analytics
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all"
                onClick={handleViewDashboard}
              >
                <Play className="mr-2 h-5 w-5" />
                View Live Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
                onClick={handleGitHub}
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub Repository
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-white/10 border-white/20 backdrop-blur hover:bg-white/15 transition-all hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <metric.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-3xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-gray-300">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Business Value Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Business Value Delivered</h2>
          <p className="text-xl text-gray-300">
            Measurable impact on operations and decision-making
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessValue.map((item, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-white/20 backdrop-blur hover:from-slate-700/90 hover:to-slate-800/90 transition-all shadow-xl"
            >
              <CardContent className="p-6">
                <item.icon className={`w-12 h-12 mb-4 ${item.color}`} />
                <div className="text-4xl font-bold text-white mb-2">{item.value}</div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-200">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AWS Services Deployed */}
      <div className="container mx-auto px-4 py-12">
        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-3xl text-white flex items-center gap-3">
              <Cloud className="w-8 h-8" />
              AWS Services Deployed
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Production infrastructure with 12+ AWS services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {awsServices.map((service, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 hover:border-green-500/50 hover:bg-white/10 transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm truncate">
                      {service.name}
                    </div>
                    <div className="text-xs text-gray-400">{service.type}</div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs border-green-500/30 text-green-400"
                  >
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="architecture" className="data-[state=active]:bg-blue-600">
              Architecture
            </TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-blue-600">
              Features
            </TabsTrigger>
            <TabsTrigger value="stack" className="data-[state=active]:bg-blue-600">
              Tech Stack
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-3xl text-white">Project Overview</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  A comprehensive data engineering platform demonstrating enterprise-level
                  capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">What This Project Does</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      Replicates data from OLTP (PostgreSQL) to Data Lake (S3) using AWS DMS
                    </li>
                    <li>
                      Processes data through RAW → SILVER → GOLD layers using AWS Glue PySpark
                    </li>
                    <li>Orchestrates complex workflows with Apache Airflow (MWAA)</li>
                    <li>
                      Transforms data into Star Schema and OLAP cubes using dbt on Redshift
                    </li>
                    <li>Provides real-time dashboards and analytics via QuickSight</li>
                    <li>Implements CI/CD, monitoring, and data quality validation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Key Technical Highlights
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-colors">
                      <h4 className="font-semibold text-blue-400 mb-2">Data Engineering</h4>
                      <p className="text-sm">
                        Modern ELT patterns, medallion architecture, incremental loading, and CDC
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-colors">
                      <h4 className="font-semibold text-green-400 mb-2">Analytics Engineering</h4>
                      <p className="text-sm">
                        dbt modeling, testing, documentation, and dimensional modeling
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                      <h4 className="font-semibold text-purple-400 mb-2">DevOps & IaC</h4>
                      <p className="text-sm">
                        Terraform, Docker, CI/CD pipelines, and infrastructure automation
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-orange-500/20 hover:border-orange-500/50 transition-colors">
                      <h4 className="font-semibold text-orange-400 mb-2">Cloud Native</h4>
                      <p className="text-sm">
                        AWS-native services, serverless, auto-scaling, and cost optimization
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-3xl text-white">System Architecture</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  End-to-end data flow from OLTP to BI with animated visualization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Interactive Architecture Diagram */}
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
                        transform: translateY(70px);
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
                      height: 60px;
                      background: linear-gradient(to bottom, transparent, #10b981, transparent);
                      animation: flowStream 2s ease-in-out infinite;
                      left: 50%;
                      transform: translateX(-50%);
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

                  <div className="bg-slate-900/50 p-8 rounded-xl border border-white/10">
                    {/* Layer 1: Data Sources */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-blue-400 mb-4 text-center">
                        1. DATA SOURCES (OLTP)
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {['PostgreSQL\nOrders', 'MySQL\nCustomers', 'APIs\nProducts'].map(
                          (source, i) => (
                            <div
                              key={i}
                              className="service-node bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 text-center"
                            >
                              <Database className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                              <div className="text-xs text-white whitespace-pre-line">
                                {source}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div className="flex justify-center my-4">
                        <ArrowRight className="data-flow-arrow w-6 h-6 text-green-400 rotate-90" />
                      </div>
                    </div>

                    {/* Layer 2: CDC */}
                    <div className="mb-8">
                      <div className="service-node bg-green-500/20 border border-green-500/50 rounded-lg p-4 max-w-md mx-auto text-center">
                        <Network className="w-6 h-6 mx-auto mb-2 text-green-400" />
                        <div className="text-sm font-semibold text-white">AWS DMS</div>
                        <div className="text-xs text-gray-300">Change Data Capture</div>
                      </div>
                      <div className="flex justify-center my-4">
                        <ArrowRight className="data-flow-arrow w-6 h-6 text-green-400 rotate-90" />
                      </div>
                    </div>

                    {/* Layer 3: Data Lake */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-yellow-400 mb-4 text-center">
                        2. DATA LAKE (S3 - Medallion Architecture)
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { name: 'RAW', desc: 'Parquet', color: 'yellow' },
                          { name: 'SILVER', desc: 'Cleaned', color: 'cyan' },
                          { name: 'GOLD', desc: 'Aggregated', color: 'purple' },
                        ].map((layer, i) => (
                          <div
                            key={i}
                            className={`service-node bg-${layer.color}-500/20 border border-${layer.color}-500/50 rounded-lg p-4 text-center`}
                            style={{ animationDelay: `${i * 0.5}s` }}
                          >
                            <Layers className={`w-6 h-6 mx-auto mb-2 text-${layer.color}-400`} />
                            <div className="text-sm font-semibold text-white">{layer.name}</div>
                            <div className="text-xs text-gray-300">{layer.desc}</div>
                            {i < 2 && (
                              <ArrowRight className="data-flow-arrow w-4 h-4 text-green-400 absolute right-0 top-1/2 transform translate-x-6 -translate-y-2" />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center my-4">
                        <ArrowRight className="data-flow-arrow w-6 h-6 text-green-400 rotate-90" />
                      </div>
                    </div>

                    {/* Layer 4: Processing */}
                    <div className="mb-8">
                      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <div className="service-node bg-orange-500/20 border border-orange-500/50 rounded-lg p-4 text-center">
                          <Cloud className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                          <div className="text-sm font-semibold text-white">AWS Glue</div>
                          <div className="text-xs text-gray-300">PySpark ETL</div>
                        </div>
                        <div className="service-node bg-teal-500/20 border border-teal-500/50 rounded-lg p-4 text-center">
                          <Workflow className="w-6 h-6 mx-auto mb-2 text-teal-400" />
                          <div className="text-sm font-semibold text-white">Airflow (MWAA)</div>
                          <div className="text-xs text-gray-300">Orchestration</div>
                        </div>
                      </div>
                      <div className="flex justify-center my-4">
                        <ArrowRight className="data-flow-arrow w-6 h-6 text-green-400 rotate-90" />
                      </div>
                    </div>

                    {/* Layer 5: Data Warehouse */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-red-400 mb-4 text-center">
                        3. DATA WAREHOUSE (OLAP)
                      </h4>
                      <div className="service-node bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-2xl mx-auto">
                        <Database className="w-8 h-8 mx-auto mb-3 text-red-400" />
                        <div className="text-lg font-semibold text-white text-center mb-4">
                          Amazon Redshift
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="bg-white/5 p-2 rounded">
                            <div className="text-xs text-white font-medium">Staging</div>
                          </div>
                          <div className="bg-white/5 p-2 rounded">
                            <div className="text-xs text-white font-medium">Star Schema</div>
                          </div>
                          <div className="bg-white/5 p-2 rounded">
                            <div className="text-xs text-white font-medium">OLAP Cubes</div>
                          </div>
                        </div>
                        <div className="text-xs text-center text-gray-300 mt-2">
                          dbt Transformations
                        </div>
                      </div>
                      <div className="flex justify-center my-4">
                        <ArrowRight className="data-flow-arrow w-6 h-6 text-green-400 rotate-90" />
                      </div>
                    </div>

                    {/* Layer 6: BI */}
                    <div>
                      <div className="service-node bg-indigo-500/20 border border-indigo-500/50 rounded-lg p-4 max-w-md mx-auto text-center">
                        <BarChart3 className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
                        <div className="text-sm font-semibold text-white">AWS QuickSight</div>
                        <div className="text-xs text-gray-300">Business Intelligence</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Architecture Details */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/30">
                    <Network className="w-8 h-8 text-blue-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">Data Ingestion</h4>
                    <p className="text-sm text-gray-300">
                      CDC with DMS, Lambda triggers, and S3 events
                    </p>
                  </div>
                  <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
                    <Layers className="w-8 h-8 text-green-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">Processing Layers</h4>
                    <p className="text-sm text-gray-300">
                      Medallion architecture with RAW/SILVER/GOLD
                    </p>
                  </div>
                  <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-500/30">
                    <BarChart3 className="w-8 h-8 text-purple-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">Analytics Layer</h4>
                    <p className="text-sm text-gray-300">
                      Star schema, OLAP cubes, and BI dashboards
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/10 border-white/20 backdrop-blur hover:bg-white/15 transition-all hover:scale-105"
                >
                  <CardHeader>
                    <feature.icon className="w-10 h-10 text-blue-400 mb-2" />
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tech Stack Tab */}
          <TabsContent value="stack" className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-3xl text-white">Technology Stack</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Enterprise-grade tools and frameworks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-all hover:scale-105"
                    >
                      <div className={`${tech.color} p-2 rounded-lg`}>
                        <tech.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{tech.name}</div>
                        <div className="text-xs text-gray-400">{tech.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Interested in Hiring?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              I'm available for Data Engineering roles. Let's discuss how I can bring value to your
              team.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                variant="secondary"
                onClick={handleEmail}
                className="hover:scale-105 transition-transform"
              >
                <Mail className="mr-2 h-5 w-5" />
                rubendqv@gmail.com
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all"
                onClick={handleLinkedIn}
              >
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all"
                onClick={handleGitHub}
              >
                <Github className="mr-2 h-5 w-5" />
                View More Projects
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 AWS E2E Data Engineering Platform. Built by Ruben Quispe</p>
          <p className="text-sm mt-2">
            Demonstrating production-ready data engineering capabilities
          </p>
        </div>
      </footer>
    </div>
  )
}
