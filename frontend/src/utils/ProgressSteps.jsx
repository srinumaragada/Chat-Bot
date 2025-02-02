import { Check } from 'lucide-react';
import { cn } from '../lib/utils';


const ProgressSteps = ({ steps, currentStep }) => {
  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-orange-200" />
      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-orange-600 transition-all duration-500"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      />
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
                  {
                    'border-orange-600 bg-orange-600 text-white': isCompleted || isCurrent,
                    'border-gray-300 bg-white': !isCompleted && !isCurrent,
                  }
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;