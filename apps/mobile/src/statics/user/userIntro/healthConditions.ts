import { type Option } from './shared'
export interface HealthCondition extends Option {
  value:
    | 'diabetes'
    | 'hypertension'
    | 'high_cholesterol'
    | 'cardiovascular_disease'
    | 'celiac_disease'
    | 'lactose_intolerance'
    | 'ibs'
    | 'chronic_kidney_disease'
    | 'obesity'
    | 'osteoporosis'
    | 'anemia'
    | 'cancer'
    | 'gerd'
    | 'pregnancy'
    | 'hiv_aids'
    | 'liver_disease'
    | 'pancreatitis'
    | 'gout'
}

export const healthConditions = [
  { label: 'Diabetes', value: 'diabetes' },
  { label: 'Hypertension', value: 'hypertension' },
  { label: 'High Cholesterol', value: 'high_cholesterol' },
  { label: 'Cardiovascular Disease', value: 'cardiovascular_disease' },
  { label: 'Celiac Disease', value: 'celiac_disease' },
  { label: 'Lactose Intolerance', value: 'lactose_intolerance' },
  { label: 'Irritable Bowel Syndrome (IBS)', value: 'ibs' },
  { label: 'Chronic Kidney Disease', value: 'chronic_kidney_disease' },
  { label: 'Obesity', value: 'obesity' },
  { label: 'Osteoporosis', value: 'osteoporosis' },
  { label: 'Anemia (Iron-Deficiency)', value: 'anemia' },
  { label: 'Cancer', value: 'cancer' },
  { label: 'Gastroesophageal Reflux Disease (GERD)', value: 'gerd' },
  { label: 'Pregnancy', value: 'pregnancy' },
  { label: 'HIV/AIDS', value: 'hiv_aids' },
  { label: 'Liver Disease', value: 'liver_disease' },
  { label: 'Pancreatitis', value: 'pancreatitis' },
  { label: 'Gout', value: 'gout' },
]
