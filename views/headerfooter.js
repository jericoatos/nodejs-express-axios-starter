class MyHeader extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <header>
        <div class="container d-flex align-items-center">
            <img src="../public/assets/images/kainoslogo.webp" alt="Kainos logo" class="logo">
            <nav class="ml-auto">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="https://www.kainos.com/digital-services">Digital Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://www.kainos.com/workday">Workday</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://www.kainos.com/industries">Industries</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#insights">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://careers.kainos.com/gb/en">Careers</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>`
    }
}

class MyFooter extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
           <footer class="text-light py-4">
    <img src="../public/assets/images/kainoslogofooter.png" alt="Kainos logo" class="logo">
    <div class="footer-content">
        <div>
            <p class="mb-3">Contact us:</p>
            <div class="d-flex justify-content-center mb-4">
                <a href="https://www.instagram.com/kainossoftware/" target="_blank" rel="noopener noreferrer" class="mx-2" aria-label="Instagram">
                    <img src="../public/assets/images/instagramlogo.png" alt="Instagram Logo" width="50" height="50">
                </a>
                <a href="https://www.facebook.com/KainosSoftware/?locale=en_GB" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <img src="../public/assets/images/facebooklogo.png" alt="Facebook Logo" width="50" height="50">
                </a>
            </div>
        </div>
    </div>
    <p class="mb-0">&copy; Kainos 2024</p>
</footer>`
    }
}

customElements.define('special-header', MyHeader)
customElements.define('special-footer', MyFooter)