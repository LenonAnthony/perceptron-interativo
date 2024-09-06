"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function PerceptronLenon() {
  const [weight1, setWeight1] = useState(1)
  const [weight2, setWeight2] = useState(1)
  const [bias, setBias] = useState(-0.5)
  const [points, setPoints] = useState<[number, number, number][]>([])
  const [testX, setTestX] = useState(5)
  const [testY, setTestY] = useState(5)
  const [testResult, setTestResult] = useState(0)

  useEffect(() => {
    const newPoints: [number, number, number][] = []
    for (let x = 0; x <= 10; x++) {
      for (let y = 0; y <= 10; y++) {
        const output = weight1 * x + weight2 * y + bias > 0 ? 1 : 0
        newPoints.push([x, y, output])
      }
    }
    setPoints(newPoints)
  }, [weight1, weight2, bias])

  const decisionBoundary = () => {
    if (weight2 === 0) return null
    const x1 = 0
    const y1 = (-bias - weight1 * x1) / weight2
    const x2 = 10
    const y2 = (-bias - weight1 * x2) / weight2
    return `M ${x1 * 30} ${300 - y1 * 30} L ${x2 * 30} ${300 - y2 * 30}`
  }

  const handleTest = () => {
    const result = weight1 * testX + weight2 * testY + bias > 0 ? 1 : 0
    setTestResult(result)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Lenon Anthony - UFRPE, Cadeira de EAD</h2>
      <h3 className="text-xl font-semibold text-center">Perceptron Interativo</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight1">Peso 1: {weight1.toFixed(2)}</Label>
            <Slider
              id="weight1"
              min={-2}
              max={2}
              step={0.1}
              value={[weight1]}
              onValueChange={(value) => setWeight1(value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight2">Peso 2: {weight2.toFixed(2)}</Label>
            <Slider
              id="weight2"
              min={-2}
              max={2}
              step={0.1}
              value={[weight2]}
              onValueChange={(value) => setWeight2(value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bias">Viés: {bias.toFixed(2)}</Label>
            <Slider
              id="bias"
              min={-2}
              max={2}
              step={0.1}
              value={[bias]}
              onValueChange={(value) => setBias(value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label>Testar um ponto específico:</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                min="0"
                max="10"
                value={testX}
                onChange={(e) => setTestX(Number(e.target.value))}
                placeholder="X"
              />
              <Input
                type="number"
                min="0"
                max="10"
                value={testY}
                onChange={(e) => setTestY(Number(e.target.value))}
                placeholder="Y"
              />
              <Button onClick={handleTest}>Testar</Button>
            </div>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Cálculo:</h3>
            <p>{`${weight1.toFixed(2)} * ${testX} + ${weight2.toFixed(2)} * ${testY} + ${bias.toFixed(2)} = ${(weight1 * testX + weight2 * testY + bias).toFixed(2)}`}</p>
            <p>{`Saída: ${testResult} (${testResult === 1 ? 'Azul' : 'Vermelho'})`}</p>
          </div>
        </div>
        <div className="space-y-4">
          <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
            <rect x="0" y="0" width="300" height="300" fill="#f0f0f0" />
            {points.map(([x, y, output], index) => (
              <circle
                key={index}
                cx={x * 30}
                cy={300 - y * 30}
                r="4"
                fill={output === 1 ? "#3b82f6" : "#ef4444"}
              />
            ))}
            {decisionBoundary() && (
              <path d={decisionBoundary() ?? ""} stroke="#000" strokeWidth="2" />
            )}
            <circle
              cx={testX * 30}
              cy={300 - testY * 30}
              r="6"
              stroke="#000"
              strokeWidth="2"
              fill={testResult === 1 ? "#3b82f6" : "#ef4444"}
            />
          </svg>
          <svg width="300" height="200" viewBox="0 0 300 200" className="mx-auto">
            <circle cx="50" cy="100" r="40" fill="#f0f0f0" stroke="#000" />
            <text x="50" y="105" textAnchor="middle" className="text-sm">Σ</text>
            <line x1="0" y1="80" x2="50" y2="80" stroke="#000" />
            <line x1="0" y1="120" x2="50" y2="120" stroke="#000" />
            <line x1="90" y1="100" x2="140" y2="100" stroke="#000" />
            <rect x="140" y="80" width="40" height="40" fill="#f0f0f0" stroke="#000" />
            <text x="160" y="105" textAnchor="middle" className="text-sm">Degrau</text>
            <line x1="180" y1="100" x2="230" y2="100" stroke="#000" />
            <circle cx="240" cy="100" r="10" fill="#f0f0f0" stroke="#000" />
            <text x="240" y="105" textAnchor="middle" className="text-xs">y</text>
            <text x="20" y="75" className="text-xs">x₁</text>
            <text x="20" y="135" className="text-xs">x₂</text>
            <text x="70" y="70" className="text-xs">{`w₁ = ${weight1.toFixed(2)}`}</text>
            <text x="70" y="140" className="text-xs">{`w₂ = ${weight2.toFixed(2)}`}</text>
            <text x="50" y="170" className="text-xs">{`viés = ${bias.toFixed(2)}`}</text>
          </svg>
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="font-semibold">Como funciona:</p>
        <p>
          1. O perceptron recebe duas entradas (x₁ e x₂) e produz uma saída (y).
        </p>
        <p>
          2. Cada entrada é multiplicada por seu peso (w₁ e w₂), e os resultados são somados com o viés.
        </p>
        <p>
          3. A soma passa por uma função degrau: se soma &gt; 0, saída = 1 (azul); caso contrário, saída = 0 (vermelho).
        </p>
        <p>
          4. A linha preta no gráfico representa a fronteira de decisão onde soma = 0.
        </p>
        <p>
          5. Ajuste os pesos e o viés para ver como a classificação muda. Teste pontos específicos usando os campos de entrada.
        </p>
      </div>
    </div>
  )
}