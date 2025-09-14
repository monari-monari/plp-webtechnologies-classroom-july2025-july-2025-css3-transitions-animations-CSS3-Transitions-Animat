// Assignment: Bringing Web Pages to Life with CSS & JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // PART 1: CSS3 Animations & Transitions
    initThemeToggle(); // Theme switcher
    initNavigation();  // Section navigation
    // PART 2: JavaScript Functions & Interactivity
    initMealCounter(); // Counter logic
    initFAQ();         // FAQ accordion
    initTabs();        // Tabbed interface
    initRecipes();     // Recipe viewer
    initMealPlanner(); // Meal planner
    // PART 3: JS + CSS Animation
    initFormValidation(); // Form validation
    initModal();          // Modal popup
});

// Toggle between light and dark themes 
function initThemeToggle() {
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;
    
    let currentTheme = 'light';
    body.setAttribute('data-theme', currentTheme);
    themeButton.addEventListener('click', function() {
        if (currentTheme === 'light') {
            currentTheme = 'dark';
            themeButton.textContent = 'Light Mode';
        } else {
            currentTheme = 'light';
            themeButton.textContent = 'Dark Mode';
        }
        body.setAttribute('data-theme', currentTheme);
        triggerAnimation(themeButton, 'pulse');
    });
}

// Reusable function to trigger a CSS animation by class
function triggerAnimation(element, className, duration = 600) {
    element.classList.add(className);
    setTimeout(() => element.classList.remove(className), duration);
}

// Navigation: show/hide sections
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-section');
            const activeSection = document.getElementById(target);
                activeSection.classList.add('active');
                triggerAnimation(activeSection, 'fade-in', 500);
        });
    });
}

// --- PART 2: Custom Functions Demonstrating Scope, Parameters, Return Values ---

// Calculates the sum of an array (parameters, return, local scope)
function sumArray(arr) {
    let total = 0; // local scope
    for (let i = 0; i < arr.length; i++) total += arr[i];
    return total;
}

// Returns a formatted meal string (parameters, return)
function formatMeal(name, calories) {
    return `${name} (${calories} kcal)`;
}

// Global variable for demonstration
let globalCounter = 0;

// Increments a global counter and returns it (demonstrates global scope)
function incrementGlobalCounter() {
    globalCounter++;
    return globalCounter;
}

// Reusable function to update text and animate a DOM element (parameters, reusability)
function updateAndAnimate(element, text, animationClass = 'pulse') {
    element.textContent = text;
    triggerAnimation(element, animationClass);
}

// Example usage (not run automatically):
// let total = sumArray([100, 200, 300]);
// let meal = formatMeal('Jollof Rice', 250);
// let count = incrementGlobalCounter();
// updateAndAnimate(document.getElementById('meal-counter'), 'Updated!', 'shake');

// Meal counter with increase, decrease, reset 
function initMealCounter() {
    const counter = document.getElementById('meal-counter');
    const increaseBtn = document.getElementById('increase-btn');
    const decreaseBtn = document.getElementById('decrease-btn');
    const resetBtn = document.getElementById('reset-btn');
    const messageElement = document.getElementById('counter-message');
    
    let mealCount = 0;
    
    increaseBtn.addEventListener('click', function() {
        mealCount++;
        updateCounter();
        showMessage('Great! You planned another meal! 🍽️', 'success');
            triggerAnimation(counter, 'pulse');
    });
    decreaseBtn.addEventListener('click', function() {
        if (mealCount > 0) {
            mealCount--;
            updateCounter();
            showMessage('Meal removed from plan', 'warning');
        } else {
            showMessage('Cannot go below 0!', 'warning');
                triggerAnimation(counter, 'shake', 500);
        }
    });
    resetBtn.addEventListener('click', function() {
        mealCount = 0;
        updateCounter();
        showMessage('Meal plan reset! Start fresh 🔄', 'success');
            triggerAnimation(counter, 'pulse');
    });
    function updateCounter() {
        counter.textContent = mealCount;
        counter.style.color = mealCount >= 7 ? '#2ecc71' : mealCount >= 4 ? '#f39c12' : '#ff6b35';
    }
    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = type;
        setTimeout(() => {
            messageElement.textContent = '';
            messageElement.className = '';
        }, 3000);
    }
}

// FAQ accordion: show/hide answers 
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.parentElement.querySelector('.faq-answer');
            const isActive = this.classList.contains('active');
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.parentElement.querySelector('.faq-answer').classList.remove('active');
            });
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active', 'fade-in');
                    triggerAnimation(answer, 'fade-in', 500);
            }
        });
    });
}

