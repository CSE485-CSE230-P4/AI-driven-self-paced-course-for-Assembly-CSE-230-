//PROF VIEW COMPONENT

import { useState, useEffect } from 'react';
import { ModuleAnalytics, QuestionAnalytics } from '../types/teacher';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

interface MasteryCheckBuilderProps {
  modules: ModuleAnalytics[];
  onCreateTest: (questions: QuestionAnalytics[], moduleName: string) => void;
}

type PerformanceFilter = 'all' | 'high' | 'medium' | 'low' | 'critical';

export function MasteryCheckBuilder({ modules, onCreateTest }: MasteryCheckBuilderProps) {
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedModule, setSelectedModule] = useState<string>('');

  const selectedModuleData = modules.find(m => m.moduleName === selectedModule);

  const handleCreateTest = () => {
    // Empty function - no test generation yet
  };

  return (
    <Card className="border-2 border-yellow-600 shadow-sm">
      <CardHeader className="border-b border-yellow-600/20">
        <CardTitle className="text-red-900">
          Question Generator
        </CardTitle>
        <CardDescription>
          Configure question parameters and select module
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Configuration Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Number of Questions */}
          <div className="space-y-2">
            <Label htmlFor="question-count" className="text-red-900">
              Maximum Questions for Exam
            </Label>
            <Input
              id="question-count"
              type="number"
              min={1}
              max={50}
              value={questionCount}
              onChange={(e) => setQuestionCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              className="border-gray-300"
            />
            <p className="text-xs text-gray-500">
              Select between 1-50 questions
            </p>
          </div>

          {/* Module Selection */}
          <div className="space-y-2">
            <Label htmlFor="module-select" className="text-red-900">
              Select Module
            </Label>
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger id="module-select" className="border-gray-300">
                <SelectValue placeholder="Choose a module..." />
              </SelectTrigger>
              <SelectContent>
                {modules.map(module => (
                  <SelectItem key={module.moduleName} value={module.moduleName}>
                    {module.moduleName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              {selectedModuleData?.questions.length || 0} questions available
            </p>
          </div>
        </div>

        {/* AI Bot Section */}
        <div className="border-2 border-yellow-600/50 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 p-6">
          <div className="space-y-3">
            <h3 className="text-red-900">AI Question Assistant</h3>
            <p className="text-sm text-gray-700">
              Ready to help you generate intelligent questions based on your selected module and student performance data.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}