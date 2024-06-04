import Tender from "../models/tender.js";
export async function createTender(req, res) {
    const {
        entryDate,
        bidStartDate,
        closingDate,
        tenderId,
        tenderRefNo,
        title,
        organisationChain,
        emdAmount,
        tenderValue,
        typeOfBid,
        scopeOfWork,
        validity,
        tenderPlatform,
        state,
        status,
        remark
      } = req.body;
    
      // Check if any required field is missing
      if (
        !entryDate ||
        !bidStartDate ||
        !closingDate ||
        !tenderId ||
        !tenderRefNo ||
        !title ||
        !organisationChain ||
        !emdAmount ||
        !tenderValue ||
        !typeOfBid ||
        !scopeOfWork ||
        !validity ||
        !tenderPlatform ||
        !state ||
        !status ||
        !remark
      ) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    
      try {
        const newTender = new Tender(req.body);
        const savedTender = await newTender.save();
        res.status(201).json(savedTender);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }

    
  // Controller function to get all Tenders
  export async function getAllTenders(req, res) {
    try {
      const tenders = await Tender.find();
      res.json(tenders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  // Controller function to get a single Tender by ID
  export async function getTenderById(req, res) {
    try {
      const tender = await Tender.findById(req.params.id);
      if (!tender) {
        return res.status(404).json({ message: 'Tender not found' });
      }
      res.json(tender);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  // Controller function to update a Tender by ID
  export async function updateTender(req, res) {
    try {
      const updatedTender = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTender) {
        return res.status(404).json({ message: 'Tender not found' });
      }
      res.json(updatedTender);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  // Controller function to delete a Tender by ID
  export async function deleteTender(req, res) {
    try {
      const deletedTender = await Tender.findByIdAndDelete(req.params.id);
      if (!deletedTender) {
        return res.status(404).json({ message: 'Tender not found' });
      }
      res.json({ message: 'Tender deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }