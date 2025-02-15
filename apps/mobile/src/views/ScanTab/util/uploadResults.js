const formatNutritionString = (input) => {
    // Extended unit mapping: keys are lowercased possible unit strings; values are the standardized format.
    const unitMap = {
        // Mass:
        g: 'g',
        gram: 'g',
        grams: 'g',
        kg: 'kg',
        kilogram: 'kg',
        kilograms: 'kg',
        kgrams: 'kg',
        mg: 'mg',
        milligram: 'mg',
        milligrams: 'mg',
        ug: 'µg',
        mcg: 'µg',
        microgram: 'µg',
        micrograms: 'µg',
        µg: 'µg',
        // Volume:
        l: 'L',
        liter: 'L',
        litre: 'L',
        liters: 'L',
        litres: 'L',
        ml: 'mL',
        milliliter: 'mL',
        milliliters: 'mL',
        millilitre: 'mL',
        millilitres: 'mL',
        ul: 'µL',
        microliter: 'µL',
        microliters: 'µL',
        µl: 'µL',
        // Energy:
        kcal: 'kcal',
        cal: 'cal', // Depending on context, you might want to standardize calories to kcal.
        calorie: 'kcal',
        calories: 'kcal',
        kj: 'kJ',
        kilojoule: 'kJ',
        kilojoules: 'kJ',
        // Additional units that might appear:
        oz: 'oz',
        ounce: 'oz',
        ounces: 'oz',
        lb: 'lb',
        pound: 'lb',
        pounds: 'lb',
    };
    const regex = /([\d.]+)\s*([a-zA-Zµ]+)$/;
    const match = input.match(regex);
    if (match) {
        const numberPart = match[1];
        const unitFound = match[2].toLowerCase();
        // Look up the standardized unit (if available); otherwise, use the original unit.
        const standardizedUnit = unitMap[unitFound] || unitFound;
        return `${numberPart} ${standardizedUnit}`;
    }
    else {
        // No valid unit found at the end of the string; return the input unchanged or apply default formatting.
        return input;
    }
};
export default formatNutritionString;
