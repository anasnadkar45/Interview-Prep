
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Code, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChallengeCardProps {
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  prompt: string;
  solution: React.ReactNode;
  className?: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  number,
  title,
  difficulty,
  description,
  prompt,
  solution,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-amber-100 text-amber-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <div 
      className={cn(
        "rounded-xl border p-6 mb-8 card-hover subtle-shadow transition-all duration-300",
        isExpanded ? "bg-card" : "bg-card/50",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {number}
            </span>
            <h3 className="text-xl font-medium">{title}</h3>
            <span className={cn("text-xs px-2 py-1 rounded-full font-medium", difficultyColor[difficulty])}>
              {difficulty}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-primary/80 hover:text-primary transition-colors focus-ring rounded-md px-2 py-1"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              <span>Hide</span>
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              <span>Show</span>
            </>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-6 animate-fade-in">
          <Tabs defaultValue="prompt">
            <TabsList className="mb-4">
              <TabsTrigger value="prompt" className="flex items-center gap-2">
                <FileText size={14} />
                <span>Problem</span>
              </TabsTrigger>
              <TabsTrigger value="solution" className="flex items-center gap-2">
                <Code size={14} />
                <span>Solution</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="prompt" className="animate-slide-up">
              <div className="rounded-lg bg-muted/50 p-4">
                <pre className="text-sm whitespace-pre-wrap font-mono">{prompt}</pre>
              </div>
            </TabsContent>
            <TabsContent value="solution" className="animate-slide-up">
              <div className="rounded-lg bg-muted/50 p-4 overflow-x-auto">
                {solution}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
