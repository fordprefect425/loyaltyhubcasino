
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PointsTransaction, PointsTransactionType } from '@/models/loyalty';
import { CalendarCheck, CircleArrowDown, CircleArrowUp } from 'lucide-react';

interface PointsHistoryProps {
  transactions: PointsTransaction[];
}

const PointsHistory: React.FC<PointsHistoryProps> = ({ transactions }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <CalendarCheck className="h-5 w-5 mr-2 text-loyalty-purple" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Your recent CC Points transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map(transaction => (
            <div key={transaction.id} className="flex justify-between items-center pb-3 border-b last:border-0 last:pb-0">
              <div className="flex items-start">
                {transaction.type === PointsTransactionType.Earned ? (
                  <CircleArrowUp className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                ) : (
                  <CircleArrowDown className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === PointsTransactionType.Earned 
                  ? 'text-green-600' 
                  : 'text-amber-600'
              }`}>
                {transaction.type === PointsTransactionType.Earned ? '+' : '-'}
                {transaction.amount} Points
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PointsHistory;
