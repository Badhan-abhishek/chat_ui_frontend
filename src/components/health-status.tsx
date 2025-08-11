'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { healthApi } from '@/lib/api-client';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface HealthStatus {
    api: 'healthy' | 'unhealthy' | 'loading';
    chat: 'healthy' | 'unhealthy' | 'loading';
}

export function HealthStatus() {
    const [status, setStatus] = useState<HealthStatus>({
        api: 'loading',
        chat: 'loading'
    });

    useEffect(() => {
        const checkHealth = async () => {
            try {
                // Check root endpoint
                await healthApi.root();
                setStatus(prev => ({ ...prev, api: 'healthy' }));
            } catch {
                setStatus(prev => ({ ...prev, api: 'unhealthy' }));
            }

            try {
                // Check chat health
                const chatHealth = await healthApi.chatHealth();
                setStatus(prev => ({
                    ...prev,
                    chat: chatHealth.status === 'healthy' ? 'healthy' : 'unhealthy'
                }));
            } catch {
                setStatus(prev => ({ ...prev, chat: 'unhealthy' }));
            }
        };

        checkHealth();
        const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

        return () => clearInterval(interval);
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'healthy':
                return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />;
            case 'unhealthy':
                return <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />;
            default:
                return <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'healthy':
                return 'bg-green-50 border-green-200';
            case 'unhealthy':
                return 'bg-red-50 border-red-200';
            default:
                return 'bg-muted border-border';
        }
    };

    return (
        <Card className={`palantir-shadow p-2 sm:p-3 ${getStatusColor(status.api)}`}>
            <div className="flex items-center justify-between text-xs palantir-caption">
                <div className="flex items-center gap-1 sm:gap-2">
                    {getStatusIcon(status.api)}
                    <span>API</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    {getStatusIcon(status.chat)}
                    <span>Chat</span>
                </div>
            </div>
        </Card>
    );
}