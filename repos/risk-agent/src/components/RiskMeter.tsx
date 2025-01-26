interface RiskMeterProps {
  risk: string;
}

const RiskMeter = ({ risk }: RiskMeterProps) => {
  const getRiskScore = (risk: string): number => {
    switch (risk.toLowerCase()) {
      case 'low': return 3;
      case 'medium': return 6;
      case 'high': return 9;
      default: return 5;
    }
  }

  const score = getRiskScore(risk)
  const percentage = (score / 10) * 100

  const getColor = (score: number): string => {
    if (score <= 3) return 'bg-green-500';
    if (score <= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Score: {score}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className={`h-2.5 rounded-full ${getColor(score)} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
        <span>Low Risk</span>
        <span>High Risk</span>
      </div>
    </div>
  )
}

export default RiskMeter;