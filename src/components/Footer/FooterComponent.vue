<template>
    <ScrollReveal id="Footer">
        <footer class="footer">
            <div class="footer-top">
                <h2>Let's Connect</h2>
                <a href="https://www.linkedin.com/in/eduardo-amorim-eaa/" target="_blank" rel="noreferrer"
                    class="linkedin-btn">
                    Linkedin
                </a>
            </div>
            <hr />
            <p class="footer-copy">© 2025. All rights reserved.</p>
        </footer>
    </ScrollReveal>
</template>

<style scoped>
.footer {
    background: #1c1c1c;
    color: white;
    padding: 3rem 2rem 2rem;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
}

.footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.footer-top h2 {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    overflow: hidden;
}

.linkedin-btn {
    background: var(--color-primary);
    color: white;
    border: none;
    padding: 0.6rem 1.4rem;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}

hr {
    border: none;
    border-top: 1px solid #3a3a3a;
    margin: 2rem 0;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
}

.footer-col {
    flex: 1;
    min-width: 220px;
}

.footer-col strong {
    display: block;
    color: #f4f4f4;
}

.footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
    color: #cccccc;
}

.footer-col li {
    margin-bottom: 0.6rem;
    font-size: 0.95rem;
}

.brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.brand-logo {
    background: #3e0052;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: white;
    font-weight: 600;
}

.footer-copy {
    text-align: center;
    font-size: 0.85rem;
    color: #999;
    margin-top: 2rem;
}
</style>
