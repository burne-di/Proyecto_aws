import { useQuery } from '@tanstack/react-query'
import { awsApi } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Loader2, Database } from 'lucide-react'
import { formatBytes } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export default function DatabaseDashboard() {
  const { data: rdsInstances, isLoading: rdsLoading } = useQuery({
    queryKey: ['rds-instances'],
    queryFn: awsApi.getRDSInstances,
  })

  const { data: dynamoTables, isLoading: dynamoLoading } = useQuery({
    queryKey: ['dynamodb-tables'],
    queryFn: awsApi.getDynamoDBTables,
  })

  if (rdsLoading || dynamoLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Tabs defaultValue="rds" className="space-y-4">
      <TabsList>
        <TabsTrigger value="rds">RDS Instances</TabsTrigger>
        <TabsTrigger value="dynamodb">DynamoDB Tables</TabsTrigger>
      </TabsList>

      <TabsContent value="rds" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              RDS Instances ({rdsInstances?.length ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rdsInstances?.map(instance => (
                <div
                  key={instance.dbInstanceIdentifier}
                  className="border rounded-lg p-4 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{instance.dbInstanceIdentifier}</h3>
                    <Badge
                      variant={instance.dbInstanceStatus === 'available' ? 'default' : 'secondary'}
                    >
                      {instance.dbInstanceStatus}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Engine</p>
                      <p className="font-medium">
                        {instance.engine} {instance.engineVersion}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Instance Class</p>
                      <p className="font-medium">{instance.dbInstanceClass}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Storage</p>
                      <p className="font-medium">{instance.allocatedStorage} GB</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Endpoint</p>
                      <p className="font-mono text-xs truncate">{instance.endpoint}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="dynamodb" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              DynamoDB Tables ({dynamoTables?.length ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dynamoTables?.map(table => (
                <div
                  key={table.tableName}
                  className="border rounded-lg p-4 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{table.tableName}</h3>
                    <Badge variant={table.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {table.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Item Count</p>
                      <p className="font-medium">{table.itemCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Size</p>
                      <p className="font-medium">{formatBytes(table.tableSizeBytes)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Read Capacity</p>
                      <p className="font-medium">{table.readCapacity} units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Write Capacity</p>
                      <p className="font-medium">{table.writeCapacity} units</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
