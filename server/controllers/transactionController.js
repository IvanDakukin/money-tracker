const firestore = require("../db");
const Transaction = require("../models/transaction");
const { validationResult } = require("express-validator");
const {
  doc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
} = require("firebase/firestore");

const addTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const data = {
      date: new Date(req.body.date),
      sum: +(+req.body.sum).toFixed(2),
      title: req.body.title,
    };

    const postData = await addDoc(collection(firestore, "transactions"), data);
    res
      .status(201)
      .json({ success: true, transaction: { id: postData.id, ...data } });
  } catch (error) {
    res.status(400).json({ success: false, errors: [error] });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await getDocs(collection(firestore, "transactions"));
    const transactionList = [];

    transactions.forEach((doc) =>
      transactionList.push(
        new Transaction(
          doc.id,
          new Date(doc.data().date.seconds * 1000),
          +doc.data().sum,
          doc.data().title.trim()
        )
      )
    );

    res.status(200).json({ success: true, transactions: transactionList });
  } catch (error) {
    res.status(400).json({ succes: false, errors: [error] });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    
    const id = req.params.id;
    const data = {
      date: new Date(req.body.date),
      sum: +(+req.body.sum).toFixed(2),
      title: req.body.title,
    };

    const editingDoc = await doc(firestore, "transactions", id);
    await updateDoc(editingDoc, data);
    res.json({
      success: true,
      message: "Transaction record updated successfuly",
    });
  } catch (error) {
    res.status(400).json({ success: false, errors: [error] });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(firestore, "transactions", id));
    res
      .status(200)
      .json({ success: true, message: "Record deleted successfuly" });
  } catch (error) {
    res.status(400).json({ success: false, errors: [error] });
  }
};

module.exports = {
  addTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
};
