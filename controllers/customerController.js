const Customer = require("../models/Customer");

// =========================
// CREATE CUSTOMER
// =========================

const createCustomer = async (req, res) => {
  try {
    const {
      name,
      email,
      qualification,
      address,
      age,
      salary,
      occupation,
      educationInstitute,
    } = req.body;

    if (
      !name ||
      !email ||
      !qualification ||
      !address ||
      !age ||
      !salary ||
      !occupation ||
      !educationInstitute
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const customer = await Customer.create({
      name,
      email,
      qualification,
      address,
      age,
      salary,
      occupation,
      educationInstitute,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
};



// =========================
// GET ALL CUSTOMERS
// =========================

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      customers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};



// =========================
// GET SINGLE CUSTOMER
// =========================

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer",
      error: error.message,
    });
  }
};


// =========================
// UPDATE CUSTOMER
// =========================

const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

// =========================
// DELETE CUSTOMER
// =========================

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};