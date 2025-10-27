import { useQuery } from '@tanstack/react-query'
import { awsApi } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Loader2, HardDrive } from 'lucide-react'
import { formatBytes, formatDate } from '@/lib/utils'

export default function S3Dashboard() {
  const { data: buckets, isLoading } = useQuery({
    queryKey: ['s3-buckets'],
    queryFn: awsApi.getS3Buckets,
  })

  const totalSize = buckets?.reduce((sum, b) => sum + b.sizeBytes, 0) ?? 0
  const totalObjects = buckets?.reduce((sum, b) => sum + b.objectCount, 0) ?? 0

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Buckets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buckets?.length ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(totalSize)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Objects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalObjects.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            S3 Buckets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {buckets?.map(bucket => (
              <div
                key={bucket.name}
                className="border rounded-lg p-4 hover:bg-accent transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{bucket.name}</h3>
                  <Badge variant="outline">{bucket.region}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Size</p>
                    <p className="font-medium">{formatBytes(bucket.sizeBytes)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Objects</p>
                    <p className="font-medium">{bucket.objectCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-medium">{formatDate(bucket.creationDate)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
