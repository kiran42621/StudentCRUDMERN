const mongoose = require('mongoose')

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Student Name required']
        },
        phone: {
            type: String,
            required: [true, 'Student phone number required']
        },
        email: {
            type: String,
            required: [true, 'Student email required']
        },
        address: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Student = mongoose.model('Student', studentSchema)

module.exports = Student;
