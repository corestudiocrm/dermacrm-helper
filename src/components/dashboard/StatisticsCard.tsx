
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface StatisticsCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: React.ReactNode;
  valueDescription: string;
  navigateTo: string;
  buttonText: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  icon,
  title,
  description,
  value,
  valueDescription,
  navigateTo,
  buttonText,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-medium">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {value}
        </div>
        <p className="text-sm text-muted-foreground">
          {valueDescription}
        </p>
      </CardContent>
      <CardFooter className="pb-4">
        <Button 
          variant="ghost" 
          className="w-full text-core-700 hover:text-core-800 hover:bg-core-50"
          onClick={() => navigate(navigateTo)}
        >
          {buttonText}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StatisticsCard;
