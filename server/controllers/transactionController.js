const firestore = require("../db");
const Transaction = require("../models/transaction");
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
    const data = {
      date: req.body.date,
      sum: req.body.sum,
      title: req.body.title,
    };
    const postData = await addDoc(collection(firestore, "transactions"), data);
    res.status(201).json({ id: postData.id, ...data });
  } catch (error) {
    res.status(400).send(error.message);
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
          doc.data().date,
          doc.data().sum,
          doc.data().title
        )
      )
    );
    res.status(200).send(transactionList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const data = {
      date: req.body.date,
      sum: req.body.sum,
      title: req.body.title,
    };
    const editingDoc = await doc(firestore, "transactions", id);
    await updateDoc(editingDoc, data);
    res.json({ message: "Transaction record updated successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(firestore, "transactions", id));
    res.status(200).json({ message: "Record deleted successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
};
