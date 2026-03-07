export interface ChartDataset {
  label: string
  data: number[]
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}