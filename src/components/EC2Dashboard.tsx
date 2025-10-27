import { useQuery } from '@tanstack/react-query'
import { awsApi } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Loader2, Server } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function EC2Dashboard() {
  const { data: instances, isLoading } = useQuery({
    queryKey: ['ec2-instances'],
    queryFn: awsApi.getEC2Instances,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            EC2 Instances ({instances?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {instances?.map(instance => (
              <div
                key={instance.instanceId}
                className="border rounded-lg p-4 hover:bg-accent transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{instance.tags.Name || instance.instanceId}</h3>
                    <Badge
                      variant={instance.state === 'running' ? 'default' : 'secondary'}
                    >
                      {instance.state}
                    </Badge>
                  </div>
                  <Badge variant="outline">{instance.instanceType}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Instance ID</p>
                    <p className="font-mono">{instance.instanceId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Public IP</p>
                    <p className="font-mono">{instance.publicIp || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Private IP</p>
                    <p className="font-mono">{instance.privateIp}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Environment</p>
                    <p>{instance.tags.Environment || 'N/A'}</p>
                  </div>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  Launched: {formatDate(instance.launchTime)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
