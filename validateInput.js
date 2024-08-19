
// Enhanced validation example (to be added in one of your controllers)
const validateInput = (req, res, next) => {
    const { startDate, endDate, phoneNumber } = req.body;
    
    // Check if start date is before end date
    if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).send('End date must be after start date');
    }
    
    // Validate phone number format
    const phoneRegex = /^\+32\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/;
    if (!phoneRegex.test(phoneNumber)) {
        return res.status(400).send('Invalid phone number format. Expected format: +32 444 44 44 44');
    }
    
    next();
};

module.exports = validateInput;
