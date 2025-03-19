const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parser');
const Csvfile = require('../models/csvfile.model');

// File upload handler
const handleFileUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    const file = req.file;
    console.log('Uploaded file:', file);

    // Get the file path from multer
    const filePath = file.path;
    
    // Read file content for inspection
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('First 200 chars of file:', fileContent.substring(0, 200));
    
    // Try to detect the delimiter by checking first line
    let delimiter = ',';
    const firstLine = fileContent.split('\n')[0];
    
    if (firstLine.includes(';')) {
      delimiter = ';';
      console.log('Detected semicolon delimiter');
    } else if (firstLine.includes('\t')) {
      delimiter = '\t';
      console.log('Detected tab delimiter');
    }
    
    // Process CSV file with detected delimiter
    const payments = [];
    const lines = fileContent.split('\n').filter(line => line.trim());
    
    // Parse headers - first line
    const headers = lines[0].split(delimiter).map(h => h.trim());
    console.log('Detected headers:', headers);
    
    // Process data rows
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(delimiter).map(v => v.trim());
      console.log(`Row ${i} values:`, values);
      
      // Skip empty rows
      if (values.length <= 1) continue;
      
      // Map values to column positions
      let origAmountIndex = headers.findIndex(h => h.toLowerCase().includes('orig') || h.toLowerCase().includes('amount'));
      let referenceIndex = headers.findIndex(h => h.toLowerCase().includes('reference'));
      let typeIndex = headers.findIndex(h => h.toLowerCase().includes('type'));
      let dateCompletedIndex = headers.findIndex(h => h.toLowerCase().includes('completed') || (h.toLowerCase().includes('date') && headers.indexOf(h) === headers.findIndex(x => x.toLowerCase().includes('date'))));
      let dateStartedIndex = headers.findIndex(h => h.toLowerCase().includes('started'));
      let descriptionIndex = headers.findIndex(h => h.toLowerCase().includes('description'));
      
      // If indexes aren't found, try position-based approach (based on your screenshot)
      if (origAmountIndex === -1) origAmountIndex = 0;
      if (referenceIndex === -1) referenceIndex = 1;
      if (typeIndex === -1) typeIndex = 2;
      if (dateCompletedIndex === -1) dateCompletedIndex = 3;
      if (dateStartedIndex === -1) dateStartedIndex = 4;
      if (descriptionIndex === -1) descriptionIndex = 5;
      
      // Extract values using indexes
      const origAmount = values[origAmountIndex] || '0';
      const reference = values[referenceIndex] || '';
      const type = values[typeIndex] || '';
      const dateCompleted = values[dateCompletedIndex] || '';
      const dateStarted = values[dateStartedIndex] || '';
      const description = values[descriptionIndex] || '';
      
      console.log('Extracted values:', {
        origAmount, reference, type, dateCompleted, dateStarted, description
      });
      
      // Validate required fields
      if (!reference || !type || !description) {
        console.log(`Row ${i} - Skipping due to missing required fields`);
        continue;
      }
      
      // Create payment object
      try {
        const payment = {
          origAmount: parseFloat(origAmount.replace(/[^\d.-]/g, '')) || 0,
          reference,
          type,
          dateCompleted, // Keep as string
          dateStarted, // Keep as string
          description,
          fileName: file.originalname || file.filename,
          fileSize: file.size
        };
        
        payments.push(payment);
        console.log(`Row ${i} - Valid payment data created`);
      } catch (err) {
        console.error(`Row ${i} - Error creating payment:`, err);
      }
    }
    
    // Save to database
    if (payments.length > 0) {
      await Csvfile.insertMany(payments);
      res.status(200).json({
        success: true,
        message: `CSV data processed and saved successfully! ${payments.length} records imported.`,
        count: payments.length,
        sample: payments.slice(0, 2)
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'No valid data found in CSV file. Please check the CSV format and data.',
        debug: {
          rowCount: lines.length - 1,
          foundRows: lines.length - 1,
          validRows: payments.length,
          headers: headers
        }
      });
    }
  } catch (error) {
    console.error('General error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing the file', 
      error: error.message 
    });
  }
};
       

const getRevoultPayments = async (req, res) => {
  try {
    const payments = await Csvfile.find().sort({ dateCompleted: -1 });
    res.status(200).json({ 
      success: true,
      count: payments.length,
      payments 
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching payments', 
      error: error.message 
    });
  }
}; 

const editPayment = async (req, res) => {   
  try {
    const { paymentId } = req.params;
    
    // Check if payment ID is provided  
    if (!paymentId) {  
      return res.status(400).json({    
        success: false, 
        message: 'Payment ID is required' 
      }); 
    }
    
    // Validate request body
    const { origAmount, reference, type, dateCompleted, dateStarted, description } = req.body;
    
    // Create update object with only provided fields
    const updateData = {};
    if (origAmount !== undefined) updateData.origAmount = parseFloat(origAmount) || 0;
    if (reference !== undefined) updateData.reference = reference;
    if (type !== undefined) updateData.type = type;
    if (dateCompleted !== undefined) updateData.dateCompleted =  dateCompleted;
    if (dateStarted !== undefined) updateData.dateStarted = dateStarted;
    if (description !== undefined) updateData.description = description;
    
    // Validate required fields if they are being updated
    if ((reference !== undefined && !reference) || 
        (type !== undefined && !type) || 
        (description !== undefined && !description)) {   
      return res.status(400).json({
        success: false,
        message: 'Reference, type, and description cannot be empty'
      });
    }
    
    // Find and update the payment
    const updatedPayment = await Csvfile.findByIdAndUpdate(
      paymentId,
      updateData,
      { new: true } // Return the updated document
    );
    
    if (!updatedPayment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Payment updated successfully',
      payment: updatedPayment
    });
    
  } catch (error) {
    console.error('Error updating payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating payment',
      error: error.message
    });
  }
};

// Delete a payment by ID 
const deleteRevoultPayment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const payment = await Csvfile.findById(id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'PaymentRevoult not found'
      });
    }
    
    await Csvfile.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Payment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting payment',
      error: error.message
    });
  }
};

// Get payment statistics
const getPaymentStats = async (req, res) => {
  try {
    const totalCount = await Csvfile.countDocuments();
    const totalAmount = await Csvfile.aggregate([
      { $group: { _id: null, total: { $sum: "$origAmount" } } }
    ]);
    
    const typeStats = await Csvfile.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 }, amount: { $sum: "$origAmount" } } },
      { $sort: { count: -1 } }
    ]);
    
    const monthlyStats = await Csvfile.aggregate([
      {
        $group: {
          _id: { 
            year: { $year: "$dateCompleted" }, 
            month: { $month: "$dateCompleted" } 
          },
          count: { $sum: 1 },
          amount: { $sum: "$origAmount" }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      totalCount,
      totalAmount: totalAmount[0]?.total || 0,
      typeStats,
      monthlyStats
    });
  } catch (error) {
    console.error('Error getting payment stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting payment statistics',
      error: error.message
    });
  }
};

module.exports = {
  handleFileUpload,
  getRevoultPayments,
  editPayment,
  deleteRevoultPayment,
  getPaymentStats
};