const HealthcareProvider = require('./models/HealthcareProvider'); 
const PatientReferral = require('./models/PatientReferral'); 

// Create a new Healthcare Provider
exports.createHealthcareProvider = async (req, res) => {
  try {
    const newProvider = new HealthcareProvider(req.body);
    const savedProvider = await newProvider.save();
    res.status(201).json(savedProvider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Healthcare Providers
exports.getAllHealthcareProviders = async (req, res) => {
  try {
    const providers = await HealthcareProvider.find();
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Healthcare Provider by ID
exports.getHealthcareProviderById = async (req, res) => {
  try {
    const provider = await HealthcareProvider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Healthcare Provider by ID
exports.updateHealthcareProviderById = async (req, res) => {
  try {
    const updatedProvider = await HealthcareProvider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProvider) return res.status(404).json({ message: 'Provider not found' });
    res.status(200).json(updatedProvider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Healthcare Provider by ID
exports.deleteHealthcareProviderById = async (req, res) => {
  try {
    const deletedProvider = await HealthcareProvider.findByIdAndDelete(req.params.id);
    if (!deletedProvider) return res.status(404).json({ message: 'Provider not found' });
    res.status(200).json({ message: 'Provider deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createPatientReferral = async (req, res) => {
    try {
        const newReferral = new PatientReferral(req.body);
        const savedReferral = await newReferral.save();
        res.status(201).json(savedReferral);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    }

// Get all Patient Referrals
exports.getAllPatientReferrals = async (req, res) => {
    try {
        const referrals = await PatientReferral.find();
        res.status(200).json(referrals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

// Get a Patient Referral by ID
exports.getPatientReferralById = async (req, res) => {
    try {
        const referral = await PatientReferral.findById(req.params.id);
        if (!referral) return res.status(404).json({ message: 'Referral not found' });
        res.status(200).json(referral);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

// Update a Patient Referral by ID
exports.updatePatientReferralById = async (req, res) => {
    try {
        const updatedReferral = await PatientReferral.findByIdAndUpdate(req
        .params
        .id, req.body, {new: true});
        if (!updatedReferral) return res.status(404).json({message: 'Referral not found'});
        res.status(200).json(updatedReferral);

    } catch (error) {
        res.status(400).json({message: error.message});
    }
    }

// Delete a Patient Referral by ID
exports.deletePatientReferralById = async (req, res) => {
    try {
        const deletedReferral = await PatientReferral.findByIdAndDelete(req.params.id);
        if (!deletedReferral) return res.status(404).json({message: 'Referral not found'});
        res.status(200).json({message: 'Referral deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    }
