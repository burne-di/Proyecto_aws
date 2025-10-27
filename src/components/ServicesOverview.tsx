import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Loader2 } from 'lucide-react'
import type { AWSService } from '@/types/aws'
import { formatDate } from '@/lib/utils'

interface Props {
  services?: AWSService[]
  isLoading: boolean
}

export default function ServicesOverview({ services, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'down':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services?.map(service => (
        <Card key={service.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{service.name}</CardTitle>
              <Badge variant="outline" className={getStatusColor(service.status)}>
                {service.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{service.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Region:</span>
              <span className="font-medium">{service.region}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Resources:</span>
              <span className="font-medium">{service.resourceCount}</span>
            </div>
            {service.cost && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Cost:</span>
                <span className="font-medium text-green-600">
                  ${service.cost.toFixed(2)}
                </span>
              </div>
            )}
            {service.metrics && (
              <div className="pt-2 border-t space-y-2">
                {service.metrics.cpu !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPU:</span>
                    <span className="font-medium">{service.metrics.cpu.toFixed(1)}%</span>
                  </div>
                )}
                {service.metrics.memory !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Memory:</span>
                    <span className="font-medium">{service.metrics.memory.toFixed(1)}%</span>
                  </div>
                )}
              </div>
            )}
            <div className="text-xs text-muted-foreground pt-2 border-t">
              Last checked: {formatDate(service.lastChecked)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