// Tabs: switch content panel
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-tab');
            const activePanel = document.getElementById(target);
                activePanel.classList.add('active');
                triggerAnimation(activePanel, 'fade-in', 500);
        });
    });
}

// Recipe viewer: show details on click 
function initRecipes() {
    const recipeButtons = document.querySelectorAll('.recipe-btn');

    // Recipe data
    const recipes = {
        ugali: {
            ingredients: '• 2 cups white cornmeal\n• 3 cups water\n• 1 tsp salt',
            steps: '1. Boil water with salt\n2. Gradually add cornmeal while stirring\n3. Cook for 15-20 minutes until thick\n4. Form into a mound and serve',
            nutrition: 'Calories: 180 per serving\nCarbohydrates: 38g\nProtein: 4g\nFat: 1g'
        },
        jollof: {
            ingredients: '• 2 cups rice\n• 3 cups chicken broth\n• 1 can tomatoes\n• 1 onion\n• Spices: curry, thyme, bay leaves',
            steps: '1. Sauté onions until golden\n2. Add tomatoes and spices\n3. Add rice and broth\n4. Simmer for 25 minutes\n5. Let rest for 10 minutes',
            nutrition: 'Calories: 250 per serving\nCarbohydrates: 45g\nProtein: 6g\nFat: 5g'
        },
        injera: {
            ingredients: '• 2 cups teff flour\n• 3 cups water\n• Starter culture',
            steps: '1. Mix teff flour with water\n2. Ferment for 3 days\n3. Cook on special injera pan\n4. Serve with stews',
            nutrition: 'Calories: 90 per serving\nCarbohydrates: 18g\nProtein: 3g\nFat: 1g'
        },
        biltong: {
            ingredients: '• 2 kg beef strips\n• Coarse salt\n• Coriander seeds\n• Black pepper\n• Vinegar',
            steps: '1. Cut meat into strips\n2. Season with salt and spices\n3. Dip in vinegar\n4. Hang to dry for 3-5 days',
            nutrition: 'Calories: 300 per serving\nCarbohydrates: 2g\nProtein: 55g\nFat: 8g'
        }
    };
    
    recipeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const recipeType = this.getAttribute('data-recipe');
            const recipe = recipes[recipeType];
            if (recipe) {
                document.getElementById('ingredients-text').textContent = recipe.ingredients;
                document.getElementById('steps-text').textContent = recipe.steps;
                document.getElementById('nutrition-text').textContent = recipe.nutrition;
                document.querySelectorAll('.nav-btn, .content-section').forEach(el => el.classList.remove('active'));
                document.querySelector('[data-section="recipes"]').classList.add('active');
                document.getElementById('recipes').classList.add('active');
                this.style.transform = 'scale(0.95)';
                setTimeout(() => button.style.transform = '', 150);
            }
        });
    });
}

// Meal planner: assign meals to days 
function initMealPlanner() {
    const mealSlots = document.querySelectorAll('.meal-slot');
    const mealButtons = document.querySelectorAll('.meal-btn');
    const plannerMessage = document.getElementById('planner-message');
    
    let selectedMeal = null;
    let selectedSlot = null;
    
    mealButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            mealButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedMeal = this.getAttribute('data-meal');
            showPlannerMessage('Now click a meal slot to assign "' + selectedMeal + '"', 'info');
        });
    });
    mealSlots.forEach(function(slot) {
        slot.addEventListener('click', function() {
            if (selectedMeal) {
                this.querySelector('span').textContent = selectedMeal;
                this.classList.add('filled');
                mealButtons.forEach(btn => btn.classList.remove('selected'));
                selectedMeal = null;
                showPlannerMessage('Meal added!', 'success');
                this.classList.add('pulse');
                setTimeout(() => slot.classList.remove('pulse'), 600);
            } else {
                showPlannerMessage('Select a meal first.', 'info');
            }
        });
        slot.addEventListener('dblclick', function() {
            const mealSpan = this.querySelector('span');
            if (mealSpan.textContent !== 'Click to add') {
                mealSpan.textContent = 'Click to add';
                this.classList.remove('filled');
                showPlannerMessage('Meal removed!', 'info');
            }
        });
    });
    function showPlannerMessage(text, type) {
        plannerMessage.textContent = text;
        plannerMessage.className = type;
        setTimeout(() => {
            plannerMessage.textContent = '';
            plannerMessage.className = '';
        }, 5000);
    }
}

// Modal: JS triggers CSS animation 
function initModal() {
    const modal = document.getElementById('info-modal');
    const openBtn = document.getElementById('open-modal');
    const closeBtn = document.getElementById('close-modal');
    if (!modal || !openBtn || !closeBtn) return;
    openBtn.addEventListener('click', function() {
        modal.classList.remove('hidden');
            triggerAnimation(modal, 'fade-in', 500);
    });
    closeBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.add('hidden');
    });
}

