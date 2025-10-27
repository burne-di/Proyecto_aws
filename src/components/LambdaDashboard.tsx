import { useQuery } from '@tanstack/react-query'
import { awsApi } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Loader2, Zap } from 'lucide-react'
import { formatBytes, formatDate } from '@/lib/utils'

export default function LambdaDashboard() {
  const { data: functions, isLoading } = useQuery({
    queryKey: ['lambda-functions'],
    queryFn: awsApi.getLambdaFunctions,
  })

  const totalInvocations = functions?.reduce((sum, f) => sum + (f.invocations ?? 0), 0) ?? 0

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Functions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{functions?.length ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Invocations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvocations.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Lambda Functions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {functions?.map(fn => (
              <div
                key={fn.functionName}
                className="border rounded-lg p-4 hover:bg-accent transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{fn.functionName}</h3>
                  <Badge variant="outline">{fn.runtime}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Memory</p>
                    <p className="font-medium">{fn.memorySize} MB</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Timeout</p>
                    <p className="font-medium">{fn.timeout}s</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Code Size</p>
                    <p className="font-medium">{formatBytes(fn.codeSize)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Invocations</p>
                    <p className="font-medium">{(fn.invocations ?? 0).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  Last modified: {formatDate(fn.lastModified)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
