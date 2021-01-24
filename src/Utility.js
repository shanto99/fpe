const Utility = {
    getHumanizedDate: function(dateString) {
        return new Date(dateString).toLocaleDateString();
    },
    snakeCaseToNormal: function(inputString) {
      inputString = inputString.replaceAll('_', ' ');
      return inputString;
    },
    validateForm: function(fields) {
        let errors = {};
        for(let field in fields) {
            if(fields.hasOwnProperty(field)) {
                let fieldObj = fields[field];
                if(fieldObj.isRequired) {
                    if(!fieldObj.value || fieldObj.value === "") {
                        errors[field] = [`${this.snakeCaseToNormal(field)} is required`];
                        break;
                    }
                }
                if(fieldObj.type) {}
                let type = fieldObj.type;
                if(type === 'number') {
                    let value=fieldObj.value;
                    if (value && value!== "" && isNaN(value)){
                        errors[field] = [`${this.snakeCaseToNormal(field)} should be number`];
                        break;
                    }
                }
            }
        }
        return errors;
    }
}

export default Utility;