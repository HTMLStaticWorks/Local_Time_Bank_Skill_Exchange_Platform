// Form validation logic for Contact, Login, and Signup
document.addEventListener('DOMContentLoaded', () => {
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const reason = document.getElementById('reason');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Name
            if (!name.value.trim()) {
                document.getElementById('nameError').classList.remove('hidden');
                isValid = false;
            } else {
                document.getElementById('nameError').classList.add('hidden');
            }
            
            // Email
            if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
                document.getElementById('emailError').classList.remove('hidden');
                isValid = false;
            } else {
                document.getElementById('emailError').classList.add('hidden');
            }
            
            // Reason
            if (!reason.value) {
                document.getElementById('reasonError').classList.remove('hidden');
                isValid = false;
            } else {
                document.getElementById('reasonError').classList.add('hidden');
            }
            
            // Subject
            if (!subject.value.trim()) {
                document.getElementById('subjectError').classList.remove('hidden');
                isValid = false;
            } else {
                document.getElementById('subjectError').classList.add('hidden');
            }
            
            // Message
            if (!message.value.trim()) {
                document.getElementById('messageError').classList.remove('hidden');
                isValid = false;
            } else {
                document.getElementById('messageError').classList.add('hidden');
            }
            
            if (isValid) {
                document.getElementById('formSuccess').classList.remove('hidden');
                contactForm.reset();
                setTimeout(() => {
                    document.getElementById('formSuccess').classList.add('hidden');
                }, 5000);
            }
        });
    }

    // Toggle Password Visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = '<i data-lucide="eye-off" class="w-5 h-5 text-theme-muted"></i>';
            } else {
                input.type = 'password';
                btn.innerHTML = '<i data-lucide="eye" class="w-5 h-5 text-theme-muted"></i>';
            }
            lucide.createIcons();
        });
    });

});
