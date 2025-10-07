import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  Target, 
  Code, 
  FileText, 
  Lightbulb,
  ExternalLink,
  Github
} from 'lucide-react';

interface ProjectResource {
  type: string;
  title: string;
  description?: string;
  duration?: string;
  completed?: boolean;
  author?: string;
  url?: string;
}

interface ProjectDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource: ProjectResource | null;
}

export const ProjectDetailDialog = ({ open, onOpenChange, resource }: ProjectDetailDialogProps) => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [projectProgress, setProjectProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!resource) return null;

  const isProject = resource.type === 'project';
  const isPractice = resource.type === 'practice';

  // Generate project steps based on type
  const projectSteps = isProject
    ? [
        'Plan project structure and features',
        'Set up development environment',
        'Implement core functionality',
        'Add styling and UI components',
        'Test and debug',
        'Deploy and document'
      ]
    : [
        'Understand the requirements',
        'Break down into smaller tasks',
        'Complete practice exercises',
        'Review and refine solutions',
        'Test edge cases'
      ];

  const toggleStep = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepIndex));
      setProjectProgress(Math.max(0, projectProgress - (100 / projectSteps.length)));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
      setProjectProgress(Math.min(100, projectProgress + (100 / projectSteps.length)));
    }
  };

  const handleStartProject = () => {
    const projectType = isProject ? 'project' : 'practice';
    const encodedTitle = encodeURIComponent(resource.title);
    navigate(`/ide?project=${encodedTitle}&type=${projectType}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl text-foreground flex items-center gap-2">
                {isProject ? <Code className="w-6 h-6 text-purple-500" /> : <Target className="w-6 h-6 text-green-500" />}
                {resource.title}
              </DialogTitle>
              <DialogDescription className="mt-2">
                {resource.description || 'Work on this hands-on project to strengthen your skills'}
              </DialogDescription>
            </div>
            <Badge variant="outline" className={isProject ? "text-purple-500 border-purple-500/30" : "text-green-500 border-green-500/30"}>
              {resource.duration}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Overview */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(projectProgress)}%</span>
              </div>
              <Progress value={projectProgress} className="h-2" />
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{resource.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>{completedSteps.length}/{projectSteps.length} steps</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Steps */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-golden" />
              <h3 className="font-semibold text-foreground">
                {isProject ? 'Project Steps' : 'Practice Tasks'}
              </h3>
            </div>
            {projectSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                  completedSteps.includes(index)
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-accent/5 border-accent/10 hover:border-accent/20'
                }`}
                onClick={() => toggleStep(index)}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    completedSteps.includes(index)
                      ? 'bg-green-500 border-green-500'
                      : 'border-muted-foreground/30'
                  }`}
                >
                  {completedSteps.includes(index) && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className={`flex-1 ${completedSteps.includes(index) ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Tips & Resources */}
          <Card className="bg-accent/5 border-accent/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-golden" />
                <h3 className="font-semibold text-foreground">Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {isProject ? (
                  <>
                    <li>• Start with a clear plan before coding</li>
                    <li>• Break down the project into smaller, manageable tasks</li>
                    <li>• Commit your code regularly to track progress</li>
                    <li>• Don't hesitate to look up documentation when stuck</li>
                    <li>• Test features as you build them</li>
                  </>
                ) : (
                  <>
                    <li>• Practice consistently, even if just 15 minutes daily</li>
                    <li>• Focus on understanding concepts, not memorizing solutions</li>
                    <li>• Try to solve problems without looking at hints first</li>
                    <li>• Review your solutions and optimize them</li>
                    <li>• Keep notes of patterns and techniques you learn</li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Project Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Project Notes</label>
            <Textarea
              placeholder="Add notes, challenges faced, solutions found, or ideas for improvement..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-golden hover:bg-golden/90"
              onClick={handleStartProject}
            >
              <Code className="w-4 h-4 mr-2" />
              Start {isProject ? 'Project' : 'Practice'}
            </Button>
            {isProject && (
              <Button variant="outline">
                <Github className="w-4 h-4 mr-2" />
                Create Repo
              </Button>
            )}
            {resource.url && (
              <Button variant="outline" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Resources
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
