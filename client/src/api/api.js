import ReqExec from "@/services/RequestExecutor";
ReqExec.baseUrl = "/api/"; 

const endpoints = {
	transactions: "transactions"
};

export default {
	transactions: () => ReqExec.get(endpoints.transactions),  
	postTransaction: transaction => ReqExec.post(endpoints.transactions, transaction),
    putTransaction: (code, transaction) => ReqExec.put(endpoints.transactions, code, transaction),
    deleteTransaction: code => ReqExec.delete(endpoints.transactions, code),
}