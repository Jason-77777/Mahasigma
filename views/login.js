document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const response = await fetch("http://127.0.0.1:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("🟢 Login Response:", data);

        if (response.ok) {
            localStorage.setItem("token", data.token); // Simpan token di localStorage
            alert("Login berhasil!");
            window.location.href = "dashboard.html"; // Redirect ke dashboard
        } else {
            alert("Login gagal: " + data.error);
        }
    } catch (error) {
        console.error("❌ Error:", error);
        alert("Terjadi kesalahan, coba lagi.");
    }
});
