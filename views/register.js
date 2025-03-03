//untuk melakukan register + penambahan data user kedalam api
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Mencegah reload halaman

        const nama = document.querySelector("#nama").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        console.log("🔵 Data yang dikirim:", { nama, email, password });

        try {
            const response = await fetch("http://127.0.0.1:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nama, email, password })
            });

            const data = await response.json();
            console.log("🟢 Response dari server:", data);

            if (response.ok) {
                alert("Registrasi berhasil!");
                window.location.href = "login.html"; // Redirect ke halaman login
            } else {
                alert("Registrasi gagal: " + data.error);
            }
        } catch (error) {
            console.error("❌ Error:", error);
            alert("Terjadi kesalahan, coba lagi.");
        }
    });
});
