document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("togglePassword");
    const message = document.getElementById("message");

    // Alternar visibilidade da senha (mostrar/esconder)
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener("click", () => {
            const isPassword = passwordInput.getAttribute("type") === "password";
            passwordInput.setAttribute("type", isPassword ? "text" : "password");
            togglePasswordBtn.style.opacity = isPassword ? "0.5" : "1";
        });
    }

    // Processamento do Login
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const senha = passwordInput.value;
            const rememberMe = document.getElementById("rememberMe")?.checked;

            message.textContent = "";

            try {
                const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    message.style.color = "var(--cor-sucesso)";
                    message.textContent = data.message || "Login realizado com sucesso!";

                    if (data.usuario) {
                        // Limpa registros antigos para evitar conflitos
                        localStorage.removeItem("usuarioLogado");
                        sessionStorage.removeItem("usuarioLogado");

                        // Se marcar "lembrar de mim", salva em localStorage (persistente).
                        // Se não marcar, salva em sessionStorage (expira ao fechar a aba).
                        const targetStorage = rememberMe ? localStorage : sessionStorage;
                        targetStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));
                    }

                    setTimeout(() => {
                        window.location.assign("../inicio/home.html");
                    }, 1000);

                } else {
                    message.style.color = "var(--cor-erro)";
                    message.textContent = data.message || "Falha na autenticação.";
                }

            } catch (error) {
                console.error("Erro na comunicação:", error);
                message.style.color = "var(--cor-erro)";
                message.textContent = "Não foi possível conectar ao servidor backend.";
            }
        });
    }
});