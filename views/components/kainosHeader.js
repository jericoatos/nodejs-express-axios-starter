/* global HTMLElement */
/* global customElements */

class KainosHeader extends HTMLElement {
    connectedCallback() {
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
        </header>`;
    }
}

customElements.define('kainos-header', KainosHeader);