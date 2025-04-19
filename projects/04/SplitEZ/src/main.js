document.addEventListener('DOMContentLoaded', () => {
    // Khai báo các biến DOM
    const newParticipantInput = document.getElementById('new-participant');
    const addParticipantBtn = document.getElementById('add-participant');
    const participantsList = document.getElementById('participants-list');
    const payerSelect = document.getElementById('payer');
    const amountInput = document.getElementById('amount');
    const descriptionInput = document.getElementById('description');
    const addExpenseBtn = document.getElementById('add-expense');
    const expensesTableBody = document.getElementById('expenses-table-body');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsSection = document.getElementById('results-section');
    const summaryContent = document.getElementById('summary-content');
    const settlementsList = document.getElementById('settlements-list');
    const resetBtn = document.getElementById('reset-btn');
    const themeSwitcher = document.getElementById('theme-switcher');

    // Khai báo biến dữ liệu
    let participants = [];
    let expenses = [];
    let isDarkTheme = localStorage.getItem('splitez_dark_theme') === 'true';

    // Khôi phục dữ liệu từ localStorage
    loadFromLocalStorage();

    // Áp dụng theme đã lưu
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Khởi tạo ứng dụng
    refreshParticipantsList();
    refreshExpenseTable();
    updateActionButtonStates();

    // Event Listeners
    addParticipantBtn.addEventListener('click', addParticipant);
    newParticipantInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') addParticipant();
    });
    
    addExpenseBtn.addEventListener('click', addExpense);
    calculateBtn.addEventListener('click', calculateAndShowResults);
    resetBtn.addEventListener('click', resetApplication);
    
    // Thêm event listener cho nút chuyển đổi theme
    themeSwitcher.addEventListener('click', toggleTheme);

    // Khởi tạo hiệu ứng nghiêng 3D cho các thẻ được đánh dấu
    initTiltEffect();
    
    // Focus vào input khi trang tải xong
    newParticipantInput.focus();

    // FUNCTIONS
    
    /**
     * Chuyển đổi giữa theme sáng và tối
     */
    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
            themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-theme');
            themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('splitez_dark_theme', isDarkTheme);
    }
    
    /**
     * Khởi tạo hiệu ứng nghiêng 3D cho các phần tử được đánh dấu
     */
    function initTiltEffect() {
        const tiltElements = document.querySelectorAll('.tilt-card');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', e => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / 25;
                const deltaY = (y - centerY) / 25;
                
                element.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        });
    }

    /**
     * Thêm người tham gia vào danh sách
     */
    function addParticipant() {
        const name = newParticipantInput.value.trim();
        if (name === '') {
            showNotification('Vui lòng nhập tên thành viên', 'error');
            return;
        }
        
        if (participants.includes(name)) {
            showNotification('Tên này đã tồn tại trong danh sách', 'error');
            return;
        }
        
        participants.push(name);
        newParticipantInput.value = '';
        
        refreshParticipantsList();
        updatePayerDropdown();
        saveToLocalStorage();
        updateActionButtonStates();
        
        // Hiển thị thông báo thành công
        showNotification(`Đã thêm "${name}" vào danh sách thành viên`, 'success');
        
        // Focus lại vào input để tiếp tục thêm
        newParticipantInput.focus();
    }

    /**
     * Xoá một người tham gia khỏi danh sách
     */
    function removeParticipant(name) {
        // Kiểm tra nếu người này đã có trong các khoản chi phí
        const isInExpenses = expenses.some(expense => expense.payer === name);
        if (isInExpenses) {
            showNotification(`Không thể xoá ${name} vì đã có trong danh sách chi phí. Hãy xoá các chi phí liên quan trước.`, 'error');
            return;
        }
        
        participants = participants.filter(p => p !== name);
        refreshParticipantsList();
        updatePayerDropdown();
        saveToLocalStorage();
        updateActionButtonStates();
        
        // Hiển thị thông báo xoá thành công
        showNotification(`Đã xoá "${name}" khỏi danh sách thành viên`, 'info');
    }

    /**
     * Cập nhật giao diện danh sách thành viên
     */
    function refreshParticipantsList() {
        participantsList.innerHTML = '';
        
        participants.forEach((name, index) => {
            const li = document.createElement('li');
            li.className = 'participant-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.innerHTML = `<i class="fas fa-user"></i> ${name}`;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-participant';
            removeBtn.innerHTML = '<i class="fas fa-times"></i>';
            removeBtn.setAttribute('title', `Xoá ${name}`);
            removeBtn.addEventListener('click', () => removeParticipant(name));
            
            li.appendChild(nameSpan);
            li.appendChild(removeBtn);
            
            // Hiệu ứng xuất hiện tuần tự
            li.style.animation = 'none';
            li.style.opacity = '0';
            li.style.transform = 'translateX(-20px)';
            participantsList.appendChild(li);
            
            // Tạo hiệu ứng xuất hiện mượt mà với delay tuỳ thuộc vào vị trí
            setTimeout(() => {
                li.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                li.style.opacity = '1';
                li.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    /**
     * Cập nhật dropdown chọn người trả tiền
     */
    function updatePayerDropdown() {
        payerSelect.innerHTML = '<option value="" disabled selected>Chọn người trả</option>';
        
        participants.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            payerSelect.appendChild(option);
        });
    }

    /**
     * Thêm một khoản chi phí mới
     */
    function addExpense() {
        const payer = payerSelect.value;
        const amount = amountInput.value;
        const description = descriptionInput.value.trim() || 'Chưa có mô tả';
        
        // Kiểm tra dữ liệu đầu vào
        if (!payer) {
            showNotification('Vui lòng chọn người trả tiền', 'error');
            return;
        }
        
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            showNotification('Vui lòng nhập số tiền hợp lệ', 'error');
            return;
        }
        
        // Thêm chi phí vào danh sách
        expenses.push({
            id: Date.now(), // ID duy nhất
            payer,
            amount: Number(amount),
            description
        });
        
        // Reset form
        payerSelect.selectedIndex = 0;
        amountInput.value = '';
        descriptionInput.value = '';
        
        // Cập nhật giao diện và lưu dữ liệu
        refreshExpenseTable();
        saveToLocalStorage();
        updateActionButtonStates();
        
        // Hiển thị thông báo thành công
        showNotification(`Đã thêm khoản chi phí ${formatCurrency(amount)} cho ${payer}`, 'success');
    }

    /**
     * Xoá một khoản chi phí
     */
    function removeExpense(id) {
        // Tìm chi phí để hiển thị thông báo
        const expense = expenses.find(expense => expense.id === id);
        
        expenses = expenses.filter(expense => expense.id !== id);
        refreshExpenseTable();
        saveToLocalStorage();
        updateActionButtonStates();
        
        // Hiển thị thông báo xoá thành công
        if (expense) {
            showNotification(`Đã xoá khoản chi phí ${formatCurrency(expense.amount)} của ${expense.payer}`, 'info');
        }
    }

    /**
     * Cập nhật bảng chi phí
     */
    function refreshExpenseTable() {
        expensesTableBody.innerHTML = '';
        
        if (expenses.length === 0) {
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 4;
            emptyCell.innerHTML = '<i class="fas fa-info-circle"></i> Chưa có khoản chi phí nào';
            emptyCell.style.textAlign = 'center';
            emptyCell.style.padding = '20px';
            emptyCell.style.color = '#6a6f85';
            emptyRow.appendChild(emptyCell);
            expensesTableBody.appendChild(emptyRow);
            return;
        }
        
        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            
            // Cột người trả
            const payerCell = document.createElement('td');
            payerCell.innerHTML = `<i class="fas fa-user"></i> ${expense.payer}`;
            
            // Cột số tiền
            const amountCell = document.createElement('td');
            amountCell.innerHTML = `<strong>${formatCurrency(expense.amount)}</strong>`;
            
            // Cột mô tả
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = expense.description;
            
            // Cột hành động
            const actionCell = document.createElement('td');
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-expense';
            removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
            removeBtn.setAttribute('title', 'Xoá chi phí này');
            removeBtn.addEventListener('click', () => removeExpense(expense.id));
            actionCell.appendChild(removeBtn);
            
            // Thêm các ô vào hàng
            row.appendChild(payerCell);
            row.appendChild(amountCell);
            row.appendChild(descriptionCell);
            row.appendChild(actionCell);
            
            // Hiệu ứng xuất hiện tuần tự
            row.style.animation = 'none';
            row.style.opacity = '0';
            row.style.transform = 'translateY(10px)';
            
            expensesTableBody.appendChild(row);
            
            // Tạo hiệu ứng xuất hiện mượt mà với delay tuỳ thuộc vào vị trí
            setTimeout(() => {
                row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                row.style.opacity = '1';
                row.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    /**
     * Tính toán và hiển thị kết quả
     */
    function calculateAndShowResults() {
        // Kiểm tra đủ dữ liệu để tính toán
        if (participants.length < 2) {
            showNotification('Cần ít nhất 2 thành viên để tính toán', 'error');
            return;
        }
        if (expenses.length === 0) {
            showNotification('Chưa có khoản chi phí nào để tính toán', 'error');
            return;
        }
        
        // Hiệu ứng khi nhấn nút tính toán
        calculateBtn.classList.add('calculating');
        calculateBtn.innerHTML = '<div class="loading-spinner"></div> Đang tính toán...';
        calculateBtn.disabled = true;
        
        // Tính toán bảng quyết toán (thêm delay để tạo hiệu ứng)
        setTimeout(() => {
            const result = calculateSettlements(participants, expenses);
            
            // Hiển thị phần tóm tắt
            displaySummary(result);
            
            // Hiển thị phần quyết toán
            displaySettlements(result.settlements);
            
            // Hiển thị khu vực kết quả
            resultsSection.style.display = 'block';
            
            // Khôi phục nút tính toán
            calculateBtn.classList.remove('calculating');
            calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Tính toán kết quả';
            calculateBtn.disabled = false;
            
            // Cuộn xuống khu vực kết quả với hiệu ứng mượt
            setTimeout(() => {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
                
                // Tạo hiệu ứng confetti khi có kết quả
                if (result.settlements.length > 0) {
                    createConfetti();
                }
            }, 100);
            
            // Khởi tạo lại hiệu ứng nghiêng 3D cho các phần tử mới
            initTiltEffect();
        }, 1200); // Tạo delay giả lập để tăng trải nghiệm người dùng
    }
    
    /**
     * Tạo hiệu ứng confetti
     */
    function createConfetti() {
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#10b981', '#f59e0b'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Tạo hình dạng ngẫu nhiên
            if (Math.random() > 0.6) {
                confetti.style.borderRadius = '50%';
            } else if (Math.random() > 0.5) {
                confetti.style.width = '8px';
                confetti.style.height = '16px';
            }
            
            // Màu sắc và vị trí ngẫu nhiên
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            
            // Thời gian rơi và xoay ngẫu nhiên
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 1 + 's';
            
            document.body.appendChild(confetti);
            
            // Xóa confetti sau khi animation hoàn tất
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    /**
     * Hiển thị phần tóm tắt chi phí
     */
    function displaySummary(result) {
        const { totalExpenses, perPersonAmount, balances } = result;
        
        // Tạo bảng tóm tắt
        const summaryHTML = `
            <div class="summary-details">
                <p><i class="fas fa-money-bill-wave"></i> <strong>Tổng chi phí:</strong> ${formatCurrency(totalExpenses)}</p>
                <p><i class="fas fa-user-friends"></i> <strong>Chi phí mỗi người:</strong> ${formatCurrency(perPersonAmount)}</p>
            </div>
            <h3><i class="fas fa-balance-scale"></i> Chi tiết chi tiêu</h3>
            <table class="summary-table">
                <thead>
                    <tr>
                        <th>Người</th>
                        <th>Đã chi</th>
                        <th>Cần chi</th>
                        <th>Số dư</th>
                    </tr>
                </thead>
                <tbody>
                    ${participants.map(person => {
                        const personExpenses = expenses
                            .filter(e => e.payer === person)
                            .reduce((sum, e) => sum + e.amount, 0);
                        const balance = balances[person];
                        const balanceClass = balance > 0 ? 'positive-balance' : balance < 0 ? 'negative-balance' : '';
                        const balanceIcon = balance > 0 
                            ? '<i class="fas fa-arrow-circle-up" style="color: var(--success-color);"></i>' 
                            : balance < 0 
                                ? '<i class="fas fa-arrow-circle-down" style="color: var(--danger-color);"></i>' 
                                : '<i class="fas fa-equals" style="color: #a0aec0;"></i>';
                        
                        return `
                            <tr>
                                <td><i class="fas fa-user"></i> ${person}</td>
                                <td>${formatCurrency(personExpenses)}</td>
                                <td>${formatCurrency(perPersonAmount)}</td>
                                <td class="${balanceClass}">${balanceIcon} ${formatCurrency(balance)}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
        
        summaryContent.innerHTML = summaryHTML;
    }

    /**
     * Hiển thị các giao dịch quyết toán
     */
    function displaySettlements(settlements) {
        settlementsList.innerHTML = '';
        
        if (settlements.length === 0) {
            const li = document.createElement('li');
            li.className = 'settlement-item neutral-balance';
            li.innerHTML = '<i class="fas fa-check-circle"></i> Mọi người đã chi tiêu cân bằng nhau!';
            settlementsList.appendChild(li);
            return;
        }
        
        settlements.forEach((transaction, index) => {
            const li = document.createElement('li');
            li.className = 'settlement-item negative-balance';
            li.innerHTML = `
                <strong><i class="fas fa-user"></i> ${transaction.from}</strong>
                cần trả 
                <strong>${formatCurrency(transaction.amount)}</strong> 
                cho 
                <strong><i class="fas fa-user"></i> ${transaction.to}</strong>
            `;
            
            settlementsList.appendChild(li);
        });
    }

    /**
     * Cập nhật trạng thái của các nút hành động
     */
    function updateActionButtonStates() {
        const isCalculateDisabled = participants.length < 2 || expenses.length === 0;
        const isAddExpenseDisabled = participants.length === 0;
        
        calculateBtn.disabled = isCalculateDisabled;
        addExpenseBtn.disabled = isAddExpenseDisabled;
        
        if (isCalculateDisabled) {
            calculateBtn.classList.add('btn-disabled');
            calculateBtn.classList.remove('btn-success', 'pulse');
        } else {
            calculateBtn.classList.add('btn-success', 'pulse');
            calculateBtn.classList.remove('btn-disabled');
        }
        
        if (isAddExpenseDisabled) {
            addExpenseBtn.classList.add('btn-disabled');
            addExpenseBtn.classList.remove('btn-primary');
        } else {
            addExpenseBtn.classList.add('btn-primary');
            addExpenseBtn.classList.remove('btn-disabled');
        }
    }

    /**
     * Đặt lại toàn bộ ứng dụng
     */
    function resetApplication() {
        if (!confirm('Bạn có chắc muốn đặt lại toàn bộ dữ liệu? Thao tác này không thể hoàn tác.')) {
            return;
        }
        
        participants = [];
        expenses = [];
        
        refreshParticipantsList();
        refreshExpenseTable();
        updatePayerDropdown();
        resultsSection.style.display = 'none';
        saveToLocalStorage();
        updateActionButtonStates();
        
        // Hiển thị thông báo đặt lại thành công
        showNotification('Đã đặt lại toàn bộ dữ liệu', 'info');
        
        // Focus vào input nhập tên thành viên
        newParticipantInput.focus();
    }

    /**
     * Lưu dữ liệu vào localStorage
     */
    function saveToLocalStorage() {
        localStorage.setItem('splitez_participants', JSON.stringify(participants));
        localStorage.setItem('splitez_expenses', JSON.stringify(expenses));
    }

    /**
     * Tải dữ liệu từ localStorage
     */
    function loadFromLocalStorage() {
        try {
            const savedParticipants = localStorage.getItem('splitez_participants');
            const savedExpenses = localStorage.getItem('splitez_expenses');
            
            if (savedParticipants) participants = JSON.parse(savedParticipants);
            if (savedExpenses) expenses = JSON.parse(savedExpenses);
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
            showNotification('Đã xảy ra lỗi khi tải dữ liệu đã lưu', 'error');
        }
    }

    /**
     * Định dạng số tiền thành dạng tiền tệ
     */
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    /**
     * Hiển thị thông báo
     * @param {string} message - Nội dung thông báo
     * @param {string} type - Loại thông báo (success, error, info)
     */
    function showNotification(message, type = 'info') {
        // Tạo phần tử thông báo
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Icon tương ứng với loại thông báo
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        // Thêm thông báo vào body
        document.body.appendChild(notification);
        
        // Hiệu ứng xuất hiện
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            // Xóa phần tử sau khi kết thúc hiệu ứng
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Khởi tạo CSS cho thông báo - thêm vào <head>
    (function initNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                background-color: white;
                color: #333;
                box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 1000;
                transition: all 0.3s ease;
                transform: translateX(100%);
                opacity: 0;
                max-width: 350px;
            }
            
            .dark-theme .notification {
                background-color: #292a3e;
                color: #e2e8f0;
            }
            
            .notification.success {
                border-left: 4px solid #48bb78;
            }
            
            .notification.success i {
                color: #48bb78;
            }
            
            .notification.error {
                border-left: 4px solid #f56565;
            }
            
            .notification.error i {
                color: #f56565;
            }
            
            .notification.info {
                border-left: 4px solid #4299e1;
            }
            
            .notification.info i {
                color: #4299e1;
            }
            
            .notification i {
                font-size: 20px;
            }
            
            @media (max-width: 480px) {
                .notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    })();
});