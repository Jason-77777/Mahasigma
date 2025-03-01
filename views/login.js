document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Mencegah reload halaman

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        const alertBox = document.getElementById("alertBox");

        if (response.ok) {
            // Menyimpan token di cookie
            document.cookie = `token=${result.token}; path=/; secure; HttpOnly`;

            alertBox.className = "alert alert-success";
            alertBox.innerText = "Login berhasil! Mengalihkan...";
            alertBox.classList.remove("d-none");

            // Alihkan ke halaman utama atau dashboard
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);
        } else {
            alertBox.className = "alert alert-danger";
            alertBox.innerText = result.error || "Login gagal!";
            alertBox.classList.remove("d-none");
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
    }
});
