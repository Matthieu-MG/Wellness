import {DeserializeTreatment} from './JSONSerializer'

function isFutureDate(date) {
    try {

        //* Check if empty
        if(date === null || date.length === 0) {
            return false;
        }

        //* Check if correct format
        const dateSplit = date.split('/')
        if(dateSplit.length !== 3) return false;

        const [day, month, year] = dateSplit.map(Number)
        if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

        const inputDate = new Date(year, month - 1, day)

        const isDateValid = inputDate.getFullYear() === year && 
                            inputDate.getMonth() === month - 1 && 
                            inputDate.getDate() === day;

        if(!isDateValid) {
            return false;
        }

        //* Check if date is greater than current
        const today = new Date()
        return inputDate > today;
    }
    catch (error) {
        console.log(`ERROR from isFutureDate for date ${date} : error -> ${error}`)
        return false;
    }
}

async function ValidateTreatment(treatment) {
    let messages = [];
    let errors = true;

    console.log(`Validating ${JSON.stringify(treatment, null, 2)}`)
    const stringEmptyOrNull = (s) => s === null || s.length === 0

    try {
        treatment.treatmentName === null || treatment.treatmentName.length === 0 ? messages.push('Treatment Name Missing') : null
        
        !Array.isArray(treatment.medications) || treatment.medications < 1 ? messages.push('Treatment should have at least one medication') : null
        treatment.medications.forEach( (m, index) => {
            
            if(stringEmptyOrNull(m.name) || stringEmptyOrNull(m.dosage)) {
                messages.push("Medication fields missing at medication no.", index + 1);
            }

            if(m.isAlternating && ( stringEmptyOrNull(m.alternate.name) || stringEmptyOrNull(m.alternate.dosage) )) {
                messages.push("Alternate Medications fields empty at medication no.", index + 1)
            }

        });

        !Array.isArray(treatment.times) || treatment.times < 1 ? messages.push('Treatment should have at least one time schedule') : null
        parseInt(treatment.frequency) !== 1 && (!Array.isArray(treatment.days) || treatment.days.length < 1) ? messages.push('Days should be assigned if treatment is not taken daily') : null
        treatment.hasFinishDate && !isFutureDate(treatment.finishDate) ? messages.push('Please provide a proper FUTURE date dd/mm/yyyy') : null
        
        //* Ensure treatmentName is unique
        const treatments = await DeserializeTreatment('treatments.json');
        for (let i = 0; i < treatments.length; i++) {
            const t = treatments[i];

            if(treatment.treatmentName === t.treatmentName) {
                messages.push("Treatment Name should be Unique.");
                break;
            }
        }

        if(messages.length === 0) {
            errors = false
        }
        
        return {
            messages: messages,
            error: errors
        }
    }
    catch (error) {
        return {
            messages: [`An unexpected error occured while validating treatment: error -> ${error}`],
            error: true
        }
    }
}

// TODO Only allow pdf and images
function ValidateMedicalRecord(record) {
    let response = {
        ok: false,
        messages: []
    }

    try {

        if(record.name === null || record.name.length === 0) {
            response.messages.push("Name should not be empty");
        }

        if(record.uri === null || record.uri.length === 0) {
            response.messages.push("A file should be selected");
        }

        if(response.messages.length === 0) {
            response.ok = true;
        }

        return response;
    }
    catch (error) {
        console.error("ERROR from ValidateMedicalRecord (Validators.js): ", error);
        response.messages.push("Unexpected Error occured while Validating record");
        return response;
    }
}

export {ValidateTreatment, ValidateMedicalRecord}