// Form validation with error feedback 
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const cuisineField = document.getElementById('favorite-cuisine');
    const messageField = document.getElementById('message');
    const termsCheckbox = document.getElementById('terms');
    const successMessage = document.getElementById('success-message');
    
    // Add form submit event
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from actually submitting
        
        let isValid = true;
        
        // Validate name field
        if (!validateName()) {
            isValid = false;
        }
        
        // Validate email field
        if (!validateEmail()) {
            isValid = false;
        }
        
        // Validate phone field (optional but must be valid if filled)
        if (!validatePhone()) {
            isValid = false;
        }
        
        // Validate cuisine selection
        if (!validateCuisine()) {
            isValid = false;
        }
        
        // Validate message field
        if (!validateMessage()) {
            isValid = false;
        }
        
        // Validate terms checkbox
        if (!validateTerms()) {
            isValid = false;
        }
        
        // If all fields are valid, show success message
        if (isValid) {
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            successMessage.classList.add('fade-in');
        }
    });
    
    // Add real-time validation as user types
    nameField.addEventListener('blur', validateName);
    emailField.addEventListener('blur', validateEmail);
    phoneField.addEventListener('blur', validatePhone);
    cuisineField.addEventListener('change', validateCuisine);
    messageField.addEventListener('blur', validateMessage);
    termsCheckbox.addEventListener('change', validateTerms);
    
    // Name validation function
    function validateName() {
        const name = nameField.value.trim();
        const errorElement = document.getElementById('name-error');
        
        if (name === '') {
            showError(nameField, errorElement, 'Please enter your name');
            return false;
        } else if (name.length < 2) {
            showError(nameField, errorElement, 'Name must be at least 2 characters');
            return false;
        } else {
            showValid(nameField, errorElement);
            return true;
        }
    }
    
    // Email validation function
    function validateEmail() {
        const email = emailField.value.trim();
        const errorElement = document.getElementById('email-error');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern
        
        if (email === '') {
            showError(emailField, errorElement, 'Please enter your email');
            return false;
        } else if (!emailPattern.test(email)) {
            showError(emailField, errorElement, 'Please enter a valid email address');
            return false;
        } else {
            showValid(emailField, errorElement);
            return true;
        }
    }
    
    // Phone validation function (optional field)
    function validatePhone() {
        const phone = phoneField.value.trim();
        const errorElement = document.getElementById('phone-error');
        const phonePattern = /^[\d\s\-\+\(\)]+$/; // Allow digits, spaces, dashes, plus, parentheses
        
        if (phone === '') {
            // Phone is optional, so empty is okay
            showValid(phoneField, errorElement);
            return true;
        } else if (phone.length < 10) {
            showError(phoneField, errorElement, 'Phone number must be at least 10 digits');
            return false;
        } else if (!phonePattern.test(phone)) {
            showError(phoneField, errorElement, 'Please enter a valid phone number');
            return false;
        } else {
            showValid(phoneField, errorElement);
            return true;
        }
    }
    
    // Cuisine validation function
    function validateCuisine() {
        const cuisine = cuisineField.value;
        const errorElement = document.getElementById('cuisine-error');
        
        if (cuisine === '') {
            showError(cuisineField, errorElement, 'Please select your favorite cuisine');
            return false;
        } else {
            showValid(cuisineField, errorElement);
            return true;
        }
    }
    
    // Message validation function
    function validateMessage() {
        const message = messageField.value.trim();
        const errorElement = document.getElementById('message-error');
        
        if (message === '') {
            showError(messageField, errorElement, 'Please enter a message');
            return false;
        } else if (message.length < 10) {
            showError(messageField, errorElement, 'Message must be at least 10 characters');
            return false;
        } else {
            showValid(messageField, errorElement);
            return true;
        }
    }
    
    // Terms validation function
    function validateTerms() {
        const errorElement = document.getElementById('terms-error');
        
        if (!termsCheckbox.checked) {
            errorElement.textContent = 'You must agree to the terms and conditions';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    }
    
    // Helper function to show error state
    function showError(field, errorElement, message) {
        field.classList.remove('valid');
        field.classList.add('invalid');
        errorElement.textContent = message;
        
        // Add shake animation
        field.classList.add('shake');
        setTimeout(function() {
            field.classList.remove('shake');
        }, 500);
    }
    
    // Helper function to show valid state
    function showValid(field, errorElement) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorElement.textContent = '';
    }
}
