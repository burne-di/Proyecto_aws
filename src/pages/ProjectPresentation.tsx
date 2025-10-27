import { useState } from 'react'
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
  ExternalLink,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react'

export default function ProjectPresentation() {
  const [activeTab, setActiveTab] = useState('overview')

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
            <h1 className="text-5xl md:text-7xl font-bold text-white">
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
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="mr-2 h-5 w-5" />
                View Live Demo
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20">
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
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="p-6 text-center">
                <metric.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-3xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-gray-300">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
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
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-2">Data Engineering</h4>
                      <p className="text-sm">
                        Modern ELT patterns, medallion architecture, incremental loading, and CDC
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-400 mb-2">Analytics Engineering</h4>
                      <p className="text-sm">
                        dbt modeling, testing, documentation, and dimensional modeling
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-400 mb-2">DevOps & IaC</h4>
                      <p className="text-sm">
                        Terraform, Docker, CI/CD pipelines, and infrastructure automation
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
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
                  End-to-end data flow from OLTP to BI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-800 p-8 rounded-lg">
                  <pre className="text-xs md:text-sm text-green-400 overflow-x-auto">
                    {`
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA SOURCES (OLTP)                          │
│                                                                       │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐                │
│  │ PostgreSQL  │  │  MySQL/RDS   │  │  APIs/SaaS  │                │
│  │   Orders    │  │  Customers   │  │  Products   │                │
│  └──────┬──────┘  └──────┬───────┘  └──────┬──────┘                │
└─────────┼──────────────────┼─────────────────┼────────────────────────┘
          │                  │                 │
          └──────────────────┴─────────────────┘
                             │
                    ┌────────▼────────┐
                    │    AWS DMS      │ ← CDC Replication
                    │  Data Capture   │
                    └────────┬────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────────┐
│                     DATA LAKE (S3)                                    │
│                                                                        │
│  ┌──────────┐      ┌────────────┐      ┌────────────┐               │
│  │   RAW    │  →   │   SILVER   │  →   │    GOLD    │               │
│  │ Parquet  │      │  Cleaned   │      │ Aggregated │               │
│  └─────┬────┘      └─────┬──────┘      └─────┬──────┘               │
└────────┼────────────────┼────────────────────┼────────────────────────┘
         │                 │                    │
         └─────────────────┴────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   AWS GLUE      │ ← PySpark ETL
                    │  Spark Jobs     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  AIRFLOW (MWAA) │ ← Orchestration
                    │  DAG Execution  │
                    └────────┬────────┘
                             │
┌────────────────────────────▼─────────────────────────────────────────┐
│                   DATA WAREHOUSE (OLAP)                               │
│                                                                        │
│                      ┌──────────────┐                                 │
│                      │   REDSHIFT   │                                 │
│                      │              │                                 │
│   ┌──────────┐       │  ┌────────┐ │      ┌─────────────┐           │
│   │ Staging  │  →    │  │  Star  │ │  →   │ OLAP Cubes  │           │
│   │  Tables  │       │  │ Schema │ │      │ Mat. Views  │           │
│   └──────────┘       │  └────────┘ │      └─────────────┘           │
│                      │     dbt      │                                 │
│                      └──────┬───────┘                                 │
└─────────────────────────────┼─────────────────────────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │  AWS QUICKSIGHT    │ ← BI & Analytics
                    │    Dashboards      │
                    └────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   END USERS        │
                    │  Business/Analysts │
                    └────────────────────┘
`}
                  </pre>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
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
                  className="bg-white/10 border-white/20 backdrop-blur hover:bg-white/15 transition-colors"
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
                      className="flex items-center gap-3 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
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
              <Button size="lg" variant="secondary">
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
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
          <p>© 2025 AWS E2E Data Engineering Platform. Built by [Your Name]</p>
          <p className="text-sm mt-2">
            Demonstrating production-ready data engineering capabilities
          </p>
        </div>
      </footer>
    </div>
  )
}
