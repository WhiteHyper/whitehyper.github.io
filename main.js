
        // Auth state (simulated)
        let isLoggedIn = false;
        
        // Modal functionality
        const addBtn = document.getElementById('addBtn');
        const addJobModal = document.getElementById('addJobModal');
        const closeModal = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const jobForm = document.getElementById('jobForm');
        const howItWorksBtn = document.getElementById('howItWorksBtn');
        const howItWorksModal = document.getElementById('howItWorksModal');
        const closeHowItWorks = document.getElementById('closeHowItWorks');
        const closeHowItWorksBtn = document.getElementById('closeHowItWorksBtn');
        const jobPriceType = document.getElementById('jobPriceType');
        const priceInputContainer = document.getElementById('priceInputContainer');
        
        // Auth elements
        const authButtons = document.getElementById('authButtons');
        const userProfile = document.getElementById('userProfile');
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const profileLink = document.getElementById('profileLink');
        const ordersLink = document.getElementById('ordersLink');
        const reviewsLink = document.getElementById('reviewsLink');
        const logoutBtn = document.getElementById('logoutBtn');
        
        // Modals
        const loginModal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');
        const orderModal = document.getElementById('orderModal');
        const reviewDetailModal = document.getElementById('reviewDetailModal');
        const closeLoginModal = document.getElementById('closeLoginModal');
        const closeRegisterModal = document.getElementById('closeRegisterModal');
        const closeOrderModal = document.getElementById('closeOrderModal');
        const closeReviewDetail = document.getElementById('closeReviewDetail');
        const goToRegister = document.getElementById('goToRegister');
        const goToLogin = document.getElementById('goToLogin');
        
        // Sections
        const mainContent = document.getElementById('mainContent');
        const profileSection = document.getElementById('profileSection');
        const ordersSection = document.getElementById('ordersSection');
        const reviewsSection = document.getElementById('reviewsSection');
        
        // Close all modals
        const closeModals = () => {
            addJobModal.classList.add('hidden');
            howItWorksModal.classList.add('hidden');
            loginModal.classList.add('hidden');
            registerModal.classList.add('hidden');
            orderModal.classList.add('hidden');
            reviewDetailModal.classList.add('hidden');
        };
        
        // Reset content view
        const resetContentView = () => {
            mainContent.classList.remove('hidden');
            profileSection.classList.add('hidden');
            ordersSection.classList.add('hidden');
            reviewsSection.classList.add('hidden');
        };
        
        // Update auth state UI
        const updateAuthUI = () => {
            if (isLoggedIn) {
                authButtons.classList.add('hidden');
                userProfile.classList.remove('hidden');
            } else {
                authButtons.classList.remove('hidden');
                userProfile.classList.add('hidden');
                resetContentView();
            }
        };
        
        // Show add job modal
        addBtn.addEventListener('click', () => {
            if (!isLoggedIn) {
                loginModal.classList.remove('hidden');
            } else {
                addJobModal.classList.remove('hidden');
            }
        });
        
        // Other modals
        closeModal.addEventListener('click', closeModals);
        cancelBtn.addEventListener('click', closeModals);
        closeHowItWorks.addEventListener('click', closeModals);
        closeHowItWorksBtn.addEventListener('click', closeModals);
        closeLoginModal.addEventListener('click', closeModals);
        closeRegisterModal.addEventListener('click', closeModals);
        closeOrderModal.addEventListener('click', closeModals);
        closeReviewDetail.addEventListener('click', closeModals);
        
        // Show how it works modal
        howItWorksBtn.addEventListener('click', () => {
            howItWorksModal.classList.remove('hidden');
        });
        
        // Auth buttons
        loginBtn.addEventListener('click', () => {
            loginModal.classList.remove('hidden');
        });
        
        registerBtn.addEventListener('click', () => {
            registerModal.classList.remove('hidden');
        });
        
        goToRegister.addEventListener('click', () => {
            loginModal.classList.add('hidden');
            registerModal.classList.remove('hidden');
        });
        
        goToLogin.addEventListener('click', () => {
            registerModal.classList.add('hidden');
            loginModal.classList.remove('hidden');
        });
        
        // Login simulation
        document.querySelector('#loginModal form').addEventListener('submit', (e) => {
            e.preventDefault();
            isLoggedIn = true;
            closeModals();
            updateAuthUI();
        });
        
        // Register simulation
        document.querySelector('#registerModal form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userName = document.getElementById('regName').value;

            document.getElementById('usernameDisplay').textContent = userName;

            isLoggedIn = true;
            closeModals();
            updateAuthUI();
        });
        
        // Logout
        logoutBtn.addEventListener('click', () => {
            isLoggedIn = false;
            updateAuthUI();
        });
        
        // Profile navigation
        profileLink.addEventListener('click', (e) => {
            e.preventDefault();
            resetContentView();
            profileSection.classList.remove('hidden');
            mainContent.classList.add('hidden');
        });
        
        ordersLink.addEventListener('click', (e) => {
            e.preventDefault();
            resetContentView();
            ordersSection.classList.remove('hidden');
            mainContent.classList.add('hidden');
        });
        
        reviewsLink.addEventListener('click', (e) => {
            e.preventDefault();
            resetContentView();
            reviewsSection.classList.remove('hidden');
            mainContent.classList.add('hidden');
        });
        
        // Toggle price input based on payment type
        jobPriceType.addEventListener('change', (e) => {
            if (e.target.value === 'fixed') {
                priceInputContainer.style.display = 'block';
                document.getElementById('jobPrice').setAttribute('required', 'required');
            } else {
                priceInputContainer.style.display = 'none';
                document.getElementById('jobPrice').removeAttribute('required');
            }
        });
        
        // Form submission
        jobForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form validation
            const title = document.getElementById('jobTitle').value;
            const category = document.getElementById('jobCategory').value;
            const description = document.getElementById('jobDescription').value;
            const priceType = document.getElementById('jobPriceType').value;
            const contact = document.getElementById('jobContact').value;
            
            if (!title || !category || !description || !priceType || !contact) {
                alert('Пожалуйста, заполните все обязательные поля!');
                return;
            }
            
            if (priceType === 'fixed' && !document.getElementById('jobPrice').value) {
                alert('Пожалуйста, укажите сумму оплаты!');
                return;
            }
            
            // Here would be the code to save the job to database
            alert('Ваше объявление опубликовано!');
            jobForm.reset();
            closeModals();
        });
        
        // Order buttons
        document.querySelectorAll('.grid button').forEach(button => {
            if (button.textContent.includes('Заказать')) {
                button.addEventListener('click', () => {
                    if (!isLoggedIn) {
                        loginModal.classList.remove('hidden');
                    } else {
                        orderModal.classList.remove('hidden');
                    }
                });
            }
        });
        
        // Order form submission
        document.querySelector('#orderModal form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Заказ оформлен! Исполнитель свяжется с вами в ближайшее время.');
            closeModals();
        });
        
        // Tab switching in orders section
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all tabs
                document.querySelectorAll('.nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // Add active class to clicked tab
                item.classList.add('active');
                
                // Hide all tab contents
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.add('hidden');
                });
                
                // Show the corresponding tab content
                const tabId = item.getAttribute('data-tab');
                document.getElementById(tabId).classList.remove('hidden');
            });
        });
        
        // Show review detail
        window.showReviewDetail = (reviewText) => {
            document.getElementById('reviewDetailText').textContent = reviewText;
            reviewDetailModal.classList.remove('hidden');
        };
        
        // Search functionality
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const jobCards = document.querySelectorAll('.grid > div');
            
            jobCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const category = card.querySelector('span:first-child').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Initialize RateYo for rating display
        $(".rateyo").rateYo({
            rating: 4.2,
            starWidth: "20px",
            readOnly: true,
            ratedFill: "#f39c12"
        });
