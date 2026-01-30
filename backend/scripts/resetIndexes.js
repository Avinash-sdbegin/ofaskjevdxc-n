const mongoose = require('mongoose');
require('dotenv').config();

const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

async function resetIndexes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Drop all indexes on Patient collection
    console.log('Dropping Patient collection indexes...');
    try {
      await Patient.collection.dropIndexes();
      console.log('Patient indexes dropped');
    } catch (e) {
      console.log('No indexes to drop for Patient');
    }

    // Drop all indexes on Doctor collection
    console.log('Dropping Doctor collection indexes...');
    try {
      await Doctor.collection.dropIndexes();
      console.log('Doctor indexes dropped');
    } catch (e) {
      console.log('No indexes to drop for Doctor');
    }

    // Rebuild indexes by syncing with schema
    console.log('Rebuilding Patient indexes...');
    await Patient.syncIndexes();
    console.log('Patient indexes rebuilt');

    console.log('Rebuilding Doctor indexes...');
    await Doctor.syncIndexes();
    console.log('Doctor indexes rebuilt');

    console.log('✅ All indexes reset successfully');
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error resetting indexes:', error.message);
    process.exit(1);
  }
}

resetIndexes();
