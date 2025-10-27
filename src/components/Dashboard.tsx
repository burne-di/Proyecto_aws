import { useQuery } from '@tanstack/react-query'
import { awsApi } from '@/services/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Activity, Server, Database, Cloud, DollarSign, AlertTriangle } from 'lucide-react'
import ServicesOverview from './ServicesOverview'
import EC2Dashboard from './EC2Dashboard'
import S3Dashboard from './S3Dashboard'
import LambdaDashboard from './LambdaDashboard'
import DatabaseDashboard from './DatabaseDashboard'
import CostDashboard from './CostDashboard'

export default function Dashboard() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: awsApi.getServices,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  const healthyCount = services?.filter(s => s.status === 'healthy').length ?? 0
  const degradedCount = services?.filter(s => s.status === 'degraded').length ?? 0
  const downCount = services?.filter(s => s.status === 'down').length ?? 0
  const totalResources = services?.reduce((sum, s) => sum + s.resourceCount, 0) ?? 0

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">AWS Services Monitor</h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring and verification of AWS infrastructure services
          </p>
        </div>
        <Badge variant="outline" className="h-8 px-4">
          <Activity className="mr-2 h-4 w-4" />
          Live Data
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Services</CardTitle>
            <Server className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{healthyCount}</div>
            <p className="text-xs text-muted-foreground">Operating normally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Degraded Services</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{degradedCount}</div>
            <p className="text-xs text-muted-foreground">Performance issues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Down Services</CardTitle>
            <Cloud className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{downCount}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Database className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResources}</div>
            <p className="text-xs text-muted-foreground">Across all services</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ec2">EC2</TabsTrigger>
          <TabsTrigger value="s3">S3</TabsTrigger>
          <TabsTrigger value="lambda">Lambda</TabsTrigger>
          <TabsTrigger value="databases">Databases</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <ServicesOverview services={services} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="ec2">
          <EC2Dashboard />
        </TabsContent>

        <TabsContent value="s3">
          <S3Dashboard />
        </TabsContent>

        <TabsContent value="lambda">
          <LambdaDashboard />
        </TabsContent>

        <TabsContent value="databases">
          <DatabaseDashboard />
        </TabsContent>

        <TabsContent value="costs">
          <CostDashboard />
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground pt-4 border-t">
        <p>
          Built with React + TypeScript + Vite | FastAPI Backend | AWS SDK Integration
        </p>
        <p className="mt-1">Data Engineer Fullstack Senior - Portfolio Project</p>
      </div>
    </div>
  )
}
