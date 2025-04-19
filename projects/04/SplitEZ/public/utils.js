/**
 * Hàm tính toán số tiền mỗi người cần trả hoặc nhận để cân bằng chi phí
 * @param {Array} participants - Danh sách người tham gia
 * @param {Array} expenses - Danh sách chi phí (mỗi chi phí có người chi trả, số tiền)
 * @returns {Object} - Đối tượng chứa thông tin cân bằng và danh sách thanh toán gợi ý
 */
function calculateSettlements(participants, expenses) {
    // Nếu không có người tham gia hoặc chi phí
    if (!participants.length || !expenses.length) {
        return {
            totalExpenses: 0,
            perPersonAmount: 0,
            balances: {},
            settlements: []
        };
    }

    // Tính tổng chi phí
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    
    // Tính số tiền mỗi người cần chi trả bình quân
    const perPersonAmount = totalExpenses / participants.length;
    
    // Tính số dư của mỗi người (đã chi - cần chi)
    const balances = {};
    participants.forEach(person => {
        // Tính tổng số tiền mỗi người đã chi trả
        const personPaid = expenses
            .filter(expense => expense.payer === person)
            .reduce((total, expense) => total + parseFloat(expense.amount), 0);
        
        // Tính số dư: số tiền đã chi - số tiền cần chi
        balances[person] = personPaid - perPersonAmount;
    });
    
    // Tính toán cách quyết toán tối ưu bằng thuật toán tham lam
    const settlements = calculateMinimumTransactions(balances);
    
    return {
        totalExpenses,
        perPersonAmount,
        balances,
        settlements
    };
}

/**
 * Tính toán số giao dịch tối thiểu để cân bằng chi phí
 * @param {Object} balances - Đối tượng chứa số dư của mỗi người
 * @returns {Array} - Danh sách các giao dịch thanh toán cần thực hiện
 */
function calculateMinimumTransactions(balances) {
    // Chia thành 2 danh sách: người nhận và người trả
    const creditors = []; // Những người cần nhận tiền (balance > 0)
    const debtors = [];   // Những người cần trả tiền (balance < 0)
    
    // Làm tròn đến 2 chữ số thập phân để tránh lỗi dấu phẩy động
    const roundToTwo = num => Math.round(num * 100) / 100;
    
    // Điền dữ liệu vào 2 danh sách
    for (const person in balances) {
        const balance = roundToTwo(balances[person]);
        
        if (balance > 0) {
            creditors.push({ name: person, amount: balance });
        } else if (balance < 0) {
            debtors.push({ name: person, amount: Math.abs(balance) });
        }
    }
    
    // Sắp xếp theo số tiền giảm dần
    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);
    
    // Danh sách các giao dịch cần thực hiện
    const transactions = [];
    
    // Thuật toán tham lam: Ghép người nợ nhiều nhất với người được nhận nhiều nhất
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];
        
        // Số tiền giao dịch là số nhỏ nhất giữa số tiền người trả và người nhận
        const amount = Math.min(debtor.amount, creditor.amount);
        
        if (amount > 0) {
            transactions.push({
                from: debtor.name,
                to: creditor.name,
                amount: roundToTwo(amount)
            });
        }
        
        // Cập nhật số dư
        debtor.amount = roundToTwo(debtor.amount - amount);
        creditor.amount = roundToTwo(creditor.amount - amount);
        
        // Nếu một người đã cân bằng xong, chuyển đến người tiếp theo
        if (debtor.amount < 0.01) i++;
        if (creditor.amount < 0.01) j++;
    }
    
    return transactions;
}