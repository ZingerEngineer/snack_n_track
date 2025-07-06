import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const medicalConditions = [
  {
    conditionName: 'Diabetes',
    decscription:
      'A group of metabolic disorders characterized by high blood sugar levels.',
    symptoms:
      'Increased thirst, frequent urination, increased hunger, fatigue, blurred vision',
    treatment:
      'Diet modification, exercise, medication (insulin or oral medications)',
    medications: 'Insulin, Metformin, Sulfonylureas, DPP-4 inhibitors'
  },
  {
    conditionName: 'Hypertension',
    decscription:
      'High blood pressure, a condition where blood pressure is consistently elevated.',
    symptoms: 'Often no symptoms, headaches, shortness of breath, nosebleeds',
    treatment: 'Lifestyle changes, medications, regular monitoring',
    medications:
      'ACE inhibitors, ARBs, Beta-blockers, Diuretics, Calcium channel blockers'
  },
  {
    conditionName: 'High Cholesterol',
    decscription: 'Elevated levels of cholesterol in the blood.',
    symptoms: 'Usually no symptoms, may cause heart disease or stroke',
    treatment: 'Diet changes, exercise, statins, lifestyle modifications',
    medications:
      'Statins (Atorvastatin, Simvastatin), Ezetimibe, PCSK9 inhibitors'
  },
  {
    conditionName: 'Cardiovascular Disease',
    decscription: 'Conditions affecting the heart and blood vessels.',
    symptoms: 'Chest pain, shortness of breath, fatigue, irregular heartbeat',
    treatment: 'Medications, lifestyle changes, surgery (in severe cases)',
    medications: 'Beta-blockers, ACE inhibitors, Antiplatelet agents, Statins'
  },
  {
    conditionName: 'Celiac Disease',
    decscription: 'An autoimmune disorder triggered by gluten consumption.',
    symptoms: 'Abdominal pain, diarrhea, bloating, weight loss, fatigue',
    treatment: 'Strict gluten-free diet',
    medications: 'Usually none required; focus on dietary management'
  },
  {
    conditionName: 'Lactose Intolerance',
    decscription:
      'Inability to digest lactose due to lactase enzyme deficiency.',
    symptoms: 'Bloating, diarrhea, gas, stomach cramps after consuming dairy',
    treatment: 'Lactose-free diet, lactase enzyme supplements',
    medications: 'Lactase enzyme supplements (Lactaid)'
  },
  {
    conditionName: 'Irritable Bowel Syndrome (IBS)',
    decscription:
      'A functional gastrointestinal disorder affecting the large intestine.',
    symptoms: 'Abdominal pain, bloating, diarrhea, constipation, gas',
    treatment: 'Dietary changes, stress management, medications',
    medications: 'Antispasmodics, Loperamide, Lubiprostone, Rifaximin'
  },
  {
    conditionName: 'Chronic Kidney Disease',
    decscription: 'Progressive loss of kidney function over time.',
    symptoms: 'Fatigue, swelling, changes in urination, high blood pressure',
    treatment: 'Blood pressure control, diet modification, medications',
    medications:
      'ACE inhibitors, ARBs, Phosphate binders, EPO stimulating agents'
  },
  {
    conditionName: 'Obesity',
    decscription: 'Excessive body weight that increases health risks.',
    symptoms: 'Excess weight, difficulty with physical activity, sleep apnea',
    treatment: 'Diet, exercise, behavioral therapy, medications, surgery',
    medications: 'Orlistat, Phentermine-topiramate, Liraglutide, Semaglutide'
  },
  {
    conditionName: 'Osteoporosis',
    decscription: 'A condition where bones become weak and brittle.',
    symptoms:
      'Often no symptoms until fracture occurs, back pain, loss of height',
    treatment: 'Calcium and vitamin D supplements, exercise, medications',
    medications: 'Bisphosphonates, Denosumab, Teriparatide, Raloxifene'
  },
  {
    conditionName: 'Anemia (Iron-Deficiency)',
    decscription:
      'A condition where the body lacks enough healthy red blood cells.',
    symptoms:
      'Fatigue, weakness, pale skin, shortness of breath, cold hands/feet',
    treatment: 'Iron supplements, dietary changes, treating underlying causes',
    medications: 'Iron sulfate, Iron fumarate, Iron gluconate, Intravenous iron'
  },
  {
    conditionName: 'Cancer',
    decscription: 'A group of diseases involving abnormal cell growth.',
    symptoms:
      'Varies by type: fatigue, weight loss, pain, lumps, changes in skin',
    treatment: 'Surgery, chemotherapy, radiation therapy, immunotherapy',
    medications:
      'Varies by cancer type and stage (chemotherapy drugs, targeted therapy)'
  },
  {
    conditionName: 'Gastroesophageal Reflux Disease (GERD)',
    decscription:
      'A digestive disorder affecting the lower esophageal sphincter.',
    symptoms: 'Heartburn, acid reflux, chest pain, difficulty swallowing',
    treatment: 'Lifestyle changes, medications, surgery (in severe cases)',
    medications: 'Proton pump inhibitors (PPIs), H2 blockers, Antacids'
  },
  {
    conditionName: 'Pregnancy',
    decscription:
      'A physiological state requiring special nutritional considerations.',
    symptoms: 'Morning sickness, fatigue, food aversions, cravings',
    treatment: 'Prenatal care, proper nutrition, prenatal vitamins',
    medications: 'Prenatal vitamins, Folic acid, Iron supplements, Calcium'
  },
  {
    conditionName: 'HIV/AIDS',
    decscription: 'A condition affecting the immune system.',
    symptoms: 'Fatigue, weight loss, frequent infections, fever, night sweats',
    treatment:
      'Antiretroviral therapy (ART), nutritional support, infection prevention',
    medications:
      'Combination antiretroviral therapy (cART), Opportunistic infection prophylaxis'
  },
  {
    conditionName: 'Liver Disease',
    decscription: 'Conditions affecting liver function and health.',
    symptoms: 'Fatigue, abdominal pain, jaundice, dark urine, pale stools',
    treatment:
      'Depends on type: lifestyle changes, medications, liver transplant',
    medications:
      'Varies by condition: Antiviral drugs, Immunosuppressants, Diuretics'
  },
  {
    conditionName: 'Pancreatitis',
    decscription: 'Inflammation of the pancreas.',
    symptoms: 'Severe abdominal pain, nausea, vomiting, fever, rapid pulse',
    treatment:
      'Pain management, dietary changes, enzyme supplements, treatment of underlying causes',
    medications: 'Pain relievers, Pancreatic enzymes, Proton pump inhibitors'
  },
  {
    conditionName: 'Gout',
    decscription: 'A form of arthritis caused by high levels of uric acid.',
    symptoms:
      'Sudden severe joint pain, swelling, redness, warmth in affected joints',
    treatment:
      'Medications to reduce inflammation and uric acid levels, dietary changes',
    medications: 'NSAIDs, Colchicine, Corticosteroids, Allopurinol, Febuxostat'
  }
]

async function seedMedicalConditions() {
  console.log('🌱 Starting medical conditions seed...')

  try {
    // Clear existing medical conditions if any
    await prisma.medicalCondition.deleteMany({})
    console.log('🧹 Cleared existing medical conditions')

    // Create medical conditions
    for (const condition of medicalConditions) {
      await prisma.medicalCondition.create({
        data: condition
      })
      console.log(`✅ Created condition: ${condition.conditionName}`)
    }

    console.log(
      `🎉 Successfully seeded ${medicalConditions.length} medical conditions!`
    )
  } catch (error) {
    console.error('❌ Error seeding medical conditions:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedMedicalConditions()
    .then(() => {
      console.log('🌱 Medical conditions seeding completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Medical conditions seeding failed:', error)
      process.exit(1)
    })
}

export default seedMedicalConditions

