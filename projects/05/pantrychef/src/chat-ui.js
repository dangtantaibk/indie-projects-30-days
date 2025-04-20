document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    
    // Dietary preferences checkboxes
    const vegetarianCheckbox = document.getElementById('vegetarian');
    const veganCheckbox = document.getElementById('vegan');
    const glutenFreeCheckbox = document.getElementById('gluten-free');
    const lowCarbCheckbox = document.getElementById('low-carb');
    
    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;
        
        // Display user message
        addMessage(userMessage, 'user');
        
        // Get dietary preferences
        const dietaryPreferences = [];
        if (vegetarianCheckbox.checked) dietaryPreferences.push('vegetarian');
        if (veganCheckbox.checked) dietaryPreferences.push('vegan');
        if (glutenFreeCheckbox.checked) dietaryPreferences.push('gluten-free');
        if (lowCarbCheckbox.checked) dietaryPreferences.push('low-carb');
        
        // Process user input and get bot response
        processUserInput(userMessage, dietaryPreferences);
        
        // Clear input field
        userInput.value = '';
    });
    
    // Add a message to the chat
    window.addMessage = function(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        // If the message is a plain string
        if (typeof message === 'string') {
            messageContent.innerHTML = `<p>${message}</p>`;
        } 
        // If the message is an array of recipe objects
        else if (Array.isArray(message)) {
            let recipeHTML = '<p>Here are some recipe suggestions based on your ingredients:</p>';
            
            message.forEach(recipe => {
                recipeHTML += `
                    <div class="recipe-card">
                        <h3>${recipe.name}</h3>
                        <p>${recipe.description}</p>
                        
                        <div class="recipe-tags">
                            ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        
                        <p><strong>Main ingredients:</strong> ${recipe.mainIngredients.join(', ')}</p>
                    </div>
                `;
            });
            
            messageContent.innerHTML = recipeHTML;
        }
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    
    // Add typing indicator
    window.showTypingIndicator = function() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot', 'typing-indicator');
        
        const typingContent = document.createElement('div');
        typingContent.classList.add('message-content');
        typingContent.innerHTML = '<p>PantryChef is thinking <span class="dots">...</span></p>';
        
        typingDiv.appendChild(typingContent);
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return typingDiv;
    };
    
    // Remove typing indicator
    window.removeTypingIndicator = function(indicator) {
        if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    };
